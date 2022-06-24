# ERC20 Token

This is an example in solidity language of an ERC-20 standard Ethereum Token, mintable and burnable, with owner access permissions and module pausable.

## Erc-20

ERC-20 is a standard interface for tokens. 

The following standard allows for the implementation of a standard API for tokens within smart contracts. 

More Information about Solidity Language and ERC-20 Standard:

- [Solidity](https://solidity.readthedocs.io/en/v0.8.13/): `v0.8.13`
- [ERC-20](https://eips.ethereum.org/EIPS/eip-20)

## Erc-20 Methods

### Constructor

The `constructor` function set the `name`, `symbol`, `decimals` and `totalSupply` of the token.

### Balance

The view function `balanceOf` returns the account balance of an account `_owner`.

### Transfer and Transfer From

The method `transfer` is called by an account and transfers `_value` amount of tokens to other address `_to`.

The method `transferFrom` allow one third account transfers `_value` amount of tokens from other address `_from` to other address `_to`.The `_from` address needs to aprrove `msg.sender` address spend the `_value` first.

Both methods fire the `Transfer` event.

### Approve

The method `approve` allows one account `_spender` to spend from other account `msg.sender` the `_amount`. 

The method `increaseApproval` allows other account `_spender` to spend from one account multiple times, adding to allowance the `_addedValue` amount. 

The method `decreaseApproval` reduces the value aprroveed to `_spender` to spend from one account multiple times, substracting the `_subtractedValue` to the approval amount. 

If the `_subtractedValue` is bigger than previously approved the value will reduce to 0. 

### Allowance

The view function `allowance` returns the amount which address `_spender` is still allowed to withdraw from `_owner`.

### Mint, Burn and Burn From

Those methods are not a ERC-20 standard but are commonly used to create and destroy tokens.

The `mintTo` function creates `_amount` tokens and assigns them to account `_to`, increasing the total supply. Only owner can mint.

The `burn` function destroys `_amount` tokens from `msg.sender`, reducing the total supply.

The `burnFrom` function destroys `_amount` tokens from account `_from`, reducing the total supply. The `_from` address needs to aprrove `msg.sender` address spend the `_amount` first.

Both methods fire the `Transfer` event.

## Erc-20 Modules in this example

### Ownable

The Ownable module provides a basic access control mechanism, where there is an account (an owner) that can be granted exclusive access to specific functions.

This module is used through inheritance. 

It will make available the modifier `onlyOwner`, which can be applied to your functions to restrict their use to the owner.

By default, the owner account will be the one that deploys the contract. 

The owner address can be changed with method `transferOwnership`.

### Pausable

Contract module which allows children to implement an emergency stop mechanism that can be triggered by an authorized account.

This module is used through inheritance. 

It will make available the modifiers `whenNotPaused` and `whenPaused`, which can be applied to the functions of your contract.

In this example, only owner account can trigger call `pause` and `unpause` methods. 

## Requeriments to run this repositorie

You can compile, run tests and deploy this smart contract with Truffe.

- [Node.js](https://nodejs.org/download/release/latest-v10.x/): `>=10.0.0`
- [Truffle](https://www.trufflesuite.com/truffle): `v5.1.9`

## Usage

Clone or donwload this repositorie.

Go to path and run on terminal:

```sh
npm install
```
After running, all dependecies will be downloaded.

Maybe you need install truffle as global dependency to run next steps.

### Compile contracts

```sh
truffle compile
```

After running, contract information &mdash; including ABI &mdash; will be available at the `build/contracts/` directory.

### Run tests on Truffle

You can run tests which can be found in the test directory `/test` runing on terminal:

```sh
truffle test
```

Or run tests within a specific file:

```sh
truffle test <file_path>
```

### Run migration and deploy contracts with Truffle

Create .env file on root with:

```
PRIVATE_KEY= // Wallet private key
INFURA_PROJECT_ID= // Your Infura Project Id
TOKEN_NAME="Token Name"
TOKEN_SYMBOL="ERC"
TOKEN_DECIMALS=18
TOKEN_TOTALSUPLY=0
```

It is important that the chosen wallet has native tokens for the payment of gas.

Run migrate command:

```sh
truffle migrate --network <network_name> // mainnet, rinkeby, polygon, mumbai...
```

After migration, contract address and transaction ID will be shown on screen.
