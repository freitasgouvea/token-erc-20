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

    it('burnFrom should throw if contract is paused', async () => {
        const burnValue = 1000;
        
        await contractInstance.pause({ from: ownerAddress });
        
        await Assert.reverts(
            contractInstance.burnFrom(address1, burnValue, { from: address1 }),
            'Pausable: paused'
        );
    });

    it('burnFrom should throw if from address is invalid', async () => {
        await Assert.reverts(
            contractInstance.burnFrom('0x0000000000000000000000000000000000000000', 1000, { from: ownerAddress }),
            'ERC20: from address is not valid'
        );
    });

    it('burnFrom should throw if balance is insufficient', async () => {
        await Assert.reverts(
            contractInstance.burnFrom(address1, 1000, { from: ownerAddress }),
            'ERC20: insufficient balance'
        );
    });

    it('burnFrom should throw if account is not a owner', async () => {
        const mintValue = 1000;
        const burnValue = 500;

        await contractInstance.mintTo(address1, mintValue, { from: ownerAddress });
        
        await Assert.reverts(
            contractInstance.burnFrom(address1, burnValue, { from: address1 }),
            'Ownable: caller is not the owner'
        );
    });

    it('burnFrom success', async () => {
        const mintValue = 1000;
        const burnValue = 500;
        const expectedBalance = 500;

        await contractInstance.mintTo(address1, mintValue, { from: ownerAddress });
        await contractInstance.burnFrom(address1, burnValue, { from: ownerAddress });
        const expectedTotalSupply = (tokenTotalSupply + mintValue) - burnValue;
        const resultAfterBurn = await contractInstance.totalSupply();
        const resultBalanceOf = await contractInstance.balanceOf(address1, { from: address1 });

        assert.equal(expectedTotalSupply, resultAfterBurn, 'wrong totalSupply after');
        assert.equal(expectedBalance, resultBalanceOf, 'wrong balance');
    });
});