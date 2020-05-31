const Artifact = artifacts.require('../contracts/ERC20');
const Assert = require('truffle-assertions');

contract('ERC20-08-decreaseApproval.test', (accounts) => {

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

    it('decreaseApproval should throw if contract is paused', async () => {
        const initialAmount = 1000;
        
        await contractInstance.pause({ from: ownerAddress });
        
        await Assert.reverts(
            contractInstance.decreaseApproval(address1, initialAmount, { from: ownerAddress }),
            'Pausable: paused'
        );
    });

    it('decreaseApproval success', async () => {
        const initialAmount = 1000;
        const expectedAmount = 500;
        
        await contractInstance.approve(address1, initialAmount, { from: ownerAddress });
        const resultBeforeDecrease = await contractInstance.allowance(ownerAddress, address1, { from: ownerAddress });
        const resultDecrease = await contractInstance.decreaseApproval(address1, 500, { from: ownerAddress });
        const resultAfterDecrease = await contractInstance.allowance(ownerAddress, address1, { from: ownerAddress });
        
        assert.equal(initialAmount, resultBeforeDecrease.toNumber(), 'wrong result berore increase');
        assert.equal(expectedAmount, resultAfterDecrease.toNumber(), 'wrong result after increase');
        Assert.eventEmitted(resultDecrease, 'Approval');
    });
});