import { useState, useEffect } from "react";
import { getProperty } from "dot-prop";
// dot-prop: used to obtain a property of an object when the name of property is a string
// here we get ipfs.id when calling dotProp.get(ipfs, cmd), with cmd = 'id'
// and we get ipfs.hash when calling with cmd = 'hash' etc.

const showConsole = false;

/*
 * Pass the command you'd like to call on an ipfs instance.
 *
 * callIpfs uses setState write the response as a state variable, so that your component
 * will re-render when the result 'res' turns up from the call await ipfsCmd.
 *
 */

export default function useIpfs(ipfsRef, cmd, opts) {
  const [res, setRes] = useState(null);
  useEffect(() => {
    callIpfs(ipfsRef, cmd, setRes, opts);
  }, [ipfsRef, cmd, opts]);
  return res;
}

async function callIpfs(ipfsRef, cmd, setRes, ...opts) {
  if (!ipfsRef.current) return null;
  showConsole && console.log(`Call ipfs.${cmd}`);
  const ipfsCmd = getProperty(ipfsRef.current, cmd);
  const res = await ipfsCmd(...opts);
  showConsole && console.log(`Result ipfs.${cmd}`, res);
  setRes(res);
}
