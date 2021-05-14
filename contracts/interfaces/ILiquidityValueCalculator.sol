// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

interface ILiquidityValueCalculator {
  function computeLiquidityShareValue(uint liquidity, address tokenA, address tokenB) external returns (uint tokenAAmount, uint tokenBAmount);
}
