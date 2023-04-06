import { ref } from "vue";
import { useRobonomics } from "./useRobonomics";
import { getFreeWeightCalc } from "./useSubscription";

export const getCallWeight = async (tx, signer) => {
  if (!signer) {
    const robonomics = useRobonomics();
    if (robonomics.accountManager.account) {
      signer = robonomics.accountManager.account.address;
    } else {
      throw new Error("Signer required");
    }
  }
  return (await tx.paymentInfo(signer)).weight.toNumber();
};

export const checkWeight = async (tx, owner) => {
  const freeWeightCalc = await getFreeWeightCalc(owner);
  if (freeWeightCalc < 0) {
    throw new Error(`Not found ledger ${owner}`);
  }
  const callWeight = await getCallWeight(tx);
  if (callWeight > freeWeightCalc) {
    throw new Error(
      `The origin account have no enough free weight to process these call. Call weight ${callWeight}, Free weight ${freeWeightCalc}`
    );
  }
};

export const useSend = () => {
  const robonomics = useRobonomics();
  const result = ref(null);
  const error = ref(null);
  const process = ref(false);
  const send = async (tx, subscription = false) => {
    result.value = null;
    error.value = null;
    process.value = true;
    try {
      if (subscription) {
        await checkWeight(tx, subscription);
        robonomics.accountManager.useSubscription(subscription);
      }
      result.value = await robonomics.accountManager.signAndSend(tx);
      console.log("tx", result.value.block, result.value.tx);
    } catch (e) {
      error.value = e.message;
    }
    process.value = false;
    if (subscription) {
      robonomics.accountManager.useSubscription(false);
    }
    return result;
  };
  return { error, process, result, send };
};
