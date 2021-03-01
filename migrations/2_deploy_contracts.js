var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var AlpaFund = artifacts.require("./AlpaFund.sol");
// var WBTC = artifacts.require("../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  // deployer.deploy(WBTC);
  deployer.link(ConvertLib, MetaCoin);
  deployer.link(ConvertLib, AlpaFund);
  // deployer.link(WBTC, AlpaFund);
  deployer.deploy(AlpaFund);
  deployer.deploy(MetaCoin);
};
