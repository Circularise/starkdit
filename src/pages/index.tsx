import { Container, Flex, Heading, Textarea } from "@chakra-ui/react";
import type { NextPage } from "next";
import { AddPostForm, PostCard, Sidebar } from "~/components/UI";

const Home: NextPage = () => {
  return (
    <div>
      <Sidebar />
      <Container maxW="3xl" pt="3rem">
        <AddPostForm />
        <Heading as="h1" mt="3rem" mb="1.5rem">
          Freshest posts
        </Heading>
        <Flex direction="column" gap="2rem">
          <PostCard
            author="Circularise"
            title={`Isn't our designer Loes the best ever`}
            body={`Of course she is, this wasn't a real question`}
            blockNumber={0}
          />
          <PostCard
            author="Circularise"
            title={`Isn't our backend team wonderful?`}
            body={`They are incredible. They figure out very hard stuff, interplanetary stuff. They could be working quicker though. :p `}
            blockNumber={1}
          />
        </Flex>
      </Container>
    </div>
  );
};

export default Home;
