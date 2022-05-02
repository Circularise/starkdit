import { useContract } from "@starknet-react/core";
import { Abi } from "starknet";

import StarkditAbi from "~/abi/starkdit.json";

export const starkditContractAddress =
  "0x07724599e2ca55aeb3956c622e8c1ba82dd2c518b99180da310a5432da956a4f";

export function useStarkditContract() {
  return useContract({
    abi: StarkditAbi as Abi,
    address: starkditContractAddress,
  });
}
