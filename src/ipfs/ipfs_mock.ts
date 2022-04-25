import { Post, Thread } from "~/schema/forum_structs"

export function getRootIdFromStarknet() {
    // use contract abi to get root from starknet
    return "0xRootIPFSId"
}

export function getThreadsFromIPFS(threadsId: string) {
    return {
        threadId: "0xThreadIPFSId",
        prev: "0xPrevId"
    }
}

export function getThreadFromIPFS(threadId: string): Thread {
    // fetch thread from ipfs
    const thread = {
        id: "0xThreadId",
        postId: "0xPostIPFSId",
        count: 0
    }

    return new Thread(thread.id, thread.postId, thread.count);
}

export function getPostFromIPFS(postId: string): Post {
    // fetch from ipfs
    const post = {
        author: "0xabcdefg123456",
        title: "This is a post",
        body: "This is the body of a post",
        blockNumber: 0
    }

    return post
}