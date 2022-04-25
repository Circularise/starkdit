import { VStack, Box, Heading, Flex } from "@chakra-ui/react";
import { Post } from "~/schema/forum_structs";

const PostCard = ({ author, title, body, blockNumber }: Post) => {
  return (
    <VStack align="flex-start" p="20px" spacing="1rem" bgColor="grey.grey2">
      <Flex gap="1rem" width="100%">
        <Box
          bgColor={"silver"}
          borderRadius="full"
          height="24px"
          width="24px"
        />
        <Box>{author}</Box>
        <Box ml="auto">#{blockNumber}</Box>
      </Flex>
      <Heading as="h2" fontSize="md">
        {title}
      </Heading>
      <Box>{body}</Box>
      <Box>35 replies</Box>
    </VStack>
  );
};

export default PostCard;
