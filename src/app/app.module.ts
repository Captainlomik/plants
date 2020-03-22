import { AlertService } from './admin/shared/services/alert.service';

import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FooterComponent } from './footer/footer.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { AdminModule } from './admin/admin.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login/login.component';
import { RegistrationComponent } from './login/registration/registration.component';
import { ProductsCatalogComponent } from './shared/components/products-catalog/products-catalog.component';
import { AuthInterseptor } from './shared/auth.interceptor';
import { SearchPipe } from './admin/shared/search.pipe';

const INTERSEPTOR:Provider={
provide:HTTP_INTERCEPTORS,
multi:true,
useClass:AuthInterseptor
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageComponent,
    FooterComponent,
    CatalogPageComponent,
    ProductPageComponent,
    NotFoundComponent,
    LoginComponent,
    RegistrationComponent,
    ProductsCatalogComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule, 
    SharedModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [INTERSEPTOR],
  bootstrap: [AppComponent]
})
export class AppModule { }
