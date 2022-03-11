import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header.component';
import {RouterModule} from '@angular/router';
import {CartAddedModalModule} from '../cart-added-modal/cart-added-modal.module';



@NgModule({
    declarations: [
        MainHeaderComponent
    ],
    exports: [
        MainHeaderComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        CartAddedModalModule
    ]
})
export class MainHeaderModule { }
