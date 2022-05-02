import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";

const Sidebar = () => {
  return (
    <Box
      position="fixed"
      top="0"
      bottom="0"
      left="0"
      height="100vh"
      width="120px"
      pt="1.5rem"
    >
      <Box mx="auto" width="fit-content">
        {/* <Image src="/StarkditLogo.svg" alt="me" width="64" height="64" /> */}
      </Box>
    </Box>
  );
};

export default Sidebar;
