import ether from './helpers/ether';
import advanceBlock from './helpers/advanceToBlock';
import { increaseTimeTo, duration } from './helpers/increaseTime';
import latestTime from './helpers/latestTime';
import EVMRevert from './helpers/EVMRevert';
import promisify from './helpers/promisify';

require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const BigNumber = web3.BigNumber;
const getBalance = (account, at) =>  promisify(cb => web3.eth.getBalance(account, at, cb));

/* Mock data */

const Crowdsale = artifacts.require('./mocks/SponBCrowdsaleImpl.sol');
const Token = artifacts.require('./mocks/SponBTokenImpl.sol');
const doc = 2; //idCard
const hash = 'abc123';
const score = 9;
const requiredScore = 200;

const crowdsaleData = {
    softCap: new BigNumber(1e3),
    hardCap: new BigNumber(1e5),
    startTime: '1546300800', // 2019-01-01 00:00 UTC
    endTime: '1546304400', // 2019-01-01 01:00 UTC
    rate: 1000,
    wallet: 0x0,
    token:0x0,
}

contract('SponBCrowdsale', function ([_,owner, wallet, investor, purchaser]) {


    const buySequence = async () => {
        

    }

    before(async function () {

        this.token = await Token.new({
            from:owner
        });

        crowdsaleData.wallet = wallet;
        crowdsaleData.token = this.token.address;

        this.sale = await Crowdsale.new(
            crowdsaleData.softCap,  
            crowdsaleData.hardCap,  
            crowdsaleData.startTime,  
            crowdsaleData.endTime,  
            crowdsaleData.rate,  
            wallet,
            crowdsaleData.token,  
            {from:owner}
        );

    });

    beforeEach(async function () {
        //await advanceBlock();
    });

    describe('Initializating the Crowdsale contract', function () {

        it('owner is '+ owner, async function() {
            let _address = await this.sale.owner.call()
            assert(_address === owner, "Wrong owner");
        });

        it('wallet is '+ wallet, async function() {
            let _address = await this.sale.wallet.call()
            _address.should.be.equal(wallet)
        });

        it('Soft cap is '+ crowdsaleData.softCap, async function() {
            let result = await this.sale.goal.call()
            result.valueOf().should.be.equal(crowdsaleData.softCap.valueOf())
        });

        it('Hard cap is '+ crowdsaleData.hardCap, async function() {
            let result = await this.sale.cap.call()
            console.log("cap", result)
            result.valueOf().should.be.equal(crowdsaleData.hardCap.valueOf())
        });

        it('Start time is '+ crowdsaleData.startTime, async function() {
            let result = await this.sale.openingTime.call()
            result.valueOf().should.be.equal(crowdsaleData.startTime.valueOf())
        });

        it('End Time is '+ crowdsaleData.endTime, async function() {
            let result = await this.sale.closingTime.call()
            result.valueOf().should.be.equal(crowdsaleData.endTime.valueOf())
        });

    });

    describe('Before the sale', async function() {
        await buySequence()
    })

    describe('During the sale', async function() {
        await buySequence()
    })

    describe('After the sale', async function() {
        await buySequence()
    })



});


