import {Component, OnInit} from '@angular/core';
import {Web3Service} from '../../util/web3.service';
import {Token} from '../../interfaces/token';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Apollo} from 'apollo-angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  tokens: Token[];
  activeToken: Token;
  url: string;
  toggle = true;

  constructor(private http: HttpClient, private web3Service: Web3Service, private apollo: Apollo) { }

  ngOnInit() {
    this.http.get<Token[]>('assets/tokens/mainnet.json').subscribe((value: Token[]) => {
      this.tokens = value;
      this.activeToken = this.tokens[1];
      this.url = 'https://app.uniswap.org/#/swap?outputCurrency=' + this.activeToken.address;
      // this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    });
  }

  changeToken(token: Token) {
    this.activeToken = token;
    this.url = 'https://app.uniswap.org/#/swap?outputCurrency=' + this.activeToken.address;
    // this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  toggleRenderer() {
    this.toggle = false;
    this.toggle = true;
  }
}
