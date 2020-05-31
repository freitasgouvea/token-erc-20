const Migrations = artifacts.require("ERC20");

require('dotenv').config();

console.log(process.env.TOKEN_NAME);

const tokenName = process.env.TOKEN_NAME;
const tokenSymbol = process.env.TOKEN_SYMBOL;
const tokenDecimals = process.env.TOKEN_DECIMALS;
const tokenTotalSupply = process.env.TOKEN_TOTALSUPLY;

module.exports = function (deployer) {
  deployer.deploy(Migrations, tokenName, tokenSymbol, tokenDecimals, tokenTotalSupply);
};
