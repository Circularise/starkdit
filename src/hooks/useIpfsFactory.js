import { create } from "ipfs-core";
import { useEffect, useState } from "react";
import { keccak256 as hasher } from "@multiformats/sha3";

let ipfs = null;
const showConsole = false;

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
  const [isIpfsReady, setIpfsReady] = useState(Boolean(ipfs));
  const [ipfsInitError, setIpfsInitError] = useState(null);

  useEffect(() => {
    // The fn to useEffect should not return anything other than a cleanup fn,
    // So it cannot be marked async, which causes it to return a promise,
    // Hence we delegate to a async fn rather than making the param an async fn.

    startIpfs();
    return function cleanup() {
      if (ipfs && ipfs.stop) {
        showConsole && console.log("Stopping IPFS");
        ipfs.stop().catch((err) => showConsole && console.error(err));
        ipfs = null;
        setIpfsReady(false);
      }
    };
  }, []);

  async function startIpfs() {
    if (ipfs) {
      showConsole && console.log("IPFS already started");
    } else if (window.ipfs && window.ipfs.enable) {
      showConsole && console.log("Found window.ipfs");
      ipfs.hashers.addHasher(hasher);

      ipfs = await window.ipfs.enable({ commands: ["id"] });

      console.log("IPFS FOUND: ", ipfs);
    } else {
      try {
        showConsole && console.time("IPFS Started");
        ipfs = await create();
        ipfs.hashers.addHasher(hasher);

        console.log("IPFS CREATED: ", ipfs);
        showConsole && console.timeEnd("IPFS Started");
      } catch (error) {
        showConsole && console.error("IPFS init error:", error);
        ipfs = null;
        setIpfsInitError(error);
      }
    }

    setIpfsReady(Boolean(ipfs));
  }

  return { ipfs, isIpfsReady, ipfsInitError };
}
