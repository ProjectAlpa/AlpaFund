import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from '../components/welcome/welcome.component';
import {UnlockWalletComponent} from '../components/unlock-wallet/unlock-wallet.component';
import {GuardService} from '../services/auth/guard.service';
import {InvestComponent} from '../components/invest/invest.component';


const routes: Routes = [
  {
    path: '', component: WelcomeComponent, data: {
      customLayout: true
    }
  },
  {
    path: 'unlock-wallet', component: UnlockWalletComponent
  },
  {
    path: 'invest', component: InvestComponent, canActivate: [GuardService]
  },
  // {
  //   path: 'message-report', component: MessageReportComponent, canActivate: [GuardService]
  // },
  // {
  //   path: 'message-log', component: MessageLogComponent, canActivate: [GuardService]
  // },
  // {
  //   path: 'user-management', component: UserManagementComponent, canActivate: [GuardService]
  // },
  // {
  //   path: 'user-management/detail/:id', component: UserDetailviewComponent, canActivate: [GuardService]
  // },
  // {
  //   path: 'finance', canActivate: [GuardService], children: [
  //     {
  //       path: 'balance', component: BalanceComponent, canActivate: [GuardService]
  //     },
  //     {
  //       path: 'invoices', component: InvoicesComponent, canActivate: [GuardService]
  //     },
  //     {
  //       path: 'invoices/detail/:id', component: InvoiceDetailComponent, canActivate: [GuardService]
  //     },
  //     {
  //       path: 'pricelist', component: PricelistComponent, canActivate: [GuardService]
  //     }
  //   ]
  // },
  // {
  //   path: 'help', component: HelpComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
