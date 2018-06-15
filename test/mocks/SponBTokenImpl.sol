pragma solidity ^0.4.18;

import '../../contracts/SponBToken.sol';


contract SponBTokenImpl is SponBToken {

    function SponBTokenImpl(address _wallet, uint256 _totalSupply) public SponBToken(_wallet, _totalSupply) {
        
    }

}
