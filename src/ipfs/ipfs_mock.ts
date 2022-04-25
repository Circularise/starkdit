import { Post, Thread, Threads, Root } from "./../schema/forum_structs"

export function getRootIdFromStarknet() {
    // use contract abi to get root from starknet
    return "0xRootIPFSId"
}

export function getRootFromIPFS(rootId: string): Root {
    // fetch thread from ipfs
    const root = {
        threadsId: "0xThreadsIPFSId",
        count: 0
    }

    return new Root(root.threadsId, root.count)
}

export function getThreadsFromIPFS(threadsId: string): Threads {
    // fetch thread from ipfs
    const threads = {
        threadId: "0xThreadIPFSId",
        prevId: "0xPrevId"
    }

    return new Threads(threads.threadId, threads.prevId)
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
        author: "0xAuthor",
        title: "This is a post",
        body: "This is the body of a post",
        blockNumber: 0
    }

    return post
}