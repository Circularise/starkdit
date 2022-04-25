import { VStack, Box, Heading, Flex, Text } from "@chakra-ui/react";
import { Post } from "~/schema/forum_structs";

const PostCard = ({ author, title, body, blockNumber }: Post) => {
  return (
    <Flex
      direction="column"
      align="flex-start"
      p="20px"
      gap="1rem"
      bgColor="grey.grey2"
      borderRadius="lg"
      width="100%"
    >
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
      <Heading as="h2" fontSize="md" mt="1rem">
        {title}
      </Heading>
      <Box>{body}</Box>
      <Box>
        <Text color="brand.tertiary">35 replies</Text>
      </Box>
    </Flex>
  );
};

export default PostCard;
