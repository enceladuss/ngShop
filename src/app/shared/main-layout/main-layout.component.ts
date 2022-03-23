import {Component, OnInit} from '@angular/core';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

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
