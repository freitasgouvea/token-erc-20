const Artifact = artifacts.require('../contracts/ERC20');
const Assert = require('truffle-assertions');

contract('ERC20-02-transfer.test', (accounts) => {

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

    it('transfer should throw if contract is paused', async () => {
        await contractInstance.pause({ from: ownerAddress });
        
        await Assert.reverts(
            contractInstance.transfer(address1, 1000, { from: ownerAddress }),
            'Pausable: paused'
        );
    });

    it('transfer should throw if to address is not valid', async () => {
        await Assert.reverts(
            contractInstance.transfer('0x0000000000000000000000000000000000000000', 1000, { from: ownerAddress }),
            'ERC20: to address is not valid'
        );
    });

    it('transfer should throw if balance is insufficient', async () => {
        await Assert.reverts(
            contractInstance.transfer(ownerAddress, 1000, { from: address1 }),
            'ERC20: insufficient balance'
        );
    });

    it('transfer success', async () => {
        const result = await contractInstance.transfer(address1, 1000, { from: ownerAddress });
       
        Assert.eventEmitted(result, 'Transfer');
    });
});