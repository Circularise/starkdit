import { useContract } from "@starknet-react/core";
import { Abi } from "starknet";

import StarkditAbi from "~/abi/starkdit.json";

export function useCounterContract() {
  return useContract({
    abi: StarkditAbi as Abi,
    address: "0xTODO",
  });
}
