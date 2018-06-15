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
const Token = artifacts.require('./mocks/SponBTokenImpl.sol');
//const Crowdsale = artifacts.require('./mocks/SponBCrowdsaleImpl.sol');

const TokenData = {
    symbol:'SPO',
    totalSupply:'700000000',
}

contract('SponBToken', function ([_,owner, wallet, investor, purchaser]) {

    before(async function () {

        this.token = await Token.new(wallet, TokenData.totalSupply, {
            from:owner
        });

    });

    describe('Initializating the Token contract', function () {

        it('owner is '+ owner, async function() {
            let _address = await this.token.owner.call()
            assert(_address === owner, "Wrong owner");
        });

        it('it symbol set to '+ TokenData.symbol, async function() {
            let _symbol = await this.token.symbol.call()
            _symbol.valueOf().should.be.equal(TokenData.symbol)
        });

        it(`has a total supply of ${TokenData.totalSupply} tokens`, async function() {
            let _supply = await this.token.totalSupply()
            _supply.valueOf().should.be.equal(TokenData.totalSupply)
        });

    });


});



