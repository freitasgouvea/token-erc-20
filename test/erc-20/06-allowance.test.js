const Artifact = artifacts.require('../contracts/ERC20');
const Assert = require('truffle-assertions');

contract('ERC20-06-allowance.test', (accounts) => {

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

    it('allowance should throw if contract is paused', async () => {
        await contractInstance.pause({ from: ownerAddress });
        
        await Assert.reverts(
            contractInstance.allowance(ownerAddress, address1, { from: ownerAddress }),
            'Pausable: paused'
        );
    });

    it('not allowance', async () => {
        const result = await contractInstance.allowance(ownerAddress, address1, { from: ownerAddress });
        
        assert.equal(0, result.toNumber(), 'wrong result');
    });

    it('allowance', async () => {
        const expectedAmount = 1000;
        
        await contractInstance.approve(address1, expectedAmount, { from: ownerAddress });
        const result = await contractInstance.allowance(ownerAddress, address1, { from: ownerAddress });
        
        assert.equal(expectedAmount, result.toNumber(), 'wrong result');
    });

});