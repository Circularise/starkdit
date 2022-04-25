import { Button, Flex, Heading, Input, Text, Textarea } from "@chakra-ui/react";
import * as React from "react";

const AddPostForm = () => {
  const [newPostContent, setNewPostContent] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("TODO: create new post");
  };

  return (
    <Flex
      direction="column"
      gap="0.5rem"
      mt="3rem"
      as="form"
      onSubmit={handleSubmit}
    >
      <Text mb="0.5rem">Create your post as: (user token id TODO)</Text>
      <Text
        color="grey.grey5"
        fontWeight="bold"
        fontSize="1rem"
        as="label"
        htmlFor="content"
      >
        Your post
      </Text>
      <Textarea
        resize="vertical"
        height="8rem"
        focusBorderColor="brand.tertiary"
        bgColor="black"
        borderRadius="lg"
        borderColor="grey.grey3"
        _hover={{
          borderColor: "grey.grey4",
        }}
        id="content"
        value={newPostContent}
        onChange={(e) => setNewPostContent(e.target.value)}
      />
      <Button
        bgColor="brand.tertiary"
        width="fit-content"
        ml="auto"
        fontSize="1rem"
        type="submit"
      >
        Post
      </Button>
    </Flex>
  );
};

export default AddPostForm;
