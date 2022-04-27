import { useContract } from "@starknet-react/core";
import { Abi } from "starknet";

import StarkditAbi from "~/abi/starkdit.json";

export const starkditContractAddress =
  "0x06be9e577628391089e647153d18ede05f138049a5f44ed984e4b7028bd5931a";

export function useStarkditContract() {
  return useContract({
    abi: StarkditAbi as Abi,
    address: starkditContractAddress,
  });
}
