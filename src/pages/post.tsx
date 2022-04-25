import { Container, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { Comment, PostHeader, Sidebar } from "~/components/UI";
import AddCommentForm from "~/components/UI/AddCommentForm";

// This is in the scenario where we have replies to post
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
        <Flex direction="column" gap="2rem">
          <Comment
            author="User token ID"
            body="Nowadays, it’s an amazing time to be a designer. We learn from our peers, from our mentors, and from all the resources available to us today. That’s why you will never be short of excellent resources on the web to learn and Practise from.
            "
            blockNumber={0}
          />
          <Comment
            author="User token ID"
            body="Nowadays, it’s an amazing time to be a designer. We learn from our peers, from our mentors, and from all the resources available to us today. That’s why you will never be short of excellent resources on the web to learn and Practise from.
            "
            blockNumber={1}
          />
        </Flex>
      </Container>
    </div>
  );
};

export default Post;
