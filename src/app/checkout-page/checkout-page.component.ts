import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../shared/interfaces';
import {CartService} from '../shared/cart.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
  form: FormGroup;
  submitted: boolean;
  orderProducts: Product[] = [];
  pricesArr = [];
  quantityArr = [];
  productsQuantity = 0;
  totalPrice = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
    });

    if (this.cartService.getAll()) {
      this.orderProducts = this.cartService.getAll();

      setTimeout(() => {
        for (let i = 0; i < this.orderProducts.length; i++) {
          if (parseInt(this.orderProducts[i].quantity)) {
            this.quantityArr.push(parseInt(this.orderProducts[i].quantity));
          } else {
            this.quantityArr.push(1);
          }

          if (parseInt(this.orderProducts[i].price)) {
            this.pricesArr.push(parseInt(this.orderProducts[i].price) * parseInt(this.orderProducts[i].quantity) || 1);
          } else {
            this.pricesArr.push(1);
          }
        }

        this.productsQuantity = this.quantityArr.reduce((sum, current) => sum + current, 0);
        this.totalPrice = this.pricesArr.reduce((sum, current) => sum + current, 0);
      }, 1);

    } else {
      this.router.navigate(['/']);
    }

  }

  submit(): void {

    this.submitted = true;
    if (this.form.invalid) {
      this.submitted = false;
      return;
    }

    const order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      city: this.form.value.city,
      address: this.form.value.address,
      orderProducts: this.orderProducts,
      orderTotalPrice: this.totalPrice,
      date: new Date(),
    };

    this.cartService.createOrder(order)
      .subscribe((res) => {
        this.submitted = false;
        this.form.reset();
        this.router.navigate(['/order-gratitude']);
      });
  }
}
