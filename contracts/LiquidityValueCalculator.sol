// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

//import "./interfaces/ILiquidityValueCalculator.sol";
//import '../node_modules/@uniswap/v2-periphery/contracts/libraries/UniswapV2Library.sol';
//import '../node_modules/@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

//contract LiquidityValueCalculator is ILiquidityValueCalculator {
//  address public factory;
//
//  constructor(address factory_) public {
//    factory = factory_;
//  }

//  function pairInfo(address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB, uint totalSupply) {
//    IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, tokenA, tokenB));
//    totalSupply = pair.totalSupply();
//    (uint reserves0, uint reserves1,) = pair.getReserves();
//    (reserveA, reserveB) = tokenA == pair.token0() ? (reserves0, reserves1) : (reserves1, reserves0);
//  }

//  function computeLiquidityShareValue(uint liquidity, address tokenA, address tokenB) external  returns (uint tokenAAmount, uint tokenBAmount) {
//    revert('TODO');
//  }
//}
