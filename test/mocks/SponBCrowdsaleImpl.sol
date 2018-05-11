pragma solidity ^0.4.18;

import '../../contracts/SponBCrowdsale.sol';
import '../../contracts/SponBToken.sol';


contract SponBCrowdsaleImpl is SponBCrowdsale {

    function SponBCrowdsaleImpl(
        uint _softCap, 
        uint _hardCap, 
        uint _startTime, 
        uint _endTime,
        uint _rate, 
        address _wallet,
        SponBToken  _token
    ) public SponBCrowdsale(_softCap, _hardCap, _startTime, _endTime, _rate, _wallet, _token) {
        
    }

}
