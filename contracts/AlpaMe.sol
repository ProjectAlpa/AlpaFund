// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

import "./AlpaFundCore.sol";

abstract contract AlpaMe is AlpaFundCore {
  mapping(address => uint) pendingWithdrawals;

  constructor() public {
    owner = msg.sender;
  }

  function sell(string calldata _symbol, uint256 _amount) virtual external;

  function addLiquidityETH(
    address token,
    uint amountTokenDesired,
    uint amountTokenMin,
    uint amountETHMin,
    address to,
    uint deadline
  ) virtual external payable returns (uint amountToken, uint amountETH, uint liquidity);

  function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
  virtual external
  returns (uint[] memory amounts);

  function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
  virtual external
  payable
  returns (uint[] memory amounts);

  function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
  virtual external
  returns (uint[] memory amounts);

  function withdraw() external onlyOwner {
    uint amount = pendingWithdrawals[msg.sender];
    // Remember to zero the pending refund before
    // sending to prevent re-entrancy attacks
    pendingWithdrawals[msg.sender] = 0;
    msg.sender.transfer(amount);
  }
}
