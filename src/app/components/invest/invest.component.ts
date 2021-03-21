import { Component, OnInit } from '@angular/core';
import {Token} from '../../interfaces/token';
import {HttpClient} from '@angular/common/http';
import {Web3Service} from '../../util/web3.service';
import {MatSnackBar} from '@angular/material/snack-bar';


declare let require: any;
const alpafund_artifacts = require('../../../../build/contracts/AlpaFund.json');


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
    account: ''
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

  async refreshBalance() {
    console.log('Refreshing balance');

    try {
      const deployedAlpaFund = await this.AlpaFund.deployed();
      console.log(deployedAlpaFund);
      console.log('Account', this.model.account);
      const alpaFundBalance = await deployedAlpaFund.getBalanceForSymbol.call(this.model.account, this.activeToken.symbol);
      console.log('Found balance: ' + alpaFundBalance);
      this.model.balance = alpaFundBalance;
    } catch (e) {
      console.log(e);
      this.setStatus('Error getting balance; see log.');
    }
  }

  setStatus(status) {
    this.matSnackBar.open(status, null, {duration: 3000});
  }

}
