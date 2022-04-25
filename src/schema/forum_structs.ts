import { getThreadFromIPFS, getPostFromIPFS, getThreadsFromIPFS } from "./../ipfs/ipfs_mock";
export class Threads {
    threadId!: string;
    prevId: string | undefined;

    threadCache: Thread | undefined;
    prevCache: Thread | undefined;

    constructor(threadId: string, prevId: string) {
        this.threadId = threadId
        this.prevId = prevId
    }

    getThread(): Thread {
        if (this.threadCache === undefined) {
            const thread = getThreadFromIPFS(this.threadId)
            this.threadCache = new Thread(thread.id, thread.postId, thread.count);
        }

        return this.threadCache!
    }

    getPrevious(): Thread | undefined {
        if (this.prevId === undefined) {
            return undefined
        }

        if (this.prevCache == undefined) {
            const thread = getThreadFromIPFS(this.prevId)
            this.prevCache = new Thread(thread.id, thread.postId, thread.count);
        }

        return this.prevCache
    }
}

export class Thread {
    id!: string;
    postId!: string;
    count!: number;

    postCache: Post | undefined;

    constructor(id: string, postId: string, count: number) {
        this.id = id
        this.postId = postId
        this.count = count
    }

    getPost(): Post {
        if (this.postCache === undefined) {
            this.postCache = getPostFromIPFS(this.postId)
        }

        return this.postCache!
    }
}

export class Root {
    threadsId!: string;
    count!: number;

    threadsCache: Threads | undefined

    constructor(threadsId: string, count: number) {
        this.threadsId = threadsId
        this.count = count
    }

    getThreads(): Threads {
        if (this.threadsCache === undefined) {
            this.threadsCache = getThreadsFromIPFS(this.threadsId)
        }

        return this.threadsCache!
    }
}

export interface Post {
    author: string;
    title: string;
    body: string;
    blockNumber: number;
}