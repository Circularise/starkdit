import { useContract } from "@starknet-react/core";
import { Abi } from "starknet";

import StarkditAbi from "~/abi/starkdit.json";

export function useStarkditContract() {
  return useContract({
    abi: StarkditAbi as Abi,
    address: "0x492e298d4839277d32278d71839b856dc41471ce09b5462f90334834aa7d583",
  });
}
