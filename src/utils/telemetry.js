import { hexToU8a, u8aToString } from "@polkadot/util";
import { utils } from "robonomics-interface";

const clearJson = (string) => {
  return string
    .replaceAll("'", '"')
    .replaceAll("\\", "")
    .replaceAll('""', '"')
    .replaceAll("True", "true")
    .replaceAll("False", "false")
    .replaceAll("None", '"None"');
};

export const parseJson = (string) => {
  try {
    return JSON.parse(string);
  } catch (error) {
    console.log("error parse 1");
  }
  try {
    return JSON.parse(clearJson(string));
  } catch (error) {
    console.log("error parse 2");
  }
  return false;
};

export const decryptMsg = (encryptMessage, pk, account) => {
  const decryptMessage = account.decryptMessage(hexToU8a(encryptMessage), pk);
  return u8aToString(decryptMessage);
};

export const getLastDatalogCid = async (robonomics, controller) => {
  console.log("getLastDatalogCid");
  if (!controller) {
    return false;
  }
  const r = await robonomics.datalog.read(controller);
  return r.length ? u8aToString(r[r.length - 1][1]) : false;
};

export const getConfigCid = async (robonomics, controller) => {
  console.log("getConfigCid");
  if (!controller) {
    return false;
  }
  const twin = await robonomics.twin.getTwinByOwner(controller);
  if (!twin) {
    return false;
  }
  const configHex = Object.keys(twin).find((key) => twin[key] === controller);
  return utils.hexToCid(configHex);
};
