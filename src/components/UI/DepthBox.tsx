import { Box, Flex } from "@chakra-ui/react";

interface Props {
  depth: number | string;
  variant?: "normal" | "small";
}
const DepthBox = ({ depth, variant = "normal" }: Props) => {
  return (
    <Flex
      ml="auto"
      p={variant === "normal" ? "0.5rem 1.125rem" : "0.25rem 0.875rem"}
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
