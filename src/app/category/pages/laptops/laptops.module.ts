import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaptopsComponent } from './laptops.component';
import {LaptopsRoutingModule} from './laptops-routing.module';
import {CategoryService} from '../../services/category.service';
import {CategoryFilterModule} from '../../shared/category-filter/category-filter.module';
import {ProductModule} from '../../../product/product.module';
import {NoResultModule} from '../../../shared/no-result/no-result.module';
import {ProductSearchModule} from '../../../shared/pipes/product-search/product-search.module';
import {CategoryFilterResultModule} from '../../shared/category-filter-result/category-filter-result.module';


@NgModule({
  declarations: [
    LaptopsComponent
  ],
  imports: [
    CommonModule,
    LaptopsRoutingModule,
    CategoryFilterModule,
    ProductModule,
    NoResultModule,
    ProductSearchModule,
    CategoryFilterResultModule
  ],
  providers: [
    CategoryService,
  ]
})
export class LaptopsModule { }
