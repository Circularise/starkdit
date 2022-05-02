import { Box, Flex, Text } from "@chakra-ui/react";
import { ArrowBack } from "akar-icons";
import { number } from "starknet";

interface Props {
  replyNumber: number | string;
}

const ReplyNumber = ({ replyNumber }: Props) => {
  return (
    <Flex color="brand.tertiary" gap="0.75rem" mt="0.5rem">
      <Box transform="rotate(180deg) translateY(10%)">
        <ArrowBack strokeWidth={2} size={24} />
      </Box>
      <Text fontWeight={"bold"}>{replyNumber} replies</Text>
    </Flex>
  );
};

export default ReplyNumber;
