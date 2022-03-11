import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainLayoutComponent} from './shared/main-layout/main-layout.component';
import {MainPageComponent} from './main-page/main-page.component';
import {ProductPageComponent} from './product-page/product-page.component';
import {CartPageComponent} from './cart-page/cart-page.component';
import {NotFoundPageComponent} from './not-found-page/not-found-page.component';
import {CheckoutPageComponent} from './checkout-page/checkout-page.component';
import {OrderGratitudeComponent} from './order-gratitude/order-gratitude.component';

const routes: Routes = [
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'products', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
  },
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', component: MainPageComponent},
      {path: 'product/:id', component: ProductPageComponent},
      {path: 'cart', component: CartPageComponent},
      {path: 'checkout', component: CheckoutPageComponent},
      {path: 'order-gratitude', component: OrderGratitudeComponent},
      {path: '**', component: NotFoundPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
