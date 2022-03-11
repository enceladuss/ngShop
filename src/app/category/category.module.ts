import {NgModule} from '@angular/core';
import {CategoryRoutingModule} from './category-routing.module';
import {CategoryComponent} from './category.component';
import {RouterModule} from '@angular/router';
import {MainLayoutWrapModule} from '../shared/main-layout-wrap/main-layout-wrap.module';


@NgModule({
  imports: [
    RouterModule,
    CategoryRoutingModule,
    MainLayoutWrapModule,
  ],
  declarations: [
    CategoryComponent
  ]
})
export class CategoryModule {
}
