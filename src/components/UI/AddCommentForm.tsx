import { Box, Button, Flex, Text, Textarea } from "@chakra-ui/react";
import * as React from "react";
import DepthBox from "./DepthBox";

const AddCommentForm = () => {
  const [comment, setComment] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("TODO: create new post");
  };

  return (
    <Flex align="flex-start" gap="1rem" mt="1.5rem" mb="2rem">
      <Box flexShrink={1} mt="2.5rem">
        <DepthBox depth={36} />
      </Box>
      <Flex
        direction="column"
        gap="0.5rem"
        as="form"
        onSubmit={handleSubmit}
        flexGrow={1}
      >
        <Text
          color="grey.grey5"
          fontWeight="bold"
          fontSize="1rem"
          as="label"
          htmlFor="content"
        >
          Comment: (as user: user ID TODO)
        </Text>
        <Textarea
          resize="vertical"
          focusBorderColor="brand.tertiary"
          bgColor="black"
          borderRadius="lg"
          borderColor="grey.grey3"
          _hover={{
            borderColor: "grey.grey4",
          }}
          _placeholder={{ color: "grey.grey4" }}
          id="content"
          placeholder="What do you think? Comment @tokenID to refer to earlier messages"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          bgColor="brand.tertiary"
          width="fit-content"
          ml="auto"
          fontSize="1rem"
          type="submit"
        >
          Reply
        </Button>
      </Flex>
    </Flex>
  );
};

export default AddCommentForm;
