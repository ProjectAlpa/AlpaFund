// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

import "./AlpaFundCore.sol";
import "./AlpaMeUniswap.sol";
import "./AlpaFund.sol";
import "./ChainLinkAggregator.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/ChainLinkAggregatorV3Interface.sol";
import "../node_modules/@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";


import '../node_modules/@uniswap/v2-core/contracts/interfaces/IUniswapV2Callee.sol';

import './libraries/UniswapV2Library.sol';
import './interfaces/V1/IUniswapV1Factory.sol';
import './interfaces/V1/IUniswapV1Exchange.sol';
import './interfaces/IUniswapV2Router02.sol';
import './interfaces/IERC20.sol';
import './interfaces/IWETH.sol';

contract AlpaFundUniswap is AlpaFundCore, AlpaFund {

  IUniswapV1Factory factoryV1;
  address factory;
  IWETH WETH;

  IUniswapV2Router02 uniswap2 = IUniswapV2Router02(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);

  AggregatorV3Interface chainLink = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);

  struct ChainLinkResponse {
    uint80 roundId;
    uint256 answer;
    uint256 startedAt;
    uint256 updatedAt;
    uint80 answeredInRound;
  }

  constructor(address _factory, address _factoryV1, address router) public {
    owner = msg.sender;
    factoryV1 = IUniswapV1Factory(_factoryV1);
    factory = _factory;
    WETH = IWETH(IUniswapV2Router02(router).WETH());
  }

//  function() external payable atStage(Stages.OPERATIONAL) {
//    _buy(address(0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599));
//  }

  function buy() external payable atStage(Stages.OPERATIONAL) {
    _buy(address(0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599));
  }

  function _buy(address tokenAddress) private {
    require(msg.value > 0);

    if (!wallets[msg.sender].exists) {
      WalletStruct memory walletStruct = WalletStruct(AlpaMe(new AlpaMeUniswap()), true);
      wallets[msg.sender] = walletStruct;
    }

    balances[msg.sender][defaultToken] += msg.value;
    portfolioValue += msg.value;

    (uint80 roundId,
    int256 answer,
    uint256 startedAt,
    uint256 updatedAt,
    uint80 answeredInRound) = chainLink.latestRoundData();
    address[] memory path = new address[](2);
    path[0] = tokenAddress;
    path[1] = tokenAddress;
    wallets[msg.sender].wallet.swapETHForExactTokens(uint(answer), path, address(wallets[msg.sender].wallet), block.timestamp);

    IERC20 token = IERC20(tokenAddress);

    emit Transfer(msg.sender, address(this), msg.value);
    emit NewInvestment(msg.sender, portfolioValue, msg.value);
    emit NewBalanceEntry(msg.sender, defaultToken, portfolioValue, token.balanceOf(msg.sender));
  }

  function sell(string calldata _symbol, uint256 _amount) external {

  }

  function addLiquidityETH(
    address token,
    uint amountTokenDesired,
    uint amountTokenMin,
    uint amountETHMin,
    address to,
    uint deadline
  ) external payable returns (uint amountToken, uint amountETH, uint liquidity) {
    return uniswap2.addLiquidityETH(token, amountTokenDesired, amountTokenMin, amountETHMin, to, deadline);
  }

  function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
  external
  returns (uint[] memory amounts) {
    return uniswap2.swapTokensForExactETH(amountOut, amountInMax, path, to, deadline);
  }

  function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
  external
  payable
  returns (uint[] memory amounts) {
    return uniswap2.swapETHForExactTokens(amountOut, path, to, deadline);
  }

  function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
  external
  returns (uint[] memory amounts){
    return uniswap2.swapExactTokensForETH(amountIn, amountOutMin, path, to, deadline);
  }

}
