import { Container, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import { PostCard } from "~/components/UI";

const Home: NextPage = () => {
  return (
    <div>
      <Container maxW="3xl">
        <Heading as="h1">Posts</Heading>
        <PostCard
          author="Circularise"
          title={`Isn't our designer Loes the best ever`}
          body={`Of course she is, this wasn't a real question`}
          blockNumber={1234}
        />
      </Container>
    </div>
  );
};

export default Home;
