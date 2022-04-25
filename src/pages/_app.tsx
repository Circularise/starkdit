import type { AppProps } from "next/app";
import NextHead from "next/head";
import { InjectedConnector, StarknetProvider } from "@starknet-react/core";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "~/utils/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const connectors = [new InjectedConnector()];

  return (
    <StarknetProvider autoConnect connectors={connectors}>
      <ChakraProvider theme={theme}>
        <NextHead>
          <title>StarkNet ❤️ React</title>
        </NextHead>
        <Component {...pageProps} />
      </ChakraProvider>
    </StarknetProvider>
  );
}

export default MyApp;
