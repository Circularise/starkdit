import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { Post } from "~/schema/forum_structs";
import DepthBox from "./DepthBox";

const Comment = ({ author, body, blockNumber }: Omit<Post, "title">) => {
  return (
    <Flex direction="column" width="100%">
      <Flex gap="0.5rem" width="100%" align="flex-start">
        <Box
          bgColor={"silver"}
          borderRadius="full"
          height="24px"
          width="24px"
        />
        <Box>{author}</Box>
        <DepthBox depth={blockNumber} variant="small" />
      </Flex>
      <Container maxW="xl" ml="0" pl="0">
        <Text fontSize="1rem">{body}</Text>
      </Container>
    </Flex>
  );
};

export default Comment;
