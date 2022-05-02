import * as React from "react";
import useIpfsLogic from "~/hooks/useIpfsLogic";

// create context
const IpfsContext = React.createContext(undefined);

interface Props {
  children: React.ReactNode;
}

const IpfsContextProvider = ({ children }: Props) => {
  const { ipfs } = useIpfsLogic();

  console.log("in context, ipfs: ", ipfs);

  return (
    // the Provider gives access to the context to its children
    <IpfsContext.Provider value={ipfs}>{children}</IpfsContext.Provider>
  );
};

// context consumer hook
const useIpfs = () => {
  // get the context
  const context = React.useContext(IpfsContext);

  return context;
};

export { useIpfs, IpfsContextProvider };
