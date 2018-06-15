import ether from './helpers/ether';
import { advanceBlock } from './helpers/advanceToBlock';
import { increaseTimeTo, duration } from './helpers/increaseTime';
import latestTime from './helpers/latestTime';
import EVMRevert from './helpers/EVMRevert';

const BigNumber = web3.BigNumber;

require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const Crowdsale = artifacts.require('SponBCrowdsale');
const Token = artifacts.require('SponBToken');

const rate = new BigNumber(1000);
const tokenSupply = new BigNumber('700000000');
const softCap = ether(500)
const hardCap = ether(1000)
const value = ether(42);
const openingTime = latestTime() + duration.weeks(1);
const endTime = openingTime + duration.weeks(1);
const afterClosingTime = endTime + duration.weeks(1)
const duringSale = openingTime + duration.minutes(10);
        

contract('SponBCrowdsale', function ([owner, wallet, authorized, unauthorized, anotherAuthorized]) {


    before(async function() {
        await advanceBlock()
    })

    beforeEach(async function () {
        this.token = await Token.new(wallet,tokenSupply);
        this.crowdsale = await Crowdsale.new(softCap, hardCap, openingTime, endTime, rate, wallet, this.token.address);
        await this.crowdsale.addToWhitelist(authorized, {from:owner});
        await advanceBlock();
    });

    describe('initialized correctly', function(){
        it('should have wallet as owner', async function() {
            const _owner = await this.crowdsale.owner()
            _owner.should.be.equal(owner)
        })

        it('should have sent the token supply', async function() {
            const _supply = await this.token.balanceOf(wallet)
            _supply.should.be.bignumber.equal(tokenSupply)
        })
    })

    describe('accepting payments', function () {

        before(async function() {
            await advanceBlock();
        })

        it('should accept payments to whitelisted (from whichever buyers)', async function () {
            await this.crowdsale.sendTransaction({value,from: authorized }).should.be.fulfilled;
            await this.crowdsale.buyTokens(authorized, { value: value, from: authorized }).should.be.fulfilled;
            await this.crowdsale.buyTokens(authorized, { value: value, from: unauthorized }).should.be.fulfilled;
        });

        it('should reject payments to not whitelisted (from whichever buyers)', async function () {
            await this.crowdsale.send(value).should.be.rejected;
            await this.crowdsale.buyTokens(unauthorized, { value: value, from: unauthorized }).should.be.rejected;
            await this.crowdsale.buyTokens(unauthorized, { value: value, from: authorized }).should.be.rejected;
        });

        it('should reject payments to addresses removed from whitelist', async function () {
            await this.crowdsale.removeFromWhitelist(authorized);
            await this.crowdsale.buyTokens(authorized, { value: value, from: authorized }).should.be.rejected;
        });
    });

    describe('reporting whitelisted', function () {
        it('should correctly report whitelisted addresses', async function () {
            let isAuthorized = await this.crowdsale.whitelist(authorized);
            isAuthorized.should.equal(true);
            let isntAuthorized = await this.crowdsale.whitelist(unauthorized);
            isntAuthorized.should.equal(false);
        });
    });


    describe('creating a valid crowdsale', function () {
        it('should fail with zero softCap', async function () {
            this.crowdsale = await Crowdsale.new(ether(0), hardCap, openingTime, endTime, rate, wallet, this.token.address).should.be.rejectedWith(EVMRevert);
        });
    });

    describe('Refund & Forward funds', function() {

    beforeEach(async function () {
        this.token = await Token.new(wallet,tokenSupply);
        this.crowdsale = await Crowdsale.new(softCap, hardCap, openingTime, endTime, rate, wallet, this.token.address);
        await this.crowdsale.addToWhitelist(authorized, {from:owner});
        await advanceBlock();
    });

        it('should deny refunds before end', async function () {
            await this.crowdsale.claimRefund({ from: authorized }).should.be.rejectedWith(EVMRevert);
            await increaseTimeTo(openingTime);
            await this.crowdsale.claimRefund({ from: authorized }).should.be.rejectedWith(EVMRevert);
        });

        it('should deny refunds after end if softCap was reached', async function () {
            await increaseTimeTo(openingTime);
            await this.crowdsale.sendTransaction({ value: softCap, from: authorized });
            await increaseTimeTo(afterClosingTime);
            await this.crowdsale.claimRefund({ from: authorized }).should.be.rejectedWith(EVMRevert);
        });

        it('should allow refunds after end if softCap was not reached', async function () {
            await increaseTimeTo(openingTime);
            await this.crowdsale.sendTransaction({ value: value, from: authorized });
            await increaseTimeTo(afterClosingTime);
            await this.crowdsale.finalize({ from: owner });
            const pre = web3.eth.getBalance(authorized);
            await this.crowdsale.claimRefund({ from: authorized, gasPrice: 0 }).should.be.fulfilled;
            await advanceBlock();
            const post = web3.eth.getBalance(authorized);
            post.minus(pre).should.be.bignumber.equal(value);
        });

        it('should forward funds to wallet after end if softCap was reached', async function () {
            await increaseTimeTo(openingTime);
            await this.crowdsale.sendTransaction({ value: softCap, from: authorized });
            await increaseTimeTo(afterClosingTime);
            const pre = web3.eth.getBalance(wallet);
            await this.crowdsale.finalize({ from: owner });
            const post = web3.eth.getBalance(wallet);
            post.minus(pre).should.be.bignumber.equal(softCap);
        });
    })
});
