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

    // TODO: refactor modal logic to more efficient angular approach

    const closeButtons = document.querySelectorAll('.close-modal');
    const modalBackgrounds = document.querySelectorAll('.modal-bg');
    const modalsElements = document.querySelectorAll('.modal');

    closeButtons.forEach(el => el.addEventListener('click', event => {
      modalBackgrounds.forEach(elem => {
        elem.classList.remove('active');
      });

      modalsElements.forEach(elem => {
        elem.classList.remove('active');
      });
    }));
  }

}
