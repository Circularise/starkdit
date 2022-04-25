import { getRootFromIPFS, getRootIdFromStarknet } from "./../ipfs/ipfs_mock"

const rootId = getRootIdFromStarknet()
const root = getRootFromIPFS(rootId)
const rootThreads = root.getThreads()
const rootThread = rootThreads.getThread()

console.log("Root thread id: " + rootThread.id)

const rootPost = rootThread.getPost()

console.log("Root post author: " + rootPost.author)
console.log("Root post body: " + rootPost.body)