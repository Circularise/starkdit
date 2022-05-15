import {
  useStarknet,
  useStarknetInvoke,
  useStarknetCall,
  useStarknetTransactionManager,
} from "@starknet-react/core";
import { starkditContractAddress, useStarkditContract } from "~/hooks/starkdit";
import { getPostsFromIPFS, getRootFromIPFS } from "~/ipfs/ipfs_mock";
import { Provider } from "starknet";
import { CID } from "multiformats/cid";
import { keccak256 as hasher } from "@multiformats/sha3";
import * as codec from "@ipld/dag-cbor";
import * as Digest from "multiformats/hashes/digest";
import * as React from "react";
import { hex } from "@47ng/codec";
import axios from "axios";
import { useIpfs } from "~/contexts/ipfsContext";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const showConsole = true;

const POST_CBOR_EVENT_KEY =
  "0x26c6d1d1411801c34186dccbbf411d984b25d44b537de2847ab2ce596c59b19";
const ROOT_CBOR_EVENT_KEY =
  "0x85cb918715d2ec89dc8ff4649dd62f5cb14e18b9f19d1a040264045d5c93fb";

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
  console.log("root cid: ", cid);

  return cid;
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

const postprocessCborv2 = (cbor: string[]) => {
  // pad cbor with 0s at the end if it requires it to make it 64bits
  const cbor64bits = cbor.map(
    (str) => str.slice(0, 2) + "0".repeat(18 - str.length) + str.slice(2)
  );

  return hex.decode(cbor64bits.reduce((acc, curr) => acc + curr.slice(2), ""));
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

  const { transactions } = useStarknetTransactionManager();

  const transactionRef = React.useRef(transactions);

  React.useEffect(() => {
    transactionRef.current = transactions;
  }, [transactions]);

  const getPbodyFromRoot = React.useCallback(
    async (rootCid) => {
      const root = await ipfs.dag.get(rootCid);

      showConsole && console.log("root: ", root);

      const cpost = await ipfs.dag.get(root.value.cpost);

      return await ipfs.dag.get(cpost.value.p_body);
    },
    [ipfs]
  );

  const getPprevFromRoot = React.useCallback(
    async (rootCid) => {
      const root = await ipfs.dag.get(rootCid);

      console.log("root in p_prev: ", root);
      return await ipfs.dag.get(root.value.p_prev);
    },
    [ipfs]
  );

  const getContentFromRoot = React.useCallback(
    async (rootCid) => {
      const root = await ipfs.dag.get(rootCid);

      showConsole && console.log("root: ", root);

      const cpost = await ipfs.dag.get(root.value.cpost);

      showConsole && console.log("cpost: ", cpost);

      const p_body = await ipfs.dag.get(cpost.value.p_body);

      showConsole && console.log("p_body: ", p_body);

      const p_prev = await ipfs.dag.get(root.value.p_prev);

      showConsole && console.log("p_prev: ", p_prev);

      return { p_body, p_prev };
    },
    [ipfs]
  );

  const retrieveRoot = React.useCallback(async () => {
    showConsole && console.log("retrieving");

    const res = await provider.callContract({
      contractAddress: starkditContractAddress,
      entrypoint: "get_root",
    });

    showConsole && console.log("res: ", res);

    const rootHash = res.result; // 4 big numbers
    const cid = postprocessRootHash(rootHash);

    showConsole && console.log("cid: ", cid);

    return cid;
  }, [ipfs, getContentFromRoot]);

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

    const previousTransactionLength = transactionRef.current.length;

    const res2 = await starkditInvokePost({ args: [hashesDecimals.slice(1)] });

    while (
      transactionRef.current.length === previousTransactionLength ||
      !["PENDING", "ACCEPTED_ON_L2"].includes(
        transactionRef.current[previousTransactionLength].status
      )
    ) {
      // console.log(
      //   "awaiting 500ms, tx: ",
      //   transactionRef.current.length > previousTransactionLength &&
      //     transactionRef.current[previousTransactionLength]
      // );
      await sleep(50);
    }

    console.log("result: ", res);
    console.log("result2: ", res2);
    console.log("tx: ", transactionRef.current);

    const info = await provider.getTransactionReceipt({
      txHash: transactionRef.current[previousTransactionLength].transactionHash,
    });

    console.log("info:", info);

    const postCBOR_pre = info.events.find(
      (event) => event.keys[0] === POST_CBOR_EVENT_KEY
    );
    const rootCBOR_pre = info.events.find(
      (event) => event.keys[0] === ROOT_CBOR_EVENT_KEY
    );

    console.log("postCBOR_pre:", postCBOR_pre);
    console.log("rootCBOR_pre:", rootCBOR_pre);

    const postCBOR = postprocessCborv2(postCBOR_pre?.data.slice(1));
    const rootCBOR = postprocessCborv2(rootCBOR_pre?.data.slice(1));

    // const { postCBOR, rootCBOR } = postprocessCbor(res.result);

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
  return {
    handleSubmit,
    retrieveRoot,
    getContentFromRoot,
    getPbodyFromRoot,
    getPprevFromRoot,
  };
}
