import {Pipe, PipeTransform} from '@angular/core';
import {Product} from './interfaces';

@Pipe({
  name: 'productSearch'
})
export class ProductSearchPipe implements PipeTransform {

  transform(products: Product[], productName = '', noProduct = false): any {

    if (!productName.trim()) {
      return products;
    }

    const filteredProducts = products.filter((product) => {
      return product.title.toLowerCase().includes(productName.toLowerCase());
    });

    if (!filteredProducts.length) {
      noProduct = true;
      return null;
    }

    return filteredProducts;

  }

}
