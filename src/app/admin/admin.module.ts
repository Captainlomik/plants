import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { AddPageComponent } from './add-page/add-page.component';
import { AccountPageComponent } from './account-page/account-page.component';


@NgModule({
  declarations: [AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    OrderPageComponent,
    AddPageComponent,
    AccountPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [{ path: 'login', component: LoginPageComponent },
        {
          path: '', component: AdminLayoutComponent, children: [
            { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
            { path: 'add', component: AddPageComponent },
            { path: 'dashboard', component: DashboardPageComponent },
            { path: 'account', component:AccountPageComponent },
            {path:'order', component:OrderPageComponent }
          ]
        }
      ]
    )
  ],
  exports: [RouterModule]
})
export class AdminModule { }
