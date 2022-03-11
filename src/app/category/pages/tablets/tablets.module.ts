import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabletsComponent} from './tablets.component';
import {CategoryFilterModule} from '../../shared/category-filter/category-filter.module';
import {TabletsRoutingModule} from './tablets-routing.module';
import {ProductModule} from '../../../product/product.module';
import {NoResultModule} from '../../../shared/no-result/no-result.module';
import {ProductSearchModule} from '../../../shared/pipes/product-search/product-search.module';
import {CategoryFilterResultModule} from '../../shared/category-filter-result/category-filter-result.module';
import {CategoryService} from '../../services/category.service';
import {LoaderModule} from '../../../shared/loader/loader.module';


@NgModule({
  declarations: [
    TabletsComponent
  ],
    imports: [
        CommonModule,
        TabletsRoutingModule,
        CategoryFilterModule,
        ProductModule,
        NoResultModule,
        ProductSearchModule,
        CategoryFilterResultModule,
        LoaderModule
    ],
  providers: [
    CategoryService,
  ]
})
export class TabletsModule {
}
