const optimismSDK = require("@eth-optimism/sdk")
const fetch = require('node-fetch');
import { getConfigURL } from './config/config';

export interface OptimismL1Addresses {
    AddressManager: string,
    L1CrossDomainMessenger: string,
    L1StandardBridge:       string,
    OptimismPortal:         string,
    L2OutputOracle:         string,
    OptimismPortal2:        string,        
    DisputeGameFactory:     string,
    FaultDisputeGame:       string,

    StateCommitmentChain:     string,
    CanonicalTransactionChain: string,
    BondManager:              string,
}

export interface OptimismMetadata {
    l1ChainId: Number
    l2ChainId: Number
    l1Addresses: OptimismL1Addresses
}

export const getOptimismMetadata = async (
    slug : string,
    overrideURL?: string,
): Promise<OptimismMetadata> => {
    let url;
    if (overrideURL && overrideURL !== "") {
        url = overrideURL
    } else {
        url = getConfigURL(slug)
    }

    const resp = await fetch(url);
    const configJSON = await resp.json();

    return configJSON as OptimismMetadata
}

export const getOptimismConfiguration = async (
    slug : string,
    overrideURL?: string,
): Promise<Object> => {
    const config = await getOptimismMetadata(slug, overrideURL)

    // This config can be modified after the fact. E.g. you can add additional
    // bridge implementations.
    return {
        l1ChainId: config.l1ChainId,
        l2ChainId: config.l2ChainId,
        contracts: {
          l1: config.l1Addresses,
          l2: {},
        },
        bridges: {
          Standard: {
            Adapter: optimismSDK.StandardBridgeAdapter,
            l1Bridge:
                config.l1Addresses.L1StandardBridge,
            l2Bridge: "0x4200000000000000000000000000000000000010", // Pre-deploy
          },
          ETH: {
            Adapter: optimismSDK.ETHBridgeAdapter,
            l1Bridge:
                config.l1Addresses.L1StandardBridge,
            l2Bridge: "0x4200000000000000000000000000000000000010", // Pre-deploy
          },
        },
        bedrock: true,
      }
}
