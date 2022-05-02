import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import ConnectWalletButton from "./ConnectWalletButton";

const TopBar = () => {
  return (
    <Box bgColor="grey.grey0" width="100%" pb="3rem">
      <Flex align="flex-start" justify="space-between" width="100%" p="1.5rem">
        <Image src="/StarkditLogoBig.svg" alt="me" width="325" height="84" />
        <ConnectWalletButton />
      </Flex>

      <Container maxW="3xl" display="flex" flexDirection="column" gap="0.5rem">
        <Heading as="h2" fontSize="lg">
          StarkDit is the first IPFS based forum build on StarkNet
        </Heading>
        <Text>
          {`StarkDit is uncensorable by outsiders, always available, and out of
          the control of one single power — even if that power is a member of
          the forum’s community — and yet to still offer the same experience for
          everyone in that community.`}
        </Text>
      </Container>
    </Box>
  );
};

export default TopBar;
