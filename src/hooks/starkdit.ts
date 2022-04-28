import { useContract } from "@starknet-react/core";
import { Abi } from "starknet";

import StarkditAbi from "~/abi/starkdit.json";

export const starkditContractAddress =
  "0x057126db1ba64f8f2eaef3ca12b4fde74c30e5c33963e93795cd086806159c24";

export function useStarkditContract() {
  return useContract({
    abi: StarkditAbi as Abi,
    address: starkditContractAddress,
  });
}
