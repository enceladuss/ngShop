/* tslint:disable:radix */
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../shared/product.service';
import {Product} from '../shared/interfaces';
import {CartProductComponent} from '../cart-product/cart-product.component';
import {CartService} from '../shared/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartProducts: Product[] = [];
  totalPrice = 0;

  // quantityValue = 1;

  constructor(
    private cartService: CartService,
    private elem: ElementRef
  ) {
  }

  ngOnInit(): void {

    this.cartProducts = this.cartService.getAll();

  }

  // TODO: ASK ABOUT ERROR
  ngAfterViewInit(): void {
    this.calculatePrice();
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
    setTimeout(() => {
      this.calculatePrice();
    }, 1);

  }
}
