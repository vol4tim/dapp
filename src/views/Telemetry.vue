<template>
  <robo-template-devices-layout
    :onUpdate="onUpdate"
    :datalog="datalog"
    :config="config"
  />
</template>

<script>
import { useIpfs } from "@/hooks/useIpfs";
import { useRobonomics } from "@/hooks/useRobonomics";
import { useSend } from "@/hooks/useSend";
import {
  decryptMsg,
  getConfigCid,
  getLastDatalogCid,
  parseJson
} from "@/utils/telemetry";
import { Keyring } from "@polkadot/keyring";
import { stringToU8a } from "@polkadot/util";
import { onUnmounted, reactive, ref, watch, watchEffect } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const datalog = ref(null);
    const config = ref(null);
    const datalogCid = ref("");
    const configCid = ref("");
    const setup = reactive({ controller: null, admin: null });

    const robonomics = useRobonomics();
    const store = useStore();
    const ipfs = useIpfs();
    const tx = useSend();

    let unsubscribeDatalog;
    const watchDatalog = async () => {
      unsubscribeDatalog = await robonomics.datalog.on(
        { method: "NewRecord" },
        (results) => {
          const r = results.filter((item) => {
            return (
              item.success &&
              item.data[0].toHuman() === setup.controller.address
            );
          });
          for (const item of r) {
            console.log(item.data[1].toString(), item.data[2].toHuman());
            datalogCid.value = item.data[2].toHuman();
          }
        }
      );
    };

    onUnmounted(() => {
      if (unsubscribeDatalog) {
        unsubscribeDatalog();
      }
    });

    const keyring = new Keyring({
      ss58Format: robonomics.api?.registry.chainSS58
    });

    const catFileContoller = async (controller, cid) => {
      if (!cid) {
        return false;
      }
      try {
        const result = await ipfs.catViaGateway(
          store.state.robonomicsUIvue.ipfs.activegateway,
          cid
        );
        const seed = decryptMsg(
          result[controller.address],
          controller.publicKey,
          controller
        );
        const admin = keyring.addFromUri(seed, {}, "ed25519");
        const data = decryptMsg(result.data, controller.publicKey, admin);
        return parseJson(data);
      } catch (error) {
        console.log(error.message);
        return false;
      }
    };

    const loadSetup = () => {
      console.log("loadSetup");
      const setupRaw = store.state.robonomicsUIvue.rws.list.find(
        (item) => item.owner === store.state.robonomicsUIvue.rws.active
      );
      if (setupRaw) {
        try {
          setup.controller = keyring.addFromUri(
            setupRaw.scontroller,
            {},
            "ed25519"
          );
          setup.admin = setupRaw.owner;
          return;
        } catch (error) {
          console.log(error);
        }
      }
      setup.controller = null;
      setup.admin = null;
    };

    const findTelemetryCid = async () => {
      console.log("findTelemetryCid start");
      if (!setup.controller) {
        console.log("not found controller");
        return;
      }
      try {
        configCid.value = "";
        datalogCid.value = "";
        const cid = await Promise.all([
          getConfigCid(robonomics, setup.controller.address),
          getLastDatalogCid(robonomics, setup.controller.address)
        ]);
        configCid.value = cid[0];
        datalogCid.value = cid[1];
      } catch (error) {
        console.log(error);
      }
      console.log("findTelemetryCid end");
    };

    watch(
      () => store.state.robonomicsUIvue.rws.active,
      () => {
        loadSetup();
      },
      { immediate: true }
    );

    watchEffect(() => {
      if (unsubscribeDatalog) {
        unsubscribeDatalog();
      }
      if (setup.controller) {
        findTelemetryCid();
        watchDatalog();
      } else {
        configCid.value = "";
        datalogCid.value = "";
      }
    });

    watch(datalogCid, async () => {
      console.log("load datalog start");
      console.log("datalog cid", setup.controller, datalogCid.value);
      if (datalogCid.value) {
        const result = await catFileContoller(
          setup.controller,
          datalogCid.value
        );
        if (result) {
          datalog.value = result;
          console.log("datalog", JSON.stringify(datalog.value));
        } else {
          console.log("load datalog not found");
        }
      } else {
        datalog.value = null;
      }
      console.log("load datalog end");
    });

    watch(configCid, async () => {
      console.log("load config start");
      // config.value = null;
      console.log("config cid", setup.controller, configCid.value);
      if (configCid.value) {
        const result = await catFileContoller(
          setup.controller,
          configCid.value
        );
        if (result) {
          config.value = result;
          console.log("config", JSON.stringify(config.value));
        } else {
          console.log("load config not found");
        }
      } else {
        config.value = null;
      }
      console.log("load config end");
    });

    const launch = async (command) => {
      console.log("launch command", command);

      const signature = (
        await robonomics.accountManager.account.signMsg(
          stringToU8a(robonomics.accountManager.account.address)
        )
      ).toString();

      ipfs.auth(robonomics.accountManager.account.address, signature);
      console.log("ipfs auth");

      const cid = await ipfs.add(JSON.stringify(command));
      console.log("launch ipfs file", cid.path);

      const call = robonomics.launch.send(setup.controller.address, cid.path);
      await tx.send(call, setup.admin);
      //   if (tx.error.value) {
      //     if (tx.error.value !== "Cancelled") {
      //       setStatus("error", tx.error.value);
      //     } else {
      //       setStatus("calcel");
      //     }
      //     return;
      //   }
    };

    watch(
      () => store.state.robonomicsUIvue.rws.launch,
      (value) => {
        try {
          launch(JSON.parse(value)[0]);
        } catch (error) {
          console.log(error);
        }
      }
    );

    const onUpdate = async (setStatus) => {
      try {
        console.log("start update");
        await findTelemetryCid();
        setStatus("ok");
        console.log("ok update");
      } catch (error) {
        console.log(error);
        setStatus("error", error.message);
      }
    };

    return { datalog, config, configCid, onUpdate, launch, tx };
  }
};
</script>
