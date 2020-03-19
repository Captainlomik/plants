import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { NotFoundComponent } from './not-found/not-found.component';



const routes: Routes = [
  {path:'', component:MainPageComponent},
  {path:'catalog', component:CatalogPageComponent},
  {path:'product/:id', component:ProductPageComponent},
  { path:'admin', loadChildren: './admin/admin.module#AdminModule'},
  { path: '404', component:NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
