import {NgModule} from '@angular/core';
import {ProductSearchPipe} from './product-search.pipe';


@NgModule({
  declarations: [
    ProductSearchPipe
  ],
  exports: [
    ProductSearchPipe
  ]
})
export class ProductSearchModule {
}
