import {Injectable} from '@angular/core';
import {FbResponse, Product} from './interfaces';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartProducts: Product[] = JSON.parse(localStorage.getItem('cartProducts')) || [];
  cartProductQuantity = 0;

  constructor(public http: HttpClient) {
  }

  private componentMethodCallSource = new Subject<any>();

  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  updateCartProductQuantity(): void {
    const quantityArr = [];
    for (let i = 0; i < this.cartProducts.length; i++) {
      if (parseInt(this.cartProducts[i].quantity)) {
        quantityArr.push(parseInt(this.cartProducts[i].quantity));
      } else {
        quantityArr.push(1);
      }
    }

    this.cartProductQuantity = quantityArr.reduce((sum, current) => sum + current, 0);
    this.componentMethodCallSource.next(this.cartProductQuantity);
  }

  getAll(): Product[] {
    if (JSON.parse(localStorage.getItem('cartProducts'))) {
      return JSON.parse(localStorage.getItem('cartProducts'));
    } else {
      return null;
    }

    this.updateCartProductQuantity();
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

    this.updateCartProductQuantity();
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

    this.updateCartProductQuantity();
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

    this.updateCartProductQuantity();
  }

  createOrder(order) {
    return this.http.post(`${environment.fbDbUrl}/orders.json`, order).pipe(map((res: FbResponse) => {
        return {
          ...order,
          id: res.name,
          date: new Date(order.date)
        };
      })
    );
  }
}
