import type { AppProps } from "next/app";
import NextHead from "next/head";
import { InjectedConnector, StarknetProvider } from "@starknet-react/core";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "~/utils/theme";
import { Provider } from "starknet";

function MyApp({ Component, pageProps }: AppProps) {
  const connectors = [new InjectedConnector()];

  return (
    <StarknetProvider
      autoConnect
      connectors={
        new Provider({
          baseUrl: "https://hackathon-4.starknet.io",
        })
      }
    >
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
