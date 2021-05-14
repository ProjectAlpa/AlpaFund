// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

contract AlpaFundCore {
  enum Stages {
    OPERATIONAL,
    FAIL_SAFE_MODE
  }

  // This is the current stage.
  Stages public stage = Stages.OPERATIONAL;

  address public owner;
  mapping (address => bool) public contributors;

  constructor() public {
    owner = msg.sender;
    contributors[owner] = true;
  }

  modifier onlyBy(address _account) {
    require(msg.sender == _account, "Sender not authorized.");
    _;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Sender not authorized.");
    _;
  }

  modifier onlyContributors() {
    require(contributors[msg.sender], "Sender not authorized.");
    _;
  }

  modifier onlyAfter(uint _time) {
    require(
      now >= _time,
      "Function called too early."
    );
    _;
  }

  modifier costs(uint _amount) {
    require(
      msg.value >= _amount,
      "Not enough Ether provided."
    );
    _;
    if (msg.value > _amount)
      msg.sender.transfer(msg.value - _amount);
  }

  modifier atStage(Stages _stage) {
    require(
      stage == _stage,
      "Function cannot be called at this time."
    );
    _;
  }

  function changeOwner(address _newOwner) public onlyBy(owner) {
    owner = _newOwner;
  }

  function addContributor(address newContributor) external onlyContributors {
    contributors[newContributor] = true;
  }

  function removeContributor(address newContributor) external onlyContributors {
    contributors[newContributor] = false;
  }

  function disableFund() external onlyContributors {
    stage = Stages.FAIL_SAFE_MODE;
  }

  function enableFund() external onlyContributors {
    stage = Stages.OPERATIONAL;
  }

}
