import { useStarknet } from "@starknet-react/core";
import useIpfs from "./useIpfs";
import useIpfsFactory from "./useIpfsFactory";
import * as React from "react";
import { useGetRootPosts } from "./StarkditAPI";

const getIpfsFile = async (ipfs: any, fileId: string) => {
  console.log("getting stuff ===============");

  const stream = await ipfs.cat(fileId);

  let data = "";

  console.log("here0");
  console.log("stream: ", stream);

  for (const chunk of stream) {
    console.log("chunk: ", chunk);
    // chunks of data are returned as a Buffer, convert it back to a string
    data += chunk.toString();
  }

  console.log("here");

  console.log("data: ", data);
};

const postIpfsFile = async (ipfs: any, fileContent: string) => {
  // add your data to to IPFS - this can be a string, a Buffer,
  // a stream of Buffers, etc
  const results = await ipfs.add(fileContent);

  console.log("resulsts: ", results);

  // we loop over the results because 'add' supports multiple
  // additions, but we only added one entry here so we only see
  // one log line in the output
  for await (const { cid } of results) {
    // CID (Content IDentifier) uniquely addresses the data
    // and can be used to get it again.
    console.log(cid.toString());
  }
};

const useIpfsLogic = () => {
  const { account } = useStarknet();
  // useGetRootPosts();
  // useGetIPFSPrefix();

  const { ipfs, ipfsInitError } = useIpfsFactory();
  const id = useIpfs(ipfs, "id");
  const [version, setVersion] = React.useState(null);

  // useGetRootPosts();

  React.useEffect(() => {
    if (!ipfs) return;

    const getVersion = async () => {
      const nodeId = await ipfs.version();
      setVersion(nodeId);

      // const fileId = "QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A";
      // const fileId = "Qmf5iBQo99MKuih9jQBNJckWgGaH1AKBd3tVHjEEbFY1sv";
      // getIpfsFile(ipfs, fileId)
    };

    getVersion();
  }, [ipfs]);
};

export default useIpfsLogic;
