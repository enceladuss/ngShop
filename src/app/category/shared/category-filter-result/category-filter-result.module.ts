import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFilterResultComponent } from './category-filter-result.component';
import {ProductModule} from '../../../product/product.module';
import {NoResultModule} from '../../../shared/no-result/no-result.module';
import {ProductSearchModule} from '../../../shared/pipes/product-search/product-search.module';
import {LoaderModule} from '../../../shared/loader/loader.module';



@NgModule({
  declarations: [
    CategoryFilterResultComponent
  ],
  exports: [
    CategoryFilterResultComponent
  ],
    imports: [
        CommonModule,
        ProductModule,
        NoResultModule,
        ProductSearchModule,
        LoaderModule
    ]
})


export class CategoryFilterResultModule { }
