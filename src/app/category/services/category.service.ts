import {Injectable} from '@angular/core';
import {ProductService} from '../../shared/product.service';
import {filter, map, switchMap, toArray} from 'rxjs/operators';
import {from, Observable} from 'rxjs';

@Injectable()
export class CategoryService {

  constructor(private productService: ProductService) {
    // this.productService.getAll()
    //   .subscribe(data => {
    //
    //     this.loading = false;
    //
    //     if (!data || !data.length) {
    //       this.noProducts = true;
    //       return;
    //     }
    //
    //     this.products = data.filter((item) => {
    //       return item.type.toLowerCase() + 's' === this.category;
    //     });
    //
    //     if (!this.products.length) {
    //       this.noProducts = true;
    //       return;
    //     }
    //
    //     // Sort products by sold number by default
    //     this.products = this.products.sort((a, b) => a.sold > b.sold ? 1 : -1);
    //   });
  }

  getProducts(category: 'phones' | 'tablets' | 'laptops'): Observable<any> {
    return this.productService.getAll().pipe(
      switchMap((products: any[]) => from(products)),
      filter((product: any) => product.type.toLowerCase() + 's' === category),
      toArray(),
      map((products: any[]) => products.sort((a, b) => a.sold > b.sold ? 1 : -1))
    );
  }
}
