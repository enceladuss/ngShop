import {Injectable} from '@angular/core';
import {Product} from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartProducts: Product[] = JSON.parse(localStorage.getItem('cartProducts')) || [];

  constructor() {
  }

  getAll(): Product[] {
    if (JSON.parse(localStorage.getItem('cartProducts'))) {
      return JSON.parse(localStorage.getItem('cartProducts'));
    } else {
      return null;
    }
  }

  addProductToCart(product): void {
    console.log(JSON.parse(localStorage.getItem('cartProducts')));

    if (JSON.parse(localStorage.getItem('cartProducts'))) {

      this.cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
      const duplicatedProduct = this.cartProducts.find(item => item.id === product.id);

      if (duplicatedProduct) {

        this.cartProducts = this.cartProducts.map(item => {

          if (item.id === duplicatedProduct.id) {

            return {
              ...item,
              quantity: parseInt(item.quantity) + 1 || 2
            };

          } else {
            return item;
          }
        });
      } else {
        this.cartProducts.push(product);
      }

      localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));

    } else {

      this.cartProducts.push(product);
      localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));

    }
  }

  removeProductFromCart(deletedProduct): void {
    console.log(JSON.parse(localStorage.getItem('cartProducts')));
    if (JSON.parse(localStorage.getItem('cartProducts'))) {
      this.cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
      this.cartProducts = this.cartProducts.filter(product => product.id !== deletedProduct.id);
      console.log(this.cartProducts);
      localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
    } else {
      console.log('No products in cart');
    }
  }

  cartProductQuantityChange(product, newQuantity): void {
    if (JSON.parse(localStorage.getItem('cartProducts'))) {
      this.cartProducts = this.cartProducts.map(item => {

        if (item.id === product.id) {

          return {
            ...item,
            quantity: newQuantity || 1
          };

        } else {
          return item;
        }
      });
      localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
    } else {
      console.log('No products in cart');
    }
  }
}
