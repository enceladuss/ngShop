import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductComponent} from './product.component';
import {RouterModule} from '@angular/router';
import {CartAddedModalModule} from '../shared/cart-added-modal/cart-added-modal.module';


@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CartAddedModalModule
  ],
  exports: [
    ProductComponent
  ]
})
export class ProductModule {
}
