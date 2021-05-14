// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

import "./AlpaFundCore.sol";
import "./AlpaMe.sol";
import "../node_modules/@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract AlpaMeUniswap is AlpaFundCore, AlpaMe {

  IUniswapV2Router02 uniswap = IUniswapV2Router02(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);
  IUniswapV2Router02 uniswap2 = IUniswapV2Router02(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);

  function sell(string calldata _symbol, uint256 _amount) override external {

  }

  function addLiquidityETH(
    address token,
    uint amountTokenDesired,
    uint amountTokenMin,
    uint amountETHMin,
    address to,
    uint deadline
  ) override external payable returns (uint amountToken, uint amountETH, uint liquidity) {
    return uniswap2.addLiquidityETH(token, amountTokenDesired, amountTokenMin, amountETHMin, to, deadline);
  }

  function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
  override external
  returns (uint[] memory amounts) {
    return uniswap2.swapTokensForExactETH(amountOut, amountInMax, path, to, deadline);
  }

  function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
  override external
  payable
  returns (uint[] memory amounts) {
    return uniswap2.swapETHForExactTokens(amountOut, path, to, deadline);
  }

  function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
  override external
  returns (uint[] memory amounts){
    return uniswap2.swapExactTokensForETH(amountIn, amountOutMin, path, to, deadline);
  }

}
