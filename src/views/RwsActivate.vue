<template>
  <robo-layout-section>
    <robo-template-rws-activate
      :price="price"
      activationtime="2"
      :available="freeAuctions"
      @on-rws-activate="onActivate"
    />
  </robo-layout-section>
</template>

<script>
import { useAccount } from "@/hooks/useAccount";
import { useBalance } from "@/hooks/useBalance";
import { useDevices } from "@/hooks/useDevices";
import { useRobonomics } from "@/hooks/useRobonomics";
import { useSend } from "@/hooks/useSend";
import { useSubscription } from "@/hooks/useSubscription";
import { fromUnit } from "@/utils/tools";
import { bnToBn } from "@polkadot/util";
import { computed, onUnmounted, ref, watchEffect } from "vue";

export default {
  setup() {
    const price = ref(0);
    const freeAuctions = ref(0);
    let unsubscribeBlock = null;

    const robonomics = useRobonomics();
    const { account, unsubscribe: unsubscribeAccount } = useAccount();
    const { balance, unsubscribe: unsubscribeBalance } = useBalance(account);
    const subscription = useSubscription(account);
    const devices = useDevices(account);

    // watchEffect(() => {
    //   if (subscription.hasSubscription.value) {
    //     if (subscription.isActive.value) {
    //       console.log("есть действующая подписка");
    //     } else {
    //       console.log("нужно продлить подписку");
    //     }
    //   } else {
    //     console.log("подписки нет");
    //   }
    // });

    (async () => {
      freeAuctions.value = (await robonomics.rws.getFreeAuctions()).length;
      unsubscribeBlock = await robonomics.events.onBlock(async () => {
        freeAuctions.value = (await robonomics.rws.getFreeAuctions()).length;
      });

      const minimalBid = await robonomics.rws.getMinimalBid();
      price.value = minimalBid.add(bnToBn(1));
    })();

    onUnmounted(() => {
      if (unsubscribeBlock) {
        unsubscribeBlock();
      }
      if (unsubscribeBalance) {
        unsubscribeBalance();
      }
      unsubscribeAccount();
    });

    const tx = useSend();
    const onActivate = async (setStatus) => {
      if (
        !balance.value ||
        bnToBn(balance.value).add(bnToBn(1000000000)).lt(price.value)
      ) {
        return setStatus(
          "error",
          "Subscription can not be activated due to unsuffcicient XRT balance"
        );
      }
      if (freeAuctions.value <= 0) {
        return setStatus("error", "There are no available subscriptions");
      }
      if (subscription.hasSubscription.value && subscription.isActive.value) {
        return setStatus("error", "You have an active subscription");
      }

      let call = robonomics.rws.bid(
        Number(await robonomics.rws.getFirtsFreeAuction()),
        price.value
      );
      if (!devices.devices.value.includes(account.value)) {
        call = robonomics.api.tx.utility.batch([
          call,
          robonomics.rws.setDevices([...devices.devices.value, account.value])
        ]);
      }
      await tx.send(call);
      if (tx.error.value) {
        if (tx.error.value !== "Cancelled") {
          setStatus("error", tx.error.value);
        } else {
          setStatus("calcel");
        }
        return;
      }

      const unsubscribeBlock = await robonomics.events.onBlock(() => {
        subscription.loadLedger();
      });
      const stopWatchEffect = watchEffect(() => {
        if (subscription.hasSubscription.value && subscription.isActive.value) {
          stopWatchEffect();
          unsubscribeBlock();
          setStatus("ok");
        }
      });
    };

    const priceFormat = computed(() => {
      return fromUnit(price.value, robonomics.api.registry.chainDecimals[0]);
    });

    return {
      freeAuctions,
      price: priceFormat,
      onActivate
    };
  }
};
</script>
