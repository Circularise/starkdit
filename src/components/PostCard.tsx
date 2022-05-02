import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import { Post } from "~/schema/forum_structs";
import DepthBox from "./DepthBox";

const PostCard = ({ author, body, blockNumber }: Post) => {
  return (
    <Flex
      direction="column"
      align="flex-start"
      p="20px"
      gap="0.5rem"
      bgColor="grey.grey2"
      borderRadius="lg"
      width="100%"
    >
      <Flex gap="1rem" width="100%" align="flex-start">
        <Box
          bgColor={"silver"}
          borderRadius="full"
          height="24px"
          width="24px"
        />
        <Box>{author}</Box>
        <DepthBox depth={blockNumber} variant="small" />
      </Flex>
      <Box>
        <Text>{body}</Text>
      </Box>
    </Flex>
  );
};

export default PostCard;
