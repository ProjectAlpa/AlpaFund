import { Component, OnInit } from '@angular/core';
import {Web3Service} from '../../../util/web3.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private web3Service: Web3Service) { }

  ngOnInit() {
  }

}
