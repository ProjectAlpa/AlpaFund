// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

import "./AlpaFundCore.sol";
import "./AlpaMe.sol";

abstract contract AlpaFund is AlpaFundCore {

  struct TokenEntry {
    string symbol;
    address tokenAddress;
    int weight;
  }

  struct PortfolioStrategy {
    mapping(uint => TokenEntry) tokenEntries;
    uint entrySize;
  }

  struct WalletStruct {
    AlpaMe wallet;
    bool exists;
  }

  /// PortfolioValue in ETH
  uint256 public portfolioValue;

  string internal defaultToken = "ETH";
  address internal defaultTokenAddress = address(0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599);

  mapping(string => PortfolioStrategy) public strategies;

  mapping(address => mapping(string => uint256)) balances;
  mapping(address => WalletStruct) public wallets;

  event Transfer(address indexed _from, address indexed _to, uint256 _value);
  event Approval(address indexed _owner, address indexed _spender, string indexed _symbol, uint256 _value);
  event NewInvestment(address investor, uint256 portValue, uint256 sentEthers);
  event NewBalanceEntry(address investor, string symbol, uint256 portValue, uint256 receivedTokens);

  constructor() public {
    owner = msg.sender;
  }

  function getBalance(address addr, string memory tokenSymbol) public view returns (uint) {
    return balances[addr][tokenSymbol];
  }

//  function getBalances(address addr) public view returns (uint[] memory) {
//    return balances[addr];
//  }

  function getBalanceForSymbol(address addr, string memory symbol) public view returns (uint) {
    return balances[addr][symbol];
  }

  function addPortfolioStrategy(string memory _name) public {
    strategies[_name].entrySize = 0;
  }

  function addTokenEntryToPortfolioStrategy(string memory _name, string memory symbol, address tokenAddress, int weight) public {
    strategies[_name].tokenEntries[strategies[_name].entrySize] = TokenEntry(symbol, tokenAddress, weight);
    strategies[_name].entrySize++;
  }

  function removeTokenEntryFromPortfolioStrategy(string memory _name, uint index) public {
    if (index >= strategies[_name].entrySize) return;

    for (uint i = index; i<strategies[_name].entrySize-1; i++){
      strategies[_name].tokenEntries[i] = strategies[_name].tokenEntries[i+1];
    }
    delete strategies[_name].tokenEntries[strategies[_name].entrySize-1];
    strategies[_name].entrySize--;
  }

}
