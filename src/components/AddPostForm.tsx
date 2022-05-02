import { Button, Flex, Text, Textarea } from "@chakra-ui/react";
import { useStarknet } from "@starknet-react/core";
import * as React from "react";
import { useIpfs } from "~/contexts/ipfsContext";

const AddPostForm = ({
  handleSubmit,
}: {
  handleSubmit: (content: string) => void;
}) => {
  const { account } = useStarknet();
  const ipfs = useIpfs();

  const [newPostContent, setNewPostContent] = React.useState("");

  const handlePostSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleSubmit(newPostContent);
  };

  return (
    <Flex
      direction="column"
      gap="0.5rem"
      mt="3rem"
      as="form"
      onSubmit={handlePostSubmit}
    >
      <Text mb="0.5rem">Create your post as: {account}</Text>
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
        disabled={!ipfs}
      >
        Post
      </Button>
    </Flex>
  );
};

export default AddPostForm;
