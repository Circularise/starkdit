import {
  useStarknet,
  useStarknetInvoke,
  useStarknetCall,
} from "@starknet-react/core";
import { starkditContractAddress, useStarkditContract } from "~/hooks/starkdit";
import { getPostsFromIPFS, getRootFromIPFS } from "~/ipfs/ipfs_mock";
import { Posts } from "~/schema/forum_structs";
import { Provider } from "starknet";
import { CID } from "multiformats/cid";
import { keccak256 as hasher } from "@multiformats/sha3";
import * as codec from "@ipld/dag-cbor";
import * as Digest from "multiformats/hashes/digest";
import * as React from "react";

const provider = new Provider();

const fromHexString = (hexString: string) =>
  new Uint8Array(
    hexString
      .slice(2)
      .match(/.{1,2}/g)
      .map((byte) => parseInt(byte, 16))
  );

const toHexString = (bytes: Uint8Array) =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");

const postprocessRootHash = (rootHash: any[]) => {
  const hash = rootHash
    // remove first element which is just the length
    .slice(1)
    // build the Uint8Array(32)
    .reduce(
      (acc, curr) => new Uint8Array([...acc, ...fromHexString(curr)]),
      []
    );

  const digest = Digest.create(hasher.code, hash);
  const cid = CID.create(1, codec.code, digest);

  return cid;

  // console.log("cid: ", cid);
};

const preprocessUint8Array = (array: Uint8Array) => {
  const rh1 = toHexString(array.slice(0, 8));
  const rh2 = toHexString(array.slice(8, 16));
  const rh3 = toHexString(array.slice(16, 24));
  const rh4 = toHexString(array.slice(24, 32));

  const hash = [`0x4`, `0x${rh1}`, `0x${rh2}`, `0x${rh3}`, `0x${rh4}`];

  console.log(hash);

  return hash;
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

export function useGetRootPosts(ipfs: any) {
  const { account } = useStarknet();

  const { contract: starkditContract } = useStarkditContract();

  const { data: starkditRootResult } = useStarknetCall({
    contract: starkditContract,
    method: "get_root",
    args: [],
  });

  React.useEffect(() => {
    if (starkditRootResult) {
      console.log("starkditRootResult: ", starkditRootResult);
    }
  }, [starkditRootResult]);

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

  React.useEffect(() => {
    const fetchRootHash = async () => {
      const res = await provider.callContract({
        contractAddress: starkditContractAddress,
        entrypoint: "get_root",
      });

      console.log("res: ", res);

      const rootHash = res.result; // 4 big numbers
      const cid = postprocessRootHash(rootHash);

      console.log("cid: ", cid);

      const obj = await ipfs.dag.get(cid);

      console.log("obj: ", obj);
    };

    if (ipfs) {
      fetchRootHash();
    }
  }, [ipfs]);

  const handleSubmit = async () => {
    const hashes = [
      `${parseInt("0x4", 16)}`,
      `${parseInt("0xfd77568ba1e6eb58", 16)}`,
      `${parseInt("0x789227599e709a42", 16)}`,
      `${parseInt("0x3bc76ea26786fb50", 16)}`,
      `${parseInt("0xa92912aeb2603f30", 16)}`,
    ];

    const res = await provider.callContract({
      contractAddress: starkditContractAddress,
      entrypoint: "post",
      calldata: hashes,
    });

    console.log("result: ", res);
  };

  // useGetIPFSPrefix(prefixCallback);
  return { handleSubmit };
}
