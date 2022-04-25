import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import { Post } from "~/schema/forum_structs";
import ReplyNumber from "./ReplyNumber";

const PostHeader = ({ author, title, body, blockNumber }: Post) => {
  return (
    <Flex direction="column" align="flex-start" gap="0.5rem" width="100%">
      <Flex gap="0.5rem" width="100%" align="flex-start">
        <Box
          bgColor={"silver"}
          borderRadius="full"
          height="24px"
          width="24px"
        />
        <Box>{author}</Box>
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
          <Box>{blockNumber}</Box>
        </Flex>
      </Flex>
      <Heading as="h1" fontSize="4xl" mt="0.5rem">
        {title}
      </Heading>
      <Box>
        <Text fontSize="1rem">{body}</Text>
      </Box>
      <ReplyNumber replyNumber={34} />
    </Flex>
  );
};

export default PostHeader;
