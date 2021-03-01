pragma solidity ^0.5.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract AlpaFund {
  struct TokenEntry {
    uint256 balance;
  }
  /// PortfolioValue in ETH
  uint256 public portfolioValue;

  mapping (address =>  mapping (string => uint256)) balances;
  mapping (address => mapping (address => mapping (string => uint256))) public allowance;
  address public tokenAddress = address(0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599);
  string public tokenSymbol;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);
  event Approval(address indexed _owner, address indexed _spender, string indexed _symbol, uint256 _value);
  event NewInvestment(address investor, uint256 portValue, uint256 sentEthers);
  event NewBalanceEntry(address investor, string symbol, uint256 portValue, uint256 receivedTokens);

  constructor(string memory _tokenSymbol) public {
    tokenSymbol = _tokenSymbol;
//		balances[tx.origin] = 10000;
	}

  function () public payable {
    require(tokenAddress != address(0), "invalid _token address");
    require(msg.value > 0);
    IERC20 token = IERC20(tokenAddress);
    //address(this).transfer(msg.value);
    portfolioValue += msg.value;
    tokenAddress.transfer(msg.value);

    balances[msg.sender][tokenSymbol] = token.balanceOf(msg.sender);
    emit NewInvestment(msg.sender, portfolioValue, msg.value);
    emit NewBalanceEntry(msg.sender, tokenSymbol, portfolioValue, token.balanceOf(msg.sender));
    //_mintAndTransferTokens();
  }

  /**
     * Set allowance for other address
     *
     * Allows `_spender` to spend no more than `_value` tokens in your behalf
     *
     * @param _spender The address authorized to spend
     * @param _value the max amount they can spend
     */
  function approve(address _spender, string memory _symbol, uint256 _value) public
  returns (bool success) {
    IERC20 token = IERC20(tokenAddress);
    allowance[msg.sender][_spender][_symbol] = _value;
    emit Approval(msg.sender, _spender, _symbol, _value);
    return token.approve(msg.sender, _value);
  }

//	function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
//		if (balances[msg.sender] < amount) return false;
//		balances[msg.sender] -= amount;
//		balances[receiver] += amount;
//		emit Transfer(msg.sender, receiver, amount);
//		return true;
//	}

  /// @notice Sell `amount` tokens to contract
  /// @param _amount amount of tokens to be sold
  function sell(string memory _symbol, uint256 _amount) public {
    //address myAddress = this;
    require(balances[msg.sender][_symbol] >= _amount);      // checks if the contract has enough ether to buy
    IERC20 token = IERC20(tokenAddress);
    uint256 sendBackEth = 0;
    token.
//    if(portfolioValue > 0 && totalSupply > 0) {
//      sendBackEth = _removeSomeDigits((portfolioValue * 10 ** 18 / totalSupply) * _amount);
//    } else {
//      sendBackEth = _amount;
//    }
    //_transfer(myAddress, msg.sender, sendBackEth);              // makes the transfers
//    destroyToken(msg.sender, _amount);
    msg.sender.transfer(sendBackEth);          // sends ether to the seller. It's important to do this last to avoid recursion attacks
  }



	function getBalanceInEth(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}
}
