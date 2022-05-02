import { create } from "ipfs-core";
import { useEffect, useState, useRef } from "react";
import { keccak256 as hasher } from "@multiformats/sha3";
import * as React from "react";
const showConsole = true;

/*
 * A quick demo using React hooks to create an ipfs instance.
 *
 * Hooks are brand new at the time of writing, and this pattern
 * is intended to show it is possible. I don't know if it is wise.
 *
 * Next steps would be to store the ipfs instance on the context
 * so use-ipfs calls can grab it from there rather than expecting
 * it to be passed in.
 */
export default function useIpfsFactory() {
  const [ipfs, setIpfs] = React.useState(null);

  const [ipfsInitError, setIpfsInitError] = useState(null);

  useEffect(() => {
    // The fn to useEffect should not return anything other than a cleanup fn,
    // So it cannot be marked async, which causes it to return a promise,
    // Hence we delegate to a async fn rather than making the param an async fn.

    startIpfs();
    // return function cleanup() {
    //   if (ipfs && ipfs.stop) {
    //     showConsole && console.log("Stopping IPFS");
    //     ipfs
    //       .stop()
    //       .catch((err) => showConsole && console.error(err));
    //     setIpfs(null);
    //   }
    // };
  }, []);

  async function startIpfs() {
    if (ipfs) {
      showConsole && console.log("IPFS already started");
    } else if (window.ipfs && window.ipfs.enable) {
      showConsole && console.log("Found window.ipfs");
      ipfs.hashers.addHasher(hasher);

      setIpfs(await window.ipfs.enable({ commands: ["id"] }));

      console.log("IPFS FOUND: ", ipfs);
    } else {
      try {
        showConsole && console.time("IPFS Started");
        const _ipfs = await create();
        _ipfs.hashers.addHasher(hasher);

        setIpfs(_ipfs);

        console.log("IPFS CREATED: ", _ipfs);
        showConsole && console.timeEnd("IPFS Started");
      } catch (error) {
        showConsole && console.error("IPFS init error:", error);
        setIpfs(null);
        setIpfsInitError(error);
      }
    }
  }

  return { ipfs, ipfsInitError };
}
