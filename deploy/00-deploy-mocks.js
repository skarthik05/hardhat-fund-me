const { network } = require("hardhat")
const {
    networkConfig,
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    const ethUsdPriceFeed = networkConfig[chainId]["ethUsdPriceFeed"]

    if (developmentChains.includes(network.name)) {
        console.log("Local network deteced! Deploying mocks...")
        await deploy("MockV3Aggregator", {
            contractor: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        })
        console.log("Mocks deployed!")
        console.log("----------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
