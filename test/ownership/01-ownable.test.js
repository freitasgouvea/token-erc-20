const Artifact = artifacts.require('../contracts/ERC20');
const Assert = require('truffle-assertions');

contract('01-ownable.test', (accounts) => {

    const tokenName = 'ERC token';
    const tokenSymbol = 'ERC';
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

    it('registry funder must be owner before deploy', async () => {
        const result = await contractInstance.contractOwner();
        assert.equal(ownerAddress, result, 'registry funder is not owner');
    });

    it('transferOwnership should throw if caller is not owner', async () => { 
        await Assert.reverts(
            contractInstance.transferOwnership(address1, { from: address1 }),
            'Ownable: caller is not the owner'
        );
    });

    it('transferOwnership success', async () => {
        await contractInstance.transferOwnership(address1, { from: ownerAddress });
        const result = await contractInstance.contractOwner();
        assert.equal(address1, result, 'registry funder is not owner');
    });

});