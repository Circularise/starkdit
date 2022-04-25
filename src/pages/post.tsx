import { Container } from "@chakra-ui/react";
import type { NextPage } from "next";
import { PostHeader, Sidebar } from "~/components/UI";
import AddCommentForm from "~/components/UI/AddCommentForm";

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
        <AddCommentForm />
      </Container>
    </div>
  );
};

export default Post;
