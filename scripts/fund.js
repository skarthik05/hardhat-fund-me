const { ethers, getNamedAccounts } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const fundMe = await ethers.getContractAt("FundMe", deployer)
    console.log(`Got contract FundMe at ${fundMe.address}`)
    console.log({ deployerAddress: deployer })
    console.log({ fundMeAddess: fundMe.address })

    console.log("Funding contract...")
    const transactionResponse = await fundMe.fund({
        value: ethers.utils.parseEther("0.02"),
    })
    await transactionResponse.wait()
    console.log({ balance: await fundMe.provider.getBalance(fundMe.address) })

    console.log("Funded!")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
