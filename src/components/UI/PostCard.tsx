import { VStack, Box, Heading, Flex, Text } from "@chakra-ui/react";
import { ArrowBack, ArrowForward } from "akar-icons";
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
      <Heading as="h2" fontSize="md" mt="1rem">
        {title}
      </Heading>
      <Box>{body}</Box>
      <Flex color="brand.tertiary" gap="0.75rem">
        <Box transform="rotate(180deg) translateY(10%)">
          <ArrowBack strokeWidth={2} size={24} />
        </Box>
        <Text fontWeight={"bold"}>35 replies</Text>
      </Flex>
    </Flex>
  );
};

export default PostCard;
