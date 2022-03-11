import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PhonesComponent} from './phones.component';
import {PhonesRoutingModule} from './phones-routing.module';
import {CategoryService} from '../../services/category.service';
import {CategoryFilterModule} from '../../shared/category-filter/category-filter.module';
import {ProductSearchModule} from '../../../shared/pipes/product-search/product-search.module';
import {ProductModule} from '../../../product/product.module';
import {NoResultModule} from '../../../shared/no-result/no-result.module';
import {CategoryFilterResultModule} from '../../shared/category-filter-result/category-filter-result.module';


@NgModule({
  declarations: [
    PhonesComponent
  ],
  imports: [
    CommonModule,
    PhonesRoutingModule,
    CategoryFilterModule,
    ProductSearchModule,
    ProductModule,
    NoResultModule,
    CategoryFilterResultModule
  ],
  providers: [
    CategoryService
  ]
})
export class PhonesModule {
}
