pragma solidity ^0.4.21;

import "openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/validation/WhitelistedCrowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/distribution/RefundableCrowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "openzeppelin-solidity/contracts/ownership/Claimable.sol";

import "./SponBToken.sol";

contract SponBCrowdsale is CappedCrowdsale,TimedCrowdsale,RefundableCrowdsale,WhitelistedCrowdsale,Claimable{
    
    function SponBCrowdsale(
        uint _softCap, 
        uint _hardCap, 
        uint _startTime, 
        uint _endTime,
        uint _rate, 
        address _wallet,
        SponBToken _token
    ) public
    Crowdsale(_rate, _wallet, _token)
    CappedCrowdsale(_softCap)
    WhitelistedCrowdsale
    RefundableCrowdsale(_softCap)
    TimedCrowdsale(_startTime,_endTime)
    Claimable
    {

    }

    // TODO : Transfer out ERC20 tokens    

    function _deliverTokens(address _beneficiary, uint256 _tokenAmount) internal {
        //token.transferFrom(wallet, _beneficiary, _tokenAmount);
    }

}
