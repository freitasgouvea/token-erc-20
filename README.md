## ERC-20 Token

This is an example in solidity language of an implementation of ERC-20 standard Ethereum Token, mintable and burnable, with owner access permissions and pausable module.

## Erc-20 implementation

ERC-20 is a standard interface for tokens.

More Information about Solidity Language and ERC-20 Standard:

- [Solidity](https://solidity.readthedocs.io/en/v0.8.0/): `v0.8.0`
- [ERC-20](https://eips.ethereum.org/EIPS/eip-20)

This repository contains an ERC-20 implementetion that can be found in `./contracts` folder.

### Erc-20 Methods

#### Constructor

The `constructor` function sets `name`, `symbol`, `decimals` and `totalSupply` of the token.

#### Balance

The view function `balanceOf` returns the account balance of an account `_owner`.
 
#### Allowance

The view function `allowance` returns the amount which address `_spender` is allowed to spend from another account - `_owner`.

#### Transfer and Transfer From

The method `transfer` is called by `msg.sender` account and transfers `_value` amount of tokens to another address `_to`.

The method `transferFrom` allows one third account `msg.sender` transfers `_value` amount of tokens from other address `_from` to other address `_to`. The `_from` address needs to approve `msg.sender` spend the `_value` first.

Both methods fire the `Transfer` event.

#### Approve

The method `approve` allows one account - `_spender` - to spend from another account - `msg.sender` - the `_amount`.
 
#### Increase Approval and Decrease Approval
 
Those methods are not a ERC-20 standard but can be used to manage the value of the allowances.

The method `increaseApproval` allows another account - `_spender` - to spend from another account - `msg.sender` - adding to current allowance the `_addedValue` amount.

The method `decreaseApproval` reduces the value approved to `_spender` to spend from another account - `msg.sender` - subtracting the `_subtractedValue` from the current approval amount. If the `_subtractedValue` is bigger than current approval the value will reduce to 0.

#### Mint, Burn and Burn From

Those methods are not a ERC-20 standard but are commonly used to create and destroy tokens.

The `mintTo` function creates `_amount` tokens and assigns them to account `_to`, increasing the total supply. Only the smart contract owner can mint.

The `burn` function destroys `_amount` tokens from `msg.sender`, reducing the total supply.

The `burnFrom` function destroys `_amount` tokens from account `_from`, reducing the total supply. The `_from` address needs to approve the `msg.sender` address spend the `_amount` first.

All these methods fire the `Transfer` event.

## Erc-20 Modules in this example

#### Ownable

The Ownable module provides a basic access control mechanism, where there is an account - an owner - that has exclusive access to specific functions.

This module is used through inheritance.

It will make available the modifier `onlyOwner`, which can be applied to smart contract functions to restrict their use to the owner.

By default, the owner account will be the one that deploys the contract.

The owner address can be changed by smart contract owner with method `transferOwnership`.

#### Pausable

Contract module which allows children to implement an emergency stop mechanism that can be triggered by an authorized account.

This module is used through inheritance.

It will make available the modifiers `whenNotPaused` and `whenPaused`, which can be applied to the functions of your contract.

In this example, only the owner account can trigger call `pause` and `unpause` methods.

## Compile, test and deploy

With this repository you can compile, run tests and deploy the ERC-20 smart contract using Hardhat, Truffle or Foundry.

- [Node.js](https://nodejs.org/download/release/latest-v12.x/): `12.0.0`
- [Hardhat](https://hardhat.org/): `v2.9.9`
- [Truffle](https://www.trufflesuite.com/truffle): `v5.5.19`
- [Foundry](https://getfoundry.sh/)

### Clone and Install

Clone or download this repository.

Go to path and run on terminal:

```sh
npm install
```

After, all dependencies will be downloaded.
 
### Using Hardhat

#### Compile contracts using Hardhat

```sh
npx hardhat compile
```

After that, contract information &mdash; including ABI &mdash; will be available at the `./artifacts/contracts` directory.

#### Run unit tests using Hardhat
 
To run tests on hardhat localhost, before run the tests start a local node:
 
```sh
npx hardhat node
```

So you can run tests which can be found in the test directory `./test`:

```sh
npx hardhat --network localhost test
```

The results of the tests and the detailed gas report will be show on screen.

#### Deploy contracts with Hardhat and Alchemy as Provider

Create `.env` file on root with these variables:

```
PRIVATE_KEY= // Wallet private key
ALCHEMY_KEY= // Your Alchemy key from the choosen network
TOKEN_NAME="Token Name"
TOKEN_SYMBOL="ERC"
TOKEN_DECIMALS=18
TOKEN_TOTALSUPLY=0
ETHERSCAN_API_KEY= // Your Etherscan API key to verify contracts
ERC20_ADDRESS= // The address of deployed ERC20 to be verified
```

Available networks <network_name>:
 
- localhost
- mainnet
- goerli
- sepolia
- polygon
- mumbai
 
It is important that the chosen wallet has selected network native tokens for the payment of gas.
 
Run deploy script:

```sh
npx hardhat run --network <network_name> scripts/deploy.js
```

ERC20 contract address will be shown on screen.
 
#### Verify deployed ERC-20 with Hardhat

Update `.env` file with these variables:

```
ETHERSCAN_API_KEY= // Your Etherscan API key
ERC20_ADDRESS= // The address of deployed ERC20 to be verified
```

Available networks <network_name>:
 
- localhost
- mainnet
- goerli
- sepolia
 
Run verify script:

```sh
npx hardhat run --network <network_name> scripts/verify.js
```

After finishing, the link to the verified contract will be shown on screen.
 
### Using Truffle

#### Compile contracts using Truffle and Infura as Provider

```sh
truffle compile
```

After running, contract information &mdash; including ABI &mdash; will be available at the `./build/contracts` directory.

#### Run unit tests using Truffle
 
To run unit tests on local network development, you need install and run before run the tests [ganache](https://trufflesuite.com/ganache/)

After initializing your local node, you can run tests which can be found in the test directory `./test`:

```sh
truffle test
```

Or run tests within a specific file:

```sh
truffle test <file_path>
```

#### Run migration and deploy contracts with Truffle

Create `.env` file on root with:

```
PRIVATE_KEY= // Wallet private key
INFURA_PROJECT_ID= // Your Infura Project Id
TOKEN_NAME="Token Name"
TOKEN_SYMBOL="ERC"
TOKEN_DECIMALS=18
TOKEN_TOTALSUPLY=0
```
 
It is important that the chosen wallet has selected network native tokens for the payment of gas.

Available networks <network_name>:
 
- development
- ropsten
- kovan
- rinkeby
- main
- polygon
- mumbai
 
Run migrate command:

```sh
truffle migrate --network <network_name>
```

After migration, contract address and transactions will be shown on screen.

### Using Foundry

#### Install Foundry

Before run you need to get Foundry:

```sh
curl -L https://foundry.paradigm.xyz | bash
```

And install:

```sh
foundryup
```

#### Compile contracts using Foundry

```sh
forge build
```

After running, contract information &mdash; including ABI &mdash; will be available at the `./out` directory.

#### Run tests using Foundry
 
Before run the tests, you need to update and registry the tests modules used by this repository that can be found in `./lib` folder:
 
```sh
forge update lib/forge-std
```

So you can run tests which can be found in the file `./test-foundry/ERC20.t.sol`:

```sh
forge test
```

You also can run tests and see all detailed traces:

```sh
forge test -vvvv
```

And if you want to debug a single test, use the debug flag and set the test function name:

```sh
forge test --debug functionToDebug
```

The output of tests can be found in the folder `./out`.

#### Deploy contracts with Foundry

To deploy using foundry you can run this command setting the constructor arguments (name, symbol, decimals and totalSupply) at `--constructor-args` flag and changing the `<network_rpc_url>` of the target network and `<deployer_private_key>`:

```sh
forge create --rpc-url <network_rpc_url> \
  --constructor-args "Token Name" "ERC" 18 0 \
  --private-key <deployer_private_key> src/ERC20.sol:ERC20 \
  --verify
```

The hash of transaction and ERC20 contract address will be shown on screen.

## Security analysis using Mythril

Mythril is a free security analysis tool for EVM bytecode that detects security vulnerabilities in smart contracts:

- [Mythril](https://github.com/ConsenSys/mythril)

Below you find the instructions to run Mythril in this project.

#### Run analysis using Mythril

To run a security analysis you first need to install the Mythril tool in your machine:

```sh
pip3 install mythril
```

Then, you can run the `ERC20.sol` smart contract security scan:

```sh
myth analyze contracts/ERC20.sol -o jsonv2
```

The analysis may take several minutes to finish and the JSON output will be generated.

#### Result of Mythril analysis of the smart contracts of this project

No issues was identified in this repository and the output of analysis was:

```sh
[{"issues": [], "meta": {"mythril_execution_info": {"analysis_duration": 3081529196262}}, "sourceFormat": "text", "sourceList": ["#utility.yul", "contracts/ERC20.sol", "contracts/interfaces/IERC20.sol", "contracts/lifecycle/Pausable.sol", "contracts/ownership/Ownable.sol"], "sourceType": "solidity-file"}]
```

## Code and security analysis using Slither

Slither is a free analysis tool that detects vulnerabilities and suggests optimizations in solidity smart contracts:

- [Slither](https://github.com/crytic/slither)

Below you find the instructions to run Slither in this project.
#### Run analysis using Slither

To run Slither you first need to install the tool in your machine:

```sh
pip3 install slither-analyzer
```

Then, you can run the scan in all smart contracts of this project:

```sh
slither .
```
The output of analysis will be generated.
