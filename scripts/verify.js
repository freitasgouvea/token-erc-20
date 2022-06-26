const { run } = require("hardhat")

const contractAddress = process.env.ERC20_ADDRESS
const tokenName = process.env.TOKEN_NAME;
const tokenSymbol = process.env.TOKEN_SYMBOL;
const tokenDecimals = process.env.TOKEN_DECIMALS;
const tokenTotalSupply = process.env.TOKEN_TOTALSUPLY;

async function main() {
  console.log("Verifying ERC20 smart contract ... ")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: [tokenName, tokenSymbol, tokenDecimals, tokenTotalSupply]
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!")
    } else {
      console.log("Error in verification:", e)
    }
  }
}

main().then(() => process.exit(0)).catch((error) => {
  console.error("Error:", error);
  process.exit(1)
})