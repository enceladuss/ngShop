import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutWrapComponent } from './main-layout-wrap.component';
import {MainHeaderModule} from '../main-header/main-header.module';
import {MainFooterModule} from '../main-footer/main-footer.module';



@NgModule({
  declarations: [
    MainLayoutWrapComponent
  ],
  exports: [
    MainLayoutWrapComponent
  ],
  imports: [
    CommonModule,
    MainHeaderModule,
    MainFooterModule
  ]
})
export class MainLayoutWrapModule { }
