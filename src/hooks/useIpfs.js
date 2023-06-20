import { useAccount } from "@/hooks/useAccount";
import { getInstance } from "@/plugins/ipfs";
import { watch } from "vue";

export function useIpfs() {
  const { account } = useAccount();

  let ipfs;
  try {
    ipfs = getInstance();
  } catch (e) {
    console.log(e);
  }

  watch(account, async () => {
    ipfs.authClear();
  });

  return ipfs;
}
