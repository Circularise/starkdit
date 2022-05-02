import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import { Post } from "~/schema/forum_structs";
import DepthBox from "./DepthBox";
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
        <DepthBox depth={blockNumber} />
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
