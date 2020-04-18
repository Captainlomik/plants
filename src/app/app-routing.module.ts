import { AuthUserGuard } from './shared/authUserGuard.service';
import { PersonalAreaComponent } from './login/personal-area/personal-area.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate, PreloadAllModules } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login/login.component';




const routes: Routes = [
  {path:'', component:MainPageComponent},
  {path:'catalog', component:CatalogPageComponent},
  {path:'product/:id', component:ProductPageComponent},
  { path:'admin', loadChildren: './admin/admin.module#AdminModule'},
  {path:'loginUser', component:LoginComponent},
   {path:'personalArea', component:PersonalAreaComponent, canActivate:  [AuthUserGuard]},
  { path: '404', component:NotFoundComponent },
  { path: '**', redirectTo: '404' }
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, 
    {
      preloadingStrategy:PreloadAllModules
    })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
