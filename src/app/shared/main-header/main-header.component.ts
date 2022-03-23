import { Component, OnInit } from '@angular/core';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  cartProductsQuantity = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {

    setTimeout(() => {
      this.cartService.updateCartProductQuantity();
    }, 1);
    this.cartService.updateCartProductQuantity();

    this.cartService.componentMethodCalled$.subscribe((cartProductsQuantity) => {
      this.cartProductsQuantity = cartProductsQuantity;
    });
  }

}
