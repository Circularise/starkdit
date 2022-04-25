import { Box, Flex } from "@chakra-ui/react";

interface Props {
  depth: number | string;
}
const DepthBox = ({ depth }: Props) => {
  return (
    <Flex
      ml="auto"
      p="0.5rem 1.125rem"
      bgColor="grey.grey3"
      borderRadius="2xl"
      fontWeight="bold"
      fontSize="lg"
      align="center"
      gap="0.375rem"
    >
      <Box>#</Box>
      <Box>{depth}</Box>
    </Flex>
  );
};

export default DepthBox;
