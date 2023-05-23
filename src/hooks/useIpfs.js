import { getInstance } from "@/plugins/ipfs";

export function useIpfs() {
  try {
    return getInstance();
  } catch (e) {
    console.log(e);
  }
}
