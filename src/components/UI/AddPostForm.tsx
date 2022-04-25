import { Button, Flex, Heading, Input, Textarea } from "@chakra-ui/react";
import * as React from "react";

const AddPostForm = () => {
  const [newPostTitle, setNewPostTitle] = React.useState("");
  const [newPostContent, setNewPostContent] = React.useState("");

  return (
    <Flex direction="column" gap="0.5rem">
      <Heading as="h2" fontSize="md">
        Create your Post
      </Heading>
      <Input
        focusBorderColor="brand.tertiary"
        bgColor="black"
        borderColor="grey.grey3"
        _hover={{
          borderColor: "grey.grey4",
        }}
        value={newPostTitle}
        onChange={(e) => setNewPostTitle(e.target.value)}
      />
      <Textarea
        resize="vertical"
        height="10rem"
        focusBorderColor="brand.tertiary"
        bgColor="black"
        borderColor="grey.grey3"
        _hover={{
          borderColor: "grey.grey4",
        }}
        value={newPostContent}
        onChange={(e) => setNewPostContent(e.target.value)}
      />
      <Button
        bgColor="brand.tertiary"
        width="fit-content"
        ml="auto"
        fontSize="1rem"
      >
        Post
      </Button>
    </Flex>
  );
};

export default AddPostForm;
