pragma solidity ^0.4.21;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/PausableToken.sol";
import "openzeppelin-solidity/contracts/ownership/Claimable.sol";

contract SponBToken is MintableToken, PausableToken, Claimable {

    string public constant name = "SponB Token";
    string public constant symbol= "SPO";
    uint8 public constant decimals = 18;
    address public wallet;

    function SponBToken(address _wallet, uint256 _totalSupply) 
    public 
    MintableToken  
    PausableToken
    Claimable
    {
        require(_wallet != address(0));
        totalSupply_ = _totalSupply;
        paused = false;
        balances[_wallet] = totalSupply_;
        wallet = _wallet;
    }

    // TODO : Transfer out ETH
    // TODO : Transfer out ERC20 tokens

    function transferERC20(ERC20 _erc20, uint _amount) external {
        
        ERC20 _token = ERC20(_erc20);
        _token.transfer(wallet, _amount);

    }


}
