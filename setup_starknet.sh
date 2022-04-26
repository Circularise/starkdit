#!/bin/bash

# E.g., working on `hackathon-0`.
# https://hackathon-4.voyager.online/
export STARKNET_GATEWAY_URL=https://hackathon-4.starknet.io
export STARKNET_FEEDER_GATEWAY_URL=https://hackathon-4.starknet.io
export STARKNET_CHAIN_ID=SN_GOERLI
export STARKNET_NETWORK_ID=hackathon-4
# If you've set a network environment variable unset it
unset STARKNET_NETWORK

# Make sure the gateway is up.
curl https://hackathon-4.starknet.io/feeder_gateway/is_alive

# Check if the CLI works.
# starknet get_block
echo ""
starknet  call --address 0x05779cb885e9208c93d77ff2fa669e4bf1f7a5c3ed4f5323663b45febe311351 \
--abi src/abi/starkdit.json --function get_root            