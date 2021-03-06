import { AuthService } from './shared/services/auth.service';
import { AppModule } from './../app.module';
import { environment } from 'src/environments/environment';
import { AlertService } from './shared/services/alert.service';
import { SearchPipe } from './shared/search.pipe';
import { EditPageComponent } from './edit-page/edit-page.component';
import { AuthGuard } from './shared/services/auth.guard';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { AddPageComponent } from './add-page/add-page.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AlertComponent } from './shared/components/alert/alert.component';
import { OrderPipe } from './shared/searchOrder.pipe';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    OrderPageComponent,
    AddPageComponent,
    AccountPageComponent,
    EditPageComponent,
    AlertComponent, 
    SearchPipe,
    OrderPipe,
],

  imports: [
   SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(
      [{ path: 'login', component: LoginPageComponent },
      {
        path: '', component: AdminLayoutComponent, children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
          { path: 'add', component: AddPageComponent, canActivate: [AuthGuard] },
          { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
          { path: 'account', component: AccountPageComponent, canActivate: [AuthGuard] },
          { path: 'order', component: OrderPageComponent, canActivate: [AuthGuard] },
          { path: 'product/:id/edit', component: EditPageComponent, canActivate: [AuthGuard] }
        ]
      }
      ]
    )
  ],
  exports: [
    SharedModule, SearchPipe, AlertComponent],
  providers: [ AlertService, ]
})
export class AdminModule { }
