const Artifact = artifacts.require('../contracts/ERC20');
const Assert = require('truffle-assertions');

contract('01-pausable.test', (accounts) => {

    const tokenName = 'SPL token';
    const tokenSymbol = 'SPL';
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

    it('contract must not be paused after deploy', async () => {
        const result = await contractInstance.paused();
        
        assert.equal(false, result, 'contract cannot paused after deploy');
    });

    it('pause should throw if account is not admin', async () => {
        await Assert.reverts(
            contractInstance.pause({ from: address1 }),
            'Ownable: caller is not the owner'
        );
    });

    it('pause should throw if contract already paused', async () => {
        await contractInstance.pause({ from: ownerAddress });
        
        await Assert.reverts(
            contractInstance.pause({ from: ownerAddress }),
            'Pausable: paused'
        );
    });

    it('pause success', async () => {
        await contractInstance.pause({ from: ownerAddress });
        const result = await contractInstance.paused();
        
        assert.equal(true, result, 'contract cannot paused after deploy');
    });

});