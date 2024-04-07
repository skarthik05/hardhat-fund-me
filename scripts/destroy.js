const { ethers, getNamedAccounts } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const fundMe = await ethers.getContractAt("FundMe", deployer)
    console.log(`Got contract FundMe at ${fundMe.address}`)
    console.log("Destroying the contract...")
    const transactionResponse = await fundMe.destroy()
    await transactionResponse.wait()

    console.log("Transaction hash:", transactionResponse.hash)
    console.log(
        "Transaction confirmed in block:",
        transactionResponse.blockNumber
    )
    console.log("Gas used:", transactionResponse.gasUsed.toString())
    console.log(
        "Status:",
        transactionResponse.status === 1 ? "Success" : "Failure"
    )
    console.log("Logs:", transactionResponse.logs)
    console.log("Contract destroyed successfully!")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
