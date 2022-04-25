import { Button, Flex, Heading, Input, Text, Textarea } from "@chakra-ui/react";
import * as React from "react";

const AddPostForm = () => {
  const [newPostTitle, setNewPostTitle] = React.useState("");
  const [newPostContent, setNewPostContent] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("TODO: create new post");
  };

  return (
    <Flex direction="column" gap="0.5rem" as="form" onSubmit={handleSubmit}>
      <Heading as="h2" fontSize="md">
        Create your Post
      </Heading>
      <Text
        color="grey.grey5"
        fontWeight="bold"
        fontSize="1rem"
        as="label"
        htmlFor="title"
      >
        Title
      </Text>
      <Input
        focusBorderColor="brand.tertiary"
        bgColor="black"
        borderColor="grey.grey3"
        _hover={{
          borderColor: "grey.grey4",
        }}
        id="title"
        value={newPostTitle}
        onChange={(e) => setNewPostTitle(e.target.value)}
      />
      <Text
        color="grey.grey5"
        fontWeight="bold"
        fontSize="1rem"
        as="label"
        htmlFor="content"
      >
        Text (optional)
      </Text>
      <Textarea
        resize="vertical"
        height="10rem"
        focusBorderColor="brand.tertiary"
        bgColor="black"
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
