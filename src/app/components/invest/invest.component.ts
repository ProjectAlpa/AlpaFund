import {Component, OnInit} from '@angular/core';
import {Token} from '../../interfaces/token';
import {HttpClient} from '@angular/common/http';
import {Web3Service} from '../../util/web3.service';
import {MatSnackBar} from '@angular/material/snack-bar';


declare let require: any;
const alpafund_artifacts = require('../../../../build/contracts/AlpaFundUniswap.json');


@Component({
  selector: 'app-invest',
  templateUrl: './invest.component.html',
  styleUrls: ['./invest.component.scss']
})
export class InvestComponent implements OnInit {
  tokens: Token[];
  activeToken: Token;

  accounts: string[];
  AlpaFund: any;
  tokenAddress: string;

  model = {
    amount: 5,
    receiver: '',
    balance: 0,
    account: '',
    portfolioValue: 0,
    strategies: {},
    strategy: 'default',
    stage: ''
  };
  status = '';

  constructor(private http: HttpClient, private web3Service: Web3Service, private matSnackBar: MatSnackBar) {
    console.log('Constructor: ' + web3Service);
  }

  ngOnInit() {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.http.get<Token[]>('assets/tokens.json').subscribe((value: Token[]) => {
      this.tokens = value;
      this.activeToken = this.tokens[0];
    });
    this.accounts = this.web3Service.getAccounts();
    this.model.account = this.accounts[0];
    this.watchAccount();
    this.web3Service.artifactsToContract(alpafund_artifacts)
      .then((MetaCoinAbstraction) => {
        this.AlpaFund = MetaCoinAbstraction;
        this.AlpaFund.deployed().then(deployed => {
          console.log(deployed);
          deployed.Transfer({}, (err, ev) => {
            console.log('Transfer event came in, refreshing balance');
            this.refreshBalance();
          });
        });

      });
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
      this.refreshBalance();
    });
  }

  async addPortfolioStrategy() {
    try {
      const deployedAlpaFund = await this.AlpaFund.deployed();
      console.log(deployedAlpaFund);
      console.log('Account', this.model.account);
      const alpaFundBalance = await deployedAlpaFund.addPortfolioStrategy.call(this.model.strategy);
    } catch (e) {
      console.log(e);
      this.setStatus('Error adding Strategy; see log.');
    }
  }

  async disableFund() {
    try {
      const deployedAlpaFund = await this.AlpaFund.deployed();
      deployedAlpaFund.disableFund.call();
    } catch (e) {
      console.log(e);
      this.setStatus('Error disabling Fund; see log.');
    }
  }

  async enableFund() {
    try {
      const deployedAlpaFund = await this.AlpaFund.deployed();
      deployedAlpaFund.enableFund.call();
    } catch (e) {
      console.log(e);
      this.setStatus('Error enabling Fund; see log.');
    }
  }

  async refreshBalance() {
    console.log('Refreshing balance');

    try {
      const deployedAlpaFund = await this.AlpaFund.deployed();
      console.log(deployedAlpaFund);
      console.log('Account', this.model.account);
      const alpaFundBalance = await deployedAlpaFund.getBalanceForSymbol.call(this.model.account, this.activeToken.symbol);
      const alpaFundPortfolioValue = await deployedAlpaFund.portfolioValue.call();
      const alpaFundStrategies = await deployedAlpaFund.strategies.call(this.model.strategy);
      const alpaFundStage = await deployedAlpaFund.stage.call();
      console.log('Found balance: ' + alpaFundBalance);
      console.log('Found PortfolioValue: ' + alpaFundPortfolioValue);
      this.model.balance = alpaFundBalance;
      this.model.portfolioValue = alpaFundPortfolioValue;
      this.model.strategies = alpaFundStrategies;
      this.model.stage = alpaFundStage;
    } catch (e) {
      console.log(e);
      this.setStatus('Error getting balance; see log.');
    }
  }

  setStatus(status) {
    this.matSnackBar.open(status, null, {duration: 3000});
  }

  async sendETH() {
    if (!this.AlpaFund) {
      this.setStatus('AlpaFund is not loaded, unable to send transaction');
      return;
    }

    const amount = this.model.amount;
    const receiver = this.model.receiver;

    console.log('Sending coins' + amount + ' to ' + receiver);

    this.setStatus('Initiating transaction... (please wait)');
    try {
      const deployedMetaCoin = await this.AlpaFund.deployed();
      const gasEstimate = await deployedMetaCoin.buy.estimateGas();
      const transaction = await deployedMetaCoin.buy.sendTransaction({amount: this.web3Service.web3.utils.toWei('1', 'ether')});

      if (!transaction) {
        this.setStatus('Transaction failed!');
      } else {
        this.setStatus('Transaction complete!');
      }
    } catch (e) {
      console.log(e);
      this.setStatus('Error sending coin; see log.');
    }
  }

}
