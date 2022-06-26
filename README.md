# ERC20 Token

This is an example in solidity language of an ERC-20 standard Ethereum Token, mintable and burnable, with owner access permissions and pausable module.

## Erc-20

ERC-20 is a standard interface for tokens.

The following standard allows for the implementation of a standard API for tokens within smart contracts.

More Information about Solidity Language and ERC-20 Standard:

- [Solidity](https://solidity.readthedocs.io/en/v0.8.0/): `v0.8.0`
- [ERC-20](https://eips.ethereum.org/EIPS/eip-20)

## Erc-20 Methods

### Constructor

The `constructor` function sets `name`, `symbol`, `decimals` and `totalSupply` of the token.

### Balance

The view function `balanceOf` returns the account balance of an account `_owner`.
 
### Allowance

The view function `allowance` returns the amount which address `_spender` is allowed to spend from another account - `_owner`.

### Transfer and Transfer From

The method `transfer` is called by `msg.sender` account and transfers `_value` amount of tokens to another address `_to`.

The method `transferFrom` allows one third account `msg.sender` transfers `_value` amount of tokens from other address `_from` to other address `_to`. The `_from` address needs to approve `msg.sender` and spend the `_value` first.

Both methods fire the `Transfer` event.

### Approve

The method `approve` allows one account - `_spender` - to spend from another account - `msg.sender` - the `_amount`.
 
### Increase Approval and Decrease Approval
 
Those methods are not a ERC-20 standard but can be used to manage the allowances.

The method `increaseApproval` allows another account - `_spender` - to spend from another account - `msg.sender` - adding to current allowance the `_addedValue` amount.

The method `decreaseApproval` reduces the value approved to `_spender` to spend from another account - `msg.sender` - subtracting the `_subtractedValue` from the current approval amount. If the `_subtractedValue` is bigger than current approval the value will reduce to 0.

### Mint, Burn and Burn From
Those methods are not a ERC-20 standard but are commonly used to create and destroy tokens.

The `mintTo` function creates `_amount` tokens and assigns them to account `_to`, increasing the total supply. Only the owner can mint.

The `burn` function destroys `_amount` tokens from `msg.sender`, reducing the total supply.

The `burnFrom` function destroys `_amount` tokens from account `_from`, reducing the total supply. The `_from` address needs to approve the `msg.sender` address and spend the `_amount` first.

All these methods fire the `Transfer` event.

## Erc-20 Modules in this example

### Ownable

The Ownable module provides a basic access control mechanism, where there is an account - an owner - that has exclusive access to specific functions.

This module is used through inheritance.

It will make available the modifier `onlyOwner`, which can be applied to smart contract functions to restrict their use to the owner.

By default, the owner account will be the one that deploys the contract.

The owner address can be changed by owner with method `transferOwnership`.

### Pausable

Contract module which allows children to implement an emergency stop mechanism that can be triggered by an authorized account.

This module is used through inheritance.

It will make available the modifiers `whenNotPaused` and `whenPaused`, which can be applied to the functions of your contract.

In this example, only the owner account can trigger call `pause` and `unpause` methods.

## Requirements to run this repository

You can compile, run tests and deploy this smart contract with Hardhat or Truffle.

- [Node.js](https://nodejs.org/download/release/latest-v12.x/): `>=12.0.0`
- [Hardhat](https://hardhat.org/): `v2.9.9`
- [Truffle](https://www.trufflesuite.com/truffle): `v5.1.9`

## Clone and Install

Clone or download this repository.

Go to path and run on terminal:

```sh
npm install
```

After, all dependencies will be downloaded.
 
## Using Hardhat
### Compile contracts

```sh
npx hardhat compile
```

After that, contract information &mdash; including ABI &mdash; will be available at the `./artifacts/contracts` directory.

### Run unit tests using Hardhat
 
To run tests on hardhat localhost, before run the tests start a local node:
 
```sh
npx hardhat node
```

So you can run tests which can be found in the test directory `./test`:

```sh
npx hardhat --network localhost test
```

The results of the tests and the detailed gas report will be show on screen.

### Deploy contracts with Hardhat

Create `.env` file on root with these variables:

```
PRIVATE_KEY= // Wallet private key
INFURA_PROJECT_ID= // Your Infura Project Id
TOKEN_NAME="Token Name"
TOKEN_SYMBOL="ERC"
TOKEN_DECIMALS=18
TOKEN_TOTALSUPLY=0
```
 
Available networks <network_name>:
 
- localhost
- development
- ropsten
- kovan
- rinkeby
- main
- polygon
- mumbai
 
It is important that the chosen wallet has selected network native tokens for the payment of gas.
 
Run deploy script:

```sh
npx hardhat run --network <network_name> scripts/deploy.js
```

After finishing, ERC20 contract address will be shown on screen.
 
### Verify Ethereum network deployed contracts with Hardhat

Update `.env` file with these variables:

```
ETHERSCAN_API_KEY= // Your Etherscan API key
ERC20_ADDRESS= // The address of deployed ERC20 to be verified
```
 
Available networks <network_name>:
 
- ropsten
- kovan
- rinkeby
- main
 
Run deploy script:

```sh
npx hardhat run --network <network_name> scripts/verify.js
```

After finishing, the link to the verified contract will be shown on screen.
 
## Using Truffle
### Compile contracts

```sh
truffle compile
```

After running, contract information &mdash; including ABI &mdash; will be available at the `./build/contracts` directory.

### Run unit tests using Truffle
 
To run unit tests on local network development, you need install and run before run the tests [ganache](https://trufflesuite.com/ganache/)

After initializing your local node, you can run tests which can be found in the test directory `./test`:

```sh
truffle test
```

Or run tests within a specific file:

```sh
truffle test <file_path>
```

### Run migration and deploy contracts with Truffle

Create `.env` file on root with:

```
PRIVATE_KEY= // Wallet private key
INFURA_PROJECT_ID= // Your Infura Project Id
TOKEN_NAME="Token Name"
TOKEN_SYMBOL="ERC"
TOKEN_DECIMALS=18
TOKEN_TOTALSUPLY=0
```
 
Available networks <network_name>:
 
- development
- ropsten
- kovan
- rinkeby
- main
- polygon
- mumbai
 
It is important that the chosen wallet has selected network native tokens for the payment of gas.
 
Run migrate command:

```sh
truffle migrate --network <network_name>
```

After migration, contract address and transaction ID will be shown on screen.
 
 

