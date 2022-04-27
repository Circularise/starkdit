import {
  useStarknet,
  useStarknetInvoke,
  useStarknetCall,
} from "@starknet-react/core";
import { useStarkditContract } from "~/hooks/starkdit";
import { getPostsFromIPFS, getRootFromIPFS } from "~/ipfs/ipfs_mock";
import { Posts } from "~/schema/forum_structs";
import { Provider } from "starknet";

const provider = new Provider({
  baseUrl: "https://hackathon-4.starknet.io",
  feederGatewayUrl: "feeder_gateway",
  gatewayUrl: "gateway",
});

const fromHexString = (hexString) =>
  new Uint8Array(
    hexString
      .slice(2)
      .match(/.{1,2}/g)
      .map((byte) => parseInt(byte, 16))
  );

const toHexString = (bytes) =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");

const postprocessRootHash = (rootHash: any[]) => {
  const array = rootHash
    // remove first element which is just the length
    .slice(1)
    // build the Uint8Array(32)
    .reduce(
      (acc, curr) => new Uint8Array([...acc, ...fromHexString(curr)]),
      []
    );

  console.log("array: ", array);
};

export function useGetIPFSPrefix(callback: (prefix: string) => any) {
  const { account } = useStarknet();

  /*
    const { contract: starkdit } = useStarkditContract()
    const { data, loading, error, refresh } = useStarknetCall({ contract: starkdit, method: 'get_prefix' })

    if (!account || error != undefined) {
        console.log("[getIPFSPrefix] Starknet error? " + error)
        return null
    }

    if (loading) {
        console.log("[getIPFSPrefix] Get result loading")
        // should wait a while???
        // maybe refresh()???
    }

    var prefix: string | null = null;

    if (data != null) {
        prefix = data[0] as string
        console.log("[getIPFSPrefix] prefix: " + prefix)
    }
    */

  provider
    .callContract({
      contractAddress:
        "0x05779cb885e9208c93d77ff2fa669e4bf1f7a5c3ed4f5323663b45febe311351",
      entrypoint: "get_prefix",
    })
    .then((res) => {
      console.log("get prefix result");
      console.log(res.result);
      callback(res.result[0]);
    });
}

export function useGetRootPosts() {
  const { account } = useStarknet();

  /*
    const { contract: starkdit } = useStarkditContract()
    const { data, loading, error, refresh } = useStarknetCall({ contract: starkdit, method: 'get_root' })
    const ipfsPrefix = "prefix" //getIPFSPrefix()

    // console.log("[getRootPosts] Account: " + account)

    if (!account || ipfsPrefix == null || error != undefined) {
        console.log("[getRootPosts] Starknet error? " + error)
        return null
    }

    if (loading) {
        console.log("[getRootPosts] Get result loading")
        // should wait a while???
        // maybe refresh()???
    }

    var rootPosts: Posts | null = null;

    if (data != null) {
        const rootHash = data[0]
        console.log("[getRootPosts] Root hash: " + rootHash)

        // https://www.starknetjs.com/docs/API/contract
        // TODO root_hash is converted from a uint256 in cairo into a BigNumber
        // Not specified which implementation: 
        // @ethersproject/bignumber
        // "bignumber.js
        // bn.js
        const rootId = ipfsPrefix + rootHash // should be something like rootHash.toHex()
        // rootPosts = getPostsFromIPFS(rootId)
        // const root = getRootFromIPFS(rootId)
        // rootThreads = root.getThreads()
    } else {
        console.log("[getRootPosts] No data")
    }
    */

  const prefixCallback = (prefix: string): any => {
    provider
      .callContract({
        contractAddress:
          "0x05779cb885e9208c93d77ff2fa669e4bf1f7a5c3ed4f5323663b45febe311351",
        entrypoint: "get_root",
      })
      .then((res) => {
        console.log("get root call result");
        // console.log(res.result)

        const rootHash = res.result; // 4 big numbers
        postprocessRootHash(rootHash);
      });
  };

  useGetIPFSPrefix(prefixCallback);
}
