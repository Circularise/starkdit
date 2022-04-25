import { Container, Flex, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import { AddPostForm, PostCard, PostHeader, Sidebar } from "~/components/UI";

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
        <PostHeader
          author="Circularise"
          title={`Isn't our designer Loes the best ever`}
          body={`Of course she is, this wasn't a real question`}
          blockNumber={0}
        />
        <AddPostForm />
      </Container>
    </div>
  );
};

export default Post;
