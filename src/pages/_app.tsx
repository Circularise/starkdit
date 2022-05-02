import type { AppProps } from "next/app";
import NextHead from "next/head";
import { InjectedConnector, StarknetProvider } from "@starknet-react/core";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "~/utils/theme";
import { Provider } from "starknet";
import { IpfsContextProvider } from "~/contexts/ipfsContext";

function MyApp({ Component, pageProps }: AppProps) {
  const connectors = [new InjectedConnector()];

  return (
    <StarknetProvider autoConnect connectors={connectors}>
      <ChakraProvider theme={theme}>
        <IpfsContextProvider>
          <NextHead>
            <title>StarkNet ❤️ React</title>
          </NextHead>
          <Component {...pageProps} />
        </IpfsContextProvider>
      </ChakraProvider>
    </StarknetProvider>
  );
}

export default MyApp;
