var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var AlpaFund = artifacts.require("./AlpaFund.sol");
var AlpaFundCore = artifacts.require("./AlpaFundCore.sol");
var AlpaFundUniswap = artifacts.require("./AlpaFundUniswap.sol");
var AlpaMe = artifacts.require("./AlpaMe.sol");
var AlpaMeUniswap = artifacts.require("./AlpaMeUniswap.sol");
var FlashSwap = artifacts.require("./FlashSwap.sol");
// var WBTC = artifacts.require("../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol");

module.exports = function(deployer, network) {
  const factoryV2address = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
  const factoryV1address = '0xD3E51Ef092B2845f10401a0159B2B96e8B6c3D30';
  const routerV2address = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
  // deployer.deploy(ConvertLib);
  // deployer.deploy(WBTC);
  // deployer.link(ConvertLib, MetaCoin);
  // deployer.link(ConvertLib, AlpaFund);
  // deployer.link(WBTC, AlpaFund);
  // deployer.deploy(AlpaFund);
  // deployer.deploy(AlpaFundCore);
  if (network === "kovan") {
    // Perform a different step otherwise.
    // Do something specific to the network named "live".
    deployer.deploy(FlashSwap, factoryV2address, factoryV1address, routerV2address);
  } else {
    deployer.deploy(AlpaFundUniswap);

  }
  // deployer.deploy(AlpaMe);
  // deployer.deploy(AlpaMeUniswap);
  // deployer.deploy(MetaCoin);
};
