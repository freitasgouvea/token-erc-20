const Artifact = artifacts.require('../contracts/ERC20');
const Assert = require('truffle-assertions');

contract('ERC20-10-burnFrom.test', (accounts) => {

    const tokenName = 'token';
    const tokenSymbol = 'TKN';
    const tokenDecimals = 18;
    const tokenTotalSupply = 1000000;

    let contractInstance;
    const ownerAddress = accounts[0];
    const address1 = accounts[1];

    before(() => {
        web3.eth.defaultAccount = ownerAddress;
    });

    beforeEach(async () => {
        contractInstance = await Artifact.new(tokenName, tokenSymbol, tokenDecimals, tokenTotalSupply);
    });

    it('burn should throw if contract is paused', async () => {
        const burnValue = 1000;
        
        await contractInstance.pause({ from: ownerAddress });
        
        await Assert.reverts(
            contractInstance.burn(burnValue, { from: address1 }),
            'Pausable: paused'
        );
    });

    it('burn should throw if balance is insufficient', async () => {
        await Assert.reverts(
            contractInstance.burn(1000, { from: address1 }),
            'ERC20: insufficient balance'
        );
    });

    it('burn success', async () => {
        const mintValue = 1000;
        const burnValue = 500;
        const expectedBalance = 500;

        await contractInstance.mintTo(address1, mintValue, { from: ownerAddress });
        const burn = await contractInstance.burn(burnValue, { from: address1 });

        const expectedTotalSupply = (tokenTotalSupply + mintValue) - burnValue;
        const resultAfterBurn = await contractInstance.totalSupply();
        const resultBalanceOf = await contractInstance.balanceOf(address1, { from: address1 });

        assert.equal(expectedTotalSupply, resultAfterBurn, 'wrong totalSupply after');
        assert.equal(expectedBalance, resultBalanceOf, 'wrong balance');
        Assert.eventEmitted(burn, 'Transfer');
    });
});