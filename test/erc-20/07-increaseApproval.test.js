const Artifact = artifacts.require('../contracts/ERC20');
const Assert = require('truffle-assertions');

contract('ERC20-07-increaseApproval.test', (accounts) => {

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

    it('increaseApproval should throw if contract is paused', async () => {
        const initialAmount = 1000;
        
        await contractInstance.pause({ from: ownerAddress });
        
        await Assert.reverts(
            contractInstance.increaseApproval(address1, initialAmount, { from: ownerAddress }),
            'Pausable: paused'
        );
    });

    it('increaseApproval success', async () => {
        const initialAmount = 1000;
        const expectedAmount = 2000;
        
        await contractInstance.approve(address1, initialAmount, { from: ownerAddress });
        const resultBeforeIncrease = await contractInstance.allowance(ownerAddress, address1, { from: ownerAddress });
        const resultIncrease = await contractInstance.increaseApproval(address1, initialAmount, { from: ownerAddress });
        const resultAfterIncrease = await contractInstance.allowance(ownerAddress, address1, { from: ownerAddress });
        
        assert.equal(initialAmount, resultBeforeIncrease.toNumber(), 'wrong result berore increase');
        assert.equal(expectedAmount, resultAfterIncrease.toNumber(), 'wrong result after increase');
        Assert.eventEmitted(resultIncrease, 'Approval');
    });
});