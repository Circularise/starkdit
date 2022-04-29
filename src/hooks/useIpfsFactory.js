import { create } from "ipfs-core";
import { useEffect, useState, useRef } from "react";
import { keccak256 as hasher } from "@multiformats/sha3";

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
  const ipfsRef = useRef();

  const [isIpfsReady, setIpfsReady] = useState(Boolean(ipfsRef.current));
  const [ipfsInitError, setIpfsInitError] = useState(null);

  useEffect(() => {
    // The fn to useEffect should not return anything other than a cleanup fn,
    // So it cannot be marked async, which causes it to return a promise,
    // Hence we delegate to a async fn rather than making the param an async fn.

    startIpfs();
    // return function cleanup() {
    //   if (ipfsRef.current && ipfsRef.current.stop) {
    //     showConsole && console.log("Stopping IPFS");
    //     ipfsRef.current
    //       .stop()
    //       .catch((err) => showConsole && console.error(err));
    //     ipfsRef.current = null;
    //     setIpfsReady(false);
    //   }
    // };
  }, []);

  async function startIpfs() {
    if (ipfsRef.current) {
      showConsole && console.log("IPFS already started");
    } else if (window.ipfs && window.ipfs.enable) {
      showConsole && console.log("Found window.ipfs");
      ipfsRef.current.hashers.addHasher(hasher);

      ipfsRef.current = await window.ipfs.enable({ commands: ["id"] });

      console.log("IPFS FOUND: ", ipfsRef.current);
    } else {
      try {
        showConsole && console.time("IPFS Started");
        ipfsRef.current = await create();
        ipfsRef.current.hashers.addHasher(hasher);

        console.log("IPFS CREATED: ", ipfsRef.current);
        showConsole && console.timeEnd("IPFS Started");
      } catch (error) {
        showConsole && console.error("IPFS init error:", error);
        ipfsRef.current = null;
        setIpfsInitError(error);
      }
    }

    setIpfsReady(Boolean(ipfsRef.current));
  }

  return { ipfsRef, isIpfsReady, ipfsInitError };
}
