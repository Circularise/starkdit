import { Button } from "@chakra-ui/react";
import { useStarknet, InjectedConnector } from "@starknet-react/core";

function ConnectWalletButton() {
  const { connect } = useStarknet();

  return (
    <Button
      onClick={() => connect(new InjectedConnector())}
      bgColor="brand.tertiary"
    >
      Connect your wallet to post
    </Button>
  );
}

export default ConnectWalletButton;
