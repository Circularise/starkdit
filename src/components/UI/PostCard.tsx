import { VStack, Box, Heading, Flex, Text } from "@chakra-ui/react";
import { ArrowBack, ArrowForward } from "akar-icons";
import { Post } from "~/schema/forum_structs";
import ReplyNumber from "./ReplyNumber";

const PostCard = ({ author, title, body, blockNumber }: Post) => {
  return (
    <Flex
      direction="column"
      align="flex-start"
      p="20px"
      gap="0.5rem"
      bgColor="grey.grey2"
      borderRadius="lg"
      width="100%"
      cursor="pointer"
      transition="box-shadow 0.2s ease-in, border-color 0.2s ease-in"
      borderWidth="2px"
      borderColor="transparent"
      _hover={{
        boxShadow: "2px 2px 26px #566EEF",
        borderColor: "brand.tertiary",
      }}
    >
      <Flex gap="1rem" width="100%" align="flex-start">
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
      <Heading as="h3" fontSize="md">
        {title}
      </Heading>
      <Box>{body}</Box>
      <ReplyNumber replyNumber={34} />
    </Flex>
  );
};

export default PostCard;
