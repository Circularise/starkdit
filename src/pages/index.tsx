import { Container, Flex, Heading } from "@chakra-ui/react";
import { useStarknet } from "@starknet-react/core";
import type { NextPage } from "next";
import { AddPostForm, PostCard, Sidebar, TopBar } from "~/components/UI";
import * as React from "react";
import useIpfsFactory from "~/hooks/useIpfsFactory";
import useIpfs from "~/hooks/useIpfs";
import { useGetRootPosts } from "~/components/StarkditAPI";

const Home: NextPage = () => {
  const { account } = useStarknet();
  const rootPosts = useGetRootPosts();

  const { ipfs, ipfsInitError } = useIpfsFactory();
  const id = useIpfs(ipfs, "id");
  const [version, setVersion] = React.useState(null);

  React.useEffect(() => {
    if (!ipfs) return;

    const getVersion = async () => {
      const nodeId = await ipfs.version();
      setVersion(nodeId);

      // const data = "Hello, test this 123 Starkdit";

      // // add your data to to IPFS - this can be a string, a Buffer,
      // // a stream of Buffers, etc
      // const results = await ipfs.add(data);

      // console.log("resulsts: ", results);

      // // we loop over the results because 'add' supports multiple
      // // additions, but we only added one entry here so we only see
      // // one log line in the output
      // for await (const { cid } of results) {
      //   // CID (Content IDentifier) uniquely addresses the data
      //   // and can be used to get it again.
      //   console.log(cid.toString());
      // }

      console.log("getting stuff ===============");

      // const stream = ipfs.cat("QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A");
      const stream = ipfs.cat("Qmf5iBQo99MKuih9jQBNJckWgGaH1AKBd3tVHjEEbFY1sv");
      let data = "";

      console.log("here0");
      console.log("stream: ", stream);

      for await (const chunk of stream) {
        console.log("chunk: ", chunk);
        // chunks of data are returned as a Buffer, convert it back to a string
        data += chunk.toString();
      }

      console.log("here");

      console.log("data: ", data);
    };

    getVersion();
  }, [ipfs]);

  // console.log(ipfs);
  // console.log(id);

  return (
    <div>
      {account ? <Sidebar /> : <TopBar />}

      <Container maxW="3xl">
        {account ? <AddPostForm /> : null}
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
