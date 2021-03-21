import { Component, OnInit } from '@angular/core';
import {Web3Service} from '../../util/web3.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private web3Service: Web3Service) { }

  ngOnInit() {
  }

}
