import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartAddedModalComponent } from './cart-added-modal.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    CartAddedModalComponent
  ],
  exports: [
    CartAddedModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CartAddedModalModule { }
