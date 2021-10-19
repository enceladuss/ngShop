import {Component, ComponentRef, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CartService} from '../shared/cart.service';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss']
})
export class CartProductComponent implements OnInit {

  @Input() product;
  @Output() calculatePrice: EventEmitter<any> = new EventEmitter();
  @Output() deleteProduct: EventEmitter<any> = new EventEmitter();
  @ViewChild('productELem') elem: ElementRef;
  quantity = 1;
  productBasePrice;


  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.productBasePrice = this.product.price;
    this.quantity = this.product.quantity || 1;
    this.quantityChange();
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  quantityChange(): void {

    if (this.quantity <= 1) {
      this.quantity = 1;
    }

    this.product.price = this.productBasePrice * this.quantity;

    setTimeout(() => {
      this.cartService.cartProductQuantityChange(this.product, this.quantity);
      this.calculatePrice.emit();
    }, 1);

  }

}
