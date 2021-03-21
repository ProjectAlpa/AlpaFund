import { Component, OnInit } from '@angular/core';
import {Web3Service} from '../../util/web3.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-unlock-wallet',
  templateUrl: './unlock-wallet.component.html',
  styleUrls: ['./unlock-wallet.component.scss']
})
export class UnlockWalletComponent implements OnInit {

  constructor(private web3Service: Web3Service, private router: Router) { }

  ngOnInit() {
  }

  onUnlockWallet(): void {
    this.web3Service.bootstrapWeb3();
    this.web3Service.accountsObservable.subscribe(() => this.router.navigate(['invest']));
  }

}
