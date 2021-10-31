import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CartService} from '../../shared/cart.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {

  orders = [];
  noOrders;
  pSub: Subscription;
  rSub: Subscription;
  productName: string;

  constructor(
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.pSub = this.cartService.getAllOrders().subscribe(products => {
      this.orders = products;
      if (!this.orders) {
        this.noOrders = true;
      }
    });
  }

  remove(id): void {
    this.rSub = this.cartService.removeOrder(id).subscribe(() => {
      this.orders = this.orders.filter(product => product.id !== id);
      if (!this.orders) {
        this.noOrders = true;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }

    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }
}
