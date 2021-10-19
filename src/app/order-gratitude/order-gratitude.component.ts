import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CartService} from '../shared/cart.service';

@Component({
  selector: 'app-order-gratitude',
  templateUrl: './order-gratitude.component.html',
  styleUrls: ['./order-gratitude.component.scss']
})
export class OrderGratitudeComponent implements OnInit {

  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  orderId;

  ngOnInit(): void {
      if (localStorage.getItem('recentOrderId')) {
        this.orderId = localStorage.getItem('recentOrderId');
      } else {
        this.router.navigate(['/']);
      }
  }

  ngOnDestroy(): void {
    this.cartService.clearCart();
  }
}
