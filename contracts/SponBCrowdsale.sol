pragma solidity ^0.4.21;

import "openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/validation/WhitelistedCrowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/distribution/RefundableCrowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "openzeppelin-solidity/contracts/ownership/Claimable.sol";

import "./SponBToken.sol";

contract SponBCrowdsale is TimedCrowdsale,CappedCrowdsale,RefundableCrowdsale,WhitelistedCrowdsale,Claimable{
    
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
    TimedCrowdsale(_startTime, _endTime)
    CappedCrowdsale(_hardCap)
    RefundableCrowdsale(_softCap)
    WhitelistedCrowdsale
    Claimable
    {

    }

}
