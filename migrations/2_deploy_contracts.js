/* SponB contracts */
const SponBCrowdsale = artifacts.require('../contracts/SponBCrowdsale.sol');
const SponBToken = artifacts.require('../contracts/SponBToken.sol');

module.exports = async (deployer, network, accounts) => {

    const deployParams = {
        softCap: new web3.BigNumber(10000000),
        hardCap: new web3.BigNumber(350000000),
        startTime: web3.eth.getBlock('latest').timestamp + 60,
        endTime: web3.eth.getBlock('latest').timestamp + 86400 * 20,
        rate: new web3.BigNumber(1000),
        wallet: accounts[1],
    }
    console.log("Deployment Params", deployParams)

    await deployer.deploy(SponBToken)
    await deployer.deploy(SponBCrowdsale,
                deployParams.softCap,
                deployParams.hardCap,
                deployParams.startTime,
                deployParams.endTime,
                deployParams.rate,
                deployParams.wallet,
                SponBToken.address
    )

};
