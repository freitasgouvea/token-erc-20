const { ethers } = require("hardhat")

const tokenName = process.env.TOKEN_NAME;
const tokenSymbol = process.env.TOKEN_SYMBOL;
const tokenDecimals = process.env.TOKEN_DECIMALS;
const tokenTotalSupply = process.env.TOKEN_TOTALSUPLY;

async function main() {
  const contractFactory = await ethers.getContractFactory("ERC20")
  console.log("Deploying ERC20...")
  const erc20 = await contractFactory.deploy(
    tokenName, 
    tokenSymbol, 
    tokenDecimals, 
    tokenTotalSupply
  )
  await erc20.deployed()
  console.log(`Deployed ERC20 contract address: ${erc20.address}`)
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("Error:", error);
  process.exit(1)
})