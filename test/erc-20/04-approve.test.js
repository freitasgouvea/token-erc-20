const Artifact = artifacts.require('../contracts/ERC20');
const Assert = require('truffle-assertions');

contract('ERC20-04-transferFrom.test', (accounts) => {

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

    it('approve should throw if contract is paused', async () => {
        await contractInstance.pause({ from: ownerAddress });
        
        await Assert.reverts(
            contractInstance.approve(address1, 1000, { from: ownerAddress }),
            'Pausable: paused'
        );
    });

    it('approve success', async () => {
        const result = await contractInstance.approve(address1, 1000, { from: ownerAddress });
        
        Assert.eventEmitted(result, 'Approval');
    });
});