import {Component, OnInit} from '@angular/core';
import {Web3Service} from '../../util/web3.service';
import {MatSnackBar} from '@angular/material/snack-bar';

declare let require: any;
const metacoin_artifacts = require('../../../../build/contracts/MetaCoin.json');
const alpafund_artifacts = require('../../../../build/contracts/AlpaFundUniswap.json');

@Component({
  selector: 'app-meta-sender',
  templateUrl: './meta-sender.component.html',
  styleUrls: ['./meta-sender.component.scss']
})
export class MetaSenderComponent implements OnInit {
  accounts: string[];
  MetaCoin: any;
  AlpaFund: any;
  tokenAddress: string;

  model = {
    amount: 5,
    receiver: '',
    balance: 0,
    account: ''
  };

  modelAlpa = {
    amount: 5,
    receiver: '',
    balance: 0,
    account: ''
  };

  status = '';

  constructor(private web3Service: Web3Service, private matSnackBar: MatSnackBar) {
    console.log('Constructor: ' + web3Service);
  }

  ngOnInit(): void {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.watchAccount();
    // this.web3Service.artifactsToContract(metacoin_artifacts)
    //   .then((MetaCoinAbstraction) => {
    //     this.MetaCoin = MetaCoinAbstraction;
    //     this.MetaCoin.deployed().then(deployed => {
    //       console.log(deployed);
    //       deployed.Transfer({}, (err, ev) => {
    //         console.log('Transfer event came in, refreshing balance');
    //         this.refreshBalance();
    //       });
    //     });
    //
    //   });
    this.web3Service.artifactsToContract(alpafund_artifacts)
      .then((MetaCoinAbstraction) => {
        this.AlpaFund = MetaCoinAbstraction;
        this.AlpaFund.deployed().then(deployed => {
          console.log(deployed);
          deployed.Transfer({}, (err, ev) => {
            console.log('Transfer event came in, refreshing balance');
            this.refreshBalanceAlpa();
          });
        });

      });

  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
      this.modelAlpa.account = accounts[0];
      // this.refreshBalance();
      this.refreshBalanceAlpa();
    });
  }

  setStatus(status) {
    this.matSnackBar.open(status, null, {duration: 3000});
  }

  async sendCoin() {
    if (!this.MetaCoin) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }

    const amount = this.model.amount;
    const receiver = this.model.receiver;

    console.log('Sending coins' + amount + ' to ' + receiver);

    this.setStatus('Initiating transaction... (please wait)');
    try {
      const deployedMetaCoin = await this.MetaCoin.deployed();
      const transaction = await deployedMetaCoin.sendCoin.sendTransaction(receiver, amount, {from: this.model.account});

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

  async changeTokenAddress() {
    if (!this.AlpaFund) {
      this.setStatus('AlpaFund is not loaded, unable to send transaction');
      return;
    }

    const amount = this.modelAlpa.amount;
    const receiver = this.modelAlpa.receiver;

    console.log('Sending coins' + amount + ' to ' + receiver);

    this.setStatus('Initiating transaction... (please wait)');
    try {
      const deployedMetaCoin = await this.AlpaFund.deployed();
      const transaction = await deployedMetaCoin.tokenAddress.sendTransaction(this.tokenAddress);
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

  async sendETH() {
    if (!this.AlpaFund) {
      this.setStatus('AlpaFund is not loaded, unable to send transaction');
      return;
    }

    const amount = this.modelAlpa.amount;
    const receiver = this.modelAlpa.receiver;

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

  async refreshBalance() {
    console.log('Refreshing balance');

    try {
      const deployedMetaCoin = await this.MetaCoin.deployed();
      console.log(deployedMetaCoin);
      console.log('Account', this.model.account);
      const metaCoinBalance = await deployedMetaCoin.getBalance.call(this.model.account);
      console.log('Found balance: ' + metaCoinBalance);
      this.model.balance = metaCoinBalance;
    } catch (e) {
      console.log(e);
      this.setStatus('Error getting balance; see log.');
    }
  }

  async refreshBalanceAlpa() {
    console.log('Refreshing balance');

    try {
      const deployedMetaCoin = await this.AlpaFund.deployed();
      console.log(deployedMetaCoin);
      console.log('Account', this.modelAlpa.account);
      const metaCoinBalance = await deployedMetaCoin.getBalance.call(this.modelAlpa.account);
      console.log('Found balance: ' + metaCoinBalance);
      this.modelAlpa.balance = metaCoinBalance;
    } catch (e) {
      console.log(e);
      this.setStatus('Error getting balance; see log.');
    }
  }

  setAmount(e) {
    console.log('Setting amount: ' + e.target.value);
    this.model.amount = e.target.value;
  }

  setReceiver(e) {
    console.log('Setting receiver: ' + e.target.value);
    this.model.receiver = e.target.value;
  }

}
