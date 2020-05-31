const Artifact = artifacts.require('../contracts/ERC20');
const Assert = require('truffle-assertions');

contract('ERC20-09-mintTo.test', (accounts) => {

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

    it('mintTo should throw if contract is paused', async () => {
        const mintValue = 1000;
        
        await contractInstance.pause({ from: ownerAddress });
        
        await Assert.reverts(
            contractInstance.mintTo(address1, mintValue, { from: address1 }),
            'Pausable: paused'
        );
    });

    it('mintTo should throw if to address is invalid', async () => {
        await Assert.reverts(
            contractInstance.mintTo('0x0000000000000000000000000000000000000000', 1000, { from: ownerAddress }),
            'ERC20: to address is not valid'
        );
    });

    it('mintTo should throw if amount is invalid', async () => {
        await Assert.reverts(
            contractInstance.mintTo(address1, 0, { from: ownerAddress }),
            'ERC20: amount is not valid'
        );
    });

    it('mintTo should throw if account is not a minter', async () => {
        const mintValue = 1000;

        await Assert.reverts(
            contractInstance.mintTo(address1, mintValue, { from: address1 }),
            'Ownable: caller is not the owner'
        );
    });

    it('mintTo success', async () => {
        const mintValue = 1000;

        const resultBeforeMint = await contractInstance.totalSupply();
        await contractInstance.mintTo(address1, mintValue, { from: ownerAddress });
        const expectedTotalSupply = resultBeforeMint.toNumber() + mintValue;
        const resultAfterMint = await contractInstance.totalSupply();
        const resultBalanceOf = await contractInstance.balanceOf(address1, { from: address1 });

        assert.equal(tokenTotalSupply, resultBeforeMint, 'wrong totalSupply before');
        assert.equal(expectedTotalSupply, resultAfterMint, 'wrong totalSupply after');
        assert.equal(mintValue, resultBalanceOf, 'wrong balance');
    });
});