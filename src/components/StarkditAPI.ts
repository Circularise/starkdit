import { useStarknet, useStarknetInvoke, useStarknetCall } from '@starknet-react/core'
import { useStarkditContract } from '~/hooks/starkdit'
import { getPostsFromIPFS, getRootFromIPFS } from '~/ipfs/ipfs_mock'
import { Posts } from '~/schema/forum_structs'
import { BigNumberish } from 'starknet/dist/utils/number'

export function getIPFSPrefix(): string | null {
    const { account } = useStarknet()
    const { contract: starkdit } = useStarkditContract()
    const { data, loading, error, refresh } = useStarknetCall({ contract: starkdit, method: 'get_prefix' })

    if (!account || error != undefined) {
        return null
    }

    if (loading) {
        // should wait a while???
        // maybe refresh()???
    }

    var prefix: string | null = null;

    if (data != null) {
        prefix = data[0] as string
    }

    return prefix
}

export function getRootPosts(): Posts | null {
    const { account } = useStarknet()
    const { contract: starkdit } = useStarkditContract()
    const { data, loading, error, refresh } = useStarknetCall({ contract: starkdit, method: 'get_root' })
    const ipfsPrefix = getIPFSPrefix()

    if (!account || ipfsPrefix == null || error != undefined) {
        return null
    }

    if (loading) {
        // should wait a while???
        // maybe refresh()???
    }

    var rootPosts: Posts | null = null;

    if (data != null) {
        const rootHash = data[0]
        // https://www.starknetjs.com/docs/API/contract
        // TODO root_hash is converted from a uint256 in cairo into a BigNumber
        // Not specified which implementation: 
        // @ethersproject/bignumber
        // "bignumber.js
        // bn.js
        const rootId = ipfsPrefix + rootHash // should be something like rootHash.toHex()
        rootPosts = getPostsFromIPFS(rootId)
        // const root = getRootFromIPFS(rootId)
        // rootThreads = root.getThreads()
    }

    return rootPosts
}
