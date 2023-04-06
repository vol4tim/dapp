<template>
  <robo-template-devices-layout
    :onUpdate="onUpdate"
    :datalog="datalog"
    :config="config"
  />
</template>

<script>
import { useRobonomics } from "@/hooks/useRobonomics";
import { Keyring } from "@polkadot/keyring";
import { u8aToString } from "@polkadot/util";
import axios from "axios";
import { utils } from "robonomics-interface";
import { ref, watch } from "vue";
import { useStore } from "vuex";

const clear = (data) => {
  return data
    .replaceAll("'", '"')
    .replaceAll("\\", "")
    .replaceAll('""', '"')
    .replaceAll("True", "true")
    .replaceAll("False", "false")
    .replaceAll("None", '"None"');
};

export default {
  setup() {
    const datalog = ref();
    const config = ref();
    const datalogCid = ref("");
    const configCid = ref("");

    const robonomics = useRobonomics();
    const store = useStore();

    const k = new Keyring({
      ss58Format: robonomics.api?.registry.chainSS58
    });
    let controllerAccount;

    const getLastDatalogCid = async (controller) => {
      const r = await robonomics.datalog.read(controller);
      return r.length ? u8aToString(r[r.length - 1][1]) : false;
    };

    const getConfigCid = async (controller) => {
      if (!controller) {
        return;
      }
      const twin = await robonomics.twin.getTwinByOwner(controller);
      if (!twin) {
        return;
      }
      const configHex = Object.keys(twin).find(
        (key) => twin[key] === controller
      );
      return utils.hexToCid(configHex);
    };

    const decrypt = (encryptMessage) => {
      if (!controllerAccount) {
        return;
      }
      const decryptMessage = controllerAccount.decryptMessage(
        encryptMessage,
        controllerAccount.publicKey
      );
      return u8aToString(decryptMessage);
    };

    const catIpfs = async (cid) => {
      if (!cid) {
        return {};
      }
      const res = await axios.get(
        `${store.state.robonomicsUIvue.ipfs.activegateway}${cid}`
      );
      const data = decrypt(res.data);
      try {
        return JSON.parse(data);
      } catch (error) {
        console.log("error parse 1");
        console.log(data);
      }
      try {
        return JSON.parse(clear(data));
      } catch (error) {
        console.log("error parse 2");
        console.log(data);
      }
      return {};
    };

    watch(
      () => store.state.robonomicsUIvue.rws.active,
      async () => {
        const controller = store.state.robonomicsUIvue.rws.list.find(
          (item) => item.owner === store.state.robonomicsUIvue.rws.active
        );
        if (controller) {
          controllerAccount = k.addFromUri(
            controller.scontroller,
            {},
            "ed25519"
          );
          configCid.value = await getConfigCid(controllerAccount.address);
          datalogCid.value = await getLastDatalogCid(controllerAccount.address);
        }
      }
    );

    watch(datalogCid, async () => {
      const devices = await catIpfs(datalogCid.value);
      const twin_id = devices.twin_id;
      delete devices.twin_id;
      datalog.value = {
        devices: devices,
        twin_id: twin_id
      };
      console.log("datalog");
      console.log(JSON.stringify(datalog.value));
    });

    watch(configCid, async () => {
      config.value = await catIpfs(configCid.value);
      console.log("config");
      console.log(JSON.stringify(config.value));
    });

    (async () => {
      const controller = store.state.robonomicsUIvue.rws.list.find(
        (item) => item.owner === store.state.robonomicsUIvue.rws.active
      );
      if (controller) {
        try {
          controllerAccount = k.addFromUri(
            controller.scontroller,
            {},
            "ed25519"
          );
          configCid.value = await getConfigCid(controllerAccount.address);
          datalogCid.value = await getLastDatalogCid(controllerAccount.address);
        } catch (error) {
          console.log(error);
        }
      }
    })();

    const onUpdate = async (setStatus) => {
      config.value = {};
      datalog.value = {};
      try {
        if (controllerAccount) {
          configCid.value = await getConfigCid(controllerAccount.address);
          datalogCid.value = await getLastDatalogCid(controllerAccount.address);
          setStatus("ok");
        } else {
          setStatus("error", "Not found controller");
        }
      } catch (error) {
        console.log(error);
        setStatus("error", error.message);
      }
    };

    return { datalog, config, configCid, onUpdate };
  }
};
</script>
