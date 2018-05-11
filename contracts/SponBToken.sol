pragma solidity ^0.4.21;

import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "openzeppelin-solidity/contracts/ownership/Claimable.sol";

contract SponBToken is MintableToken, Claimable {

    string public constant name = "SponB Token";
    string public constant symbol= "SPO";
    uint8 public constant decimals = 18;

    function SponBToken() public {
    }

}
