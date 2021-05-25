import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {MetaModule} from './meta/meta.module';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatToolbarModule} from '@angular/material';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {AlpaLayoutModule} from './alpa-layout/alpa-layout.module';
import {UnlockWalletComponent} from './components/unlock-wallet/unlock-wallet.component';
import {InvestComponent} from './components/invest/invest.component';
import {MatSelectModule} from '@angular/material/select';
import {SafePipe} from './pipes/safe.pipe';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    UnlockWalletComponent,
    InvestComponent,
    SafePipe
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MetaModule,
    AppRoutingModule,
    AlpaLayoutModule,
    MatSelectModule
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {
      return {
        cache: new InMemoryCache(),
        fetchOptions: {
          mode: 'no-cors'
        },
        link: httpLink.create({
          uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
        }),
      };
    },
    deps: [HttpLink],
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
