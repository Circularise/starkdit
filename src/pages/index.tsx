import { Box, Button, Container, Flex, Heading } from "@chakra-ui/react";
import {
  useStarknet,
  useStarknetTransactionManager,
} from "@starknet-react/core";
import type { NextPage } from "next";
import { AddPostForm, PostCard, Sidebar, TopBar } from "~/components/UI";
import useIpfsLogic from "~/hooks/useIpfsLogic";

const Home: NextPage = () => {
  const { account } = useStarknet();
  const { handleSubmit, retrieveRoot } = useIpfsLogic();
  const { transactions } = useStarknetTransactionManager();

  return (
    <Box pb="3rem">
      {account ? <Sidebar /> : <TopBar />}
      <Button onClick={retrieveRoot}>retrieve</Button>

      <Button onClick={() => handleSubmit("post")}>post</Button>

      <Container maxW="3xl">
        {account ? <AddPostForm handleSubmit={handleSubmit} /> : null}
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
          <PostCard
            author="Circularise"
            title={`Isn't our designer Loes the best ever`}
            body={`Of course she is, this wasn't a real question`}
            blockNumber={2}
          />
          <PostCard
            author="Circularise"
            title={`Isn't our backend team wonderful?`}
            body={`They are incredible. They figure out very hard stuff, interplanetary stuff. They could be working quicker though. :p `}
            blockNumber={3}
          />
          <PostCard
            author="Circularise"
            title={`Isn't our designer Loes the best ever`}
            body={`Of course she is, this wasn't a real question`}
            blockNumber={4}
          />
          <PostCard
            author="Circularise"
            title={`Isn't our backend team wonderful?`}
            body={`They are incredible. They figure out very hard stuff, interplanetary stuff. They could be working quicker though. :p `}
            blockNumber={5}
          />
        </Flex>
      </Container>
    </Box>
  );
};

export default Home;
