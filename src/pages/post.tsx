import { Container, Flex, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import { AddPostForm, PostCard, Sidebar } from "~/components/UI";

const Post: NextPage = () => {
  return (
    <div>
      <Sidebar />
      <Container
        maxW="3xl"
        mt="3rem"
        p="1.5rem"
        bgColor="grey.grey2"
        borderRadius="lg"
      >
        <AddPostForm />
      </Container>
    </div>
  );
};

export default Post;
