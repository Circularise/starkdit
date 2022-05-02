import { useContract } from "@starknet-react/core";
import { Abi } from "starknet";

import StarkditAbi from "~/abi/starkdit.json";

export const starkditContractAddress =
  "0x07884e5870d43a6e438a90de335afef048db749eae904a5542c4d28b554b5696";

export function useStarkditContract() {
  return useContract({
    abi: StarkditAbi as Abi,
    address: starkditContractAddress,
  });
}
