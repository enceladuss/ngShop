import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../../interfaces';

@Pipe({
  name: 'productSearch',
  pure: true
})
export class ProductSearchPipe implements PipeTransform {

  transform(products: Product[], productName = '', callback?: (products: Product[]) => void): any {

    if (!productName.trim()) {

      if (callback) {
        callback(products);
      }

      return products;
    }

    const result = products.filter((product) => {
      return product.title.toLowerCase().includes(productName.toLowerCase());
    });

    if (callback) {
      callback(result);
    }

    return result;
  }
}
