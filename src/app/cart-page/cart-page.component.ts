/* tslint:disable:radix */
import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {Product} from '../shared/interfaces';
import {CartService} from '../shared/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit, AfterViewInit  {
  cartProducts: Product[] = [];
  totalPrice = 0;
  noCartProducts = false;

  constructor(
    private cartService: CartService,
    private elem: ElementRef
  ) {
  }

  ngOnInit(): void {
    if (this.cartService.getAll()) {
      this.cartProducts = this.cartService.getAll();
    } else {
      this.noCartProducts = true;
    }
  }

  ngAfterViewInit(): void {
    if (this.cartProducts) {
      this.calculatePrice();
    }
  }

  calculatePrice(): void {
    const pricesElements = document.querySelectorAll('.productPrice');
    const pricesArr = [];

    for (let i = 0; i < pricesElements.length; i++) {
      pricesArr.push(parseInt(pricesElements[i].textContent));
    }

    this.totalPrice = pricesArr.reduce((sum, current) => sum + current, 0);
  }

  deletedProduct($event): void {

    $event.deletedElement.nativeElement.remove();
    this.cartService.removeProductFromCart($event.deletedProduct);
    this.cartProducts = this.cartService.getAll();
    setTimeout(() => {
      this.calculatePrice();
    }, 1);

    if(!this.cartProducts.length) {
      this.noCartProducts = true;
    }

  }
}
