import { Box, Button, Container, Flex, Heading } from "@chakra-ui/react";
import {
  useStarknet,
  useStarknetTransactionManager,
} from "@starknet-react/core";
import type { NextPage } from "next";
import { AddPostForm, PostCard, Sidebar, TopBar } from "~/components";
import * as React from "react";
import { useGetRootPosts } from "~/hooks/StarkditAPI";
import { useIpfs } from "~/contexts/ipfsContext";

const Home: NextPage = () => {
  const { account } = useStarknet();

  const { handleSubmit, retrieveRoot, getPbodyFromRoot, getPprevFromRoot } =
    useGetRootPosts();
  const ipfs = useIpfs();

  const { transactions } = useStarknetTransactionManager();

  const [postList, setPostList] = React.useState<any[]>([]);

  const fetchPosts = React.useCallback(
    async (cid = null) => {
      let rootCid = cid;
      if (!rootCid) {
        rootCid = await retrieveRoot();
      }

      const p_body = await getPbodyFromRoot(rootCid);
      setPostList((prevPosts) => [...prevPosts, p_body]);

      const p_prev = await getPprevFromRoot(rootCid);
      fetchPosts(p_prev);
    },
    [retrieveRoot, getPbodyFromRoot, getPprevFromRoot]
  );

  React.useEffect(() => {
    if (ipfs && postList.length === 0) {
      fetchPosts();
    }
  }, [ipfs, postList, fetchPosts]);

  return (
    <Box pb="3rem">
      {account ? <Sidebar /> : <TopBar />}
      <Button onClick={() => fetchPosts()} disabled={!ipfs}>
        retrieve
      </Button>

      <Container maxW="3xl">
        {account ? <AddPostForm handleSubmit={handleSubmit} /> : null}
        <Heading as="h1" mt="3rem" mb="1.5rem">
          Freshest posts
        </Heading>
        <Flex direction="column" gap="2rem">
          {postList.map((post, index) => (
            <PostCard
              key={index}
              author="Circularise"
              title={`Anime grill`}
              body={post.value.text}
              blockNumber={0}
            />
          ))}

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
