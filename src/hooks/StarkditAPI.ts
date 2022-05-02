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
import { hex } from "@47ng/codec";
import axios from "axios";
import { useIpfs } from "~/contexts/ipfsContext";

const provider = new Provider();

const fromHexString = (hexString: string) =>
  new Uint8Array(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

const toHexString = (bytes: Uint8Array) =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");

const postprocessRootHash = (rootHash: any[]) => {
  const hash = rootHash
    // remove first element which is just the length
    .slice(1)
    // build the Uint8Array(32)
    .reduce(
      (acc, curr) => new Uint8Array([...acc, ...hex.decode(curr.slice(2))]),
      []
    );

  console.log("hash: ", hash);

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

const postprocessCbor = (cbor: string[]) => {
  // pad cbor with 0s at the end if it requires it to make it 64bits
  const cbor64bits = cbor.map(
    (str) => str.slice(0, 2) + "0".repeat(18 - str.length) + str.slice(2)
  );

  console.log("cbor: ", cbor);
  console.log("cbor64bits: ", cbor64bits);

  const postCBOR = hex.decode(
    cbor64bits.slice(1, 17).reduce((acc, curr) => acc + curr.slice(2), "")
  );

  const rootCBOR = hex.decode(
    cbor64bits.slice(18, 30).reduce((acc, curr) => acc + curr.slice(2), "")
  );

  return { postCBOR, rootCBOR };
};

export function useGetIPFSPrefix(callback: (prefix: string) => any) {
  const { account } = useStarknet();

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
  const ipfs = useIpfs();
  // const ipfs = null;

  const { contract: starkditContract } = useStarkditContract();

  React.useEffect(() => {
    console.log("ipfs is: ", ipfs);
  }, [ipfs]);

  const { data: starkditRootResult } = useStarknetCall({
    contract: starkditContract,
    method: "get_root",
    args: [],
  });

  const { invoke: starkditInvokePost } = useStarknetInvoke({
    contract: starkditContract,
    method: "post",
  });

  const retrieveRoot = React.useCallback(async () => {
    const showConsole = false;

    showConsole && console.log("retrieving");

    const res = await provider.callContract({
      contractAddress: starkditContractAddress,
      entrypoint: "get_root",
    });

    showConsole && console.log("res: ", res);

    const rootHash = res.result; // 4 big numbers
    const cid = postprocessRootHash(rootHash);

    showConsole && console.log("cid: ", cid);

    const root = await ipfs.dag.get(cid);

    showConsole && console.log("root: ", root);

    const cpost = await ipfs.dag.get(root.value.cpost);

    showConsole && console.log("cpost: ", cpost);

    const p_body = await ipfs.dag.get(cpost.value.p_body);

    showConsole && console.log("p_body: ", p_body);

    const p_prev = await ipfs.dag.get(root.value.p_prev);

    showConsole && console.log("p_prev: ", p_prev);

    return p_body;
  }, [ipfs]);

  React.useEffect(() => {
    const fetchRootHash = async () => {
      const res = await provider.callContract({
        contractAddress: starkditContractAddress,
        entrypoint: "get_root",
      });

      console.log("res: ", res);

      const rootHash = res.result; // 4 big numbers
      const cid = postprocessRootHash(rootHash);
      //
      // console.log("cid: ", cid);

      const obj = await ipfs.dag.get(cid);

      console.log("obj: ", obj);
    };

    if (ipfs) {
      fetchRootHash();
    }
  }, [ipfs]);

  const handleSubmit = async (text: string) => {
    const postBody = {
      title: "Title",
      text,
    };

    console.log("postBody: ", postBody);

    const postBodyCID = await ipfs.dag.put(postBody, {
      hashAlg: "keccak-256",
      pin: true,
    });

    console.log("postBodyCID: ", postBodyCID);

    const postBodyCidHash = [
      "0x4",
      ...(hex
        .encode(postBodyCID.multihash.digest)
        .match(/.{1,16}/g)
        ?.map((hex) => `0x${hex}`) ?? []),
    ];

    console.log("postBodyCidHash: ", postBodyCidHash);

    const hashesDecimals = postBodyCidHash.map((hash) =>
      BigInt(hash).toString(10)
    );

    console.log("hashesDecimals: ", hashesDecimals);

    const res = await provider.callContract({
      contractAddress: starkditContractAddress,
      entrypoint: "post",
      calldata: hashesDecimals,
    });
    // await starkditInvokePost({ args: [hashesDecimals.slice(1)] });

    console.log("result: ", res);

    const { postCBOR, rootCBOR } = postprocessCbor(res.result);

    console.log("postCBOR: ", postCBOR);
    console.log("rootCBOR: ", rootCBOR);
    console.log("postCBOR decoded: ", codec.decode(postCBOR));
    console.log("rootCBOR decoded: ", codec.decode(rootCBOR));

    const emptyObjectCid = await ipfs.dag.put(
      {},
      { hashAlg: "keccak-256", pin: true }
    );

    console.log("emptyObjectCid: ", emptyObjectCid);

    const postCid = await ipfs.dag.put(postCBOR, {
      inputCodec: "dag-cbor",
      storeCodec: "dag-cbor",
      hashAlg: "keccak-256",
      pin: true,
    });

    console.log("postCid: ", postCid);

    const rootCid = await ipfs.dag.put(rootCBOR, {
      inputCodec: "dag-cbor",
      storeCodec: "dag-cbor",
      hashAlg: "keccak-256",
      pin: true,
    });

    console.log("rootCid: ", rootCid);
  };

  // useGetIPFSPrefix(prefixCallback);
  return { handleSubmit, retrieveRoot };
}
