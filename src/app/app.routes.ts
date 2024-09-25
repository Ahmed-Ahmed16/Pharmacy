// app.routes.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { creatcomponent } from './creat account/creat.component';
import { productscomponent } from './products/products.component';
import { welcomecomponent } from './welcome/welcome.component';
import { SellProductComponent } from './sell/sell.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'creat',
    component: creatcomponent
  },
  {
    path: 'products',
    component: productscomponent
  },
  {
    path: 'welcome',
    component: welcomecomponent
  },
  {
    path: 'sell',
    component: SellProductComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }