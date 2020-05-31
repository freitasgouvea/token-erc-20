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
    const address2 = accounts[2];

    before(() => {
        web3.eth.defaultAccount = ownerAddress;
    });

    beforeEach(async () => {
        contractInstance = await Artifact.new(tokenName, tokenSymbol, tokenDecimals, tokenTotalSupply);
    });

    it('transferFrom should throw if contract is paused', async () => {
        await contractInstance.pause({ from: ownerAddress });
        
        await Assert.reverts(
            contractInstance.transferFrom(ownerAddress, address2, 1000, { from: address1 }),
            'Pausable: paused'
        );
    });

    it('transferFrom should throw if from address is not valid', async () => {
        await Assert.reverts(
            contractInstance.transferFrom('0x0000000000000000000000000000000000000000', address1, 1000, { from: ownerAddress }),
            'ERC20: from address is not valid'
        );
    });

    it('transferFrom should throw if to address is not valid', async () => {
        await Assert.reverts(
            contractInstance.transferFrom(address1, '0x0000000000000000000000000000000000000000', 1000, { from: ownerAddress }),
            'ERC20: to address is not valid'
        );
    });

    it('transferFrom should throw if balance is insufficient', async () => {
        await Assert.reverts(
            contractInstance.transferFrom(address1, address2, 1000, { from: address1 }),
            'ERC20: insufficient balance'
        );
    });

    it('transferFrom should throw if sender is not approved', async () => {
        await Assert.reverts(
            contractInstance.transferFrom(ownerAddress, address1, 1000, { from: ownerAddress }),
            'ERC20: from not allowed'
        );
    });

    it('transferFrom success', async () => {
        await contractInstance.transfer(address1, 1000, { from: ownerAddress });
        await contractInstance.approve(address1, 1000, { from: ownerAddress });
        const result = await contractInstance.transferFrom(ownerAddress, address2, 1000, { from: address1 });
        
        Assert.eventEmitted(result, 'Transfer');
    });
});