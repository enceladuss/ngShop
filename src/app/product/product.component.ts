import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../shared/product.service';
import {CartService} from '../shared/cart.service';
import {CartAddedModalComponent} from '../shared/cart-added-modal/cart-added-modal.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product;

  constructor(private productService: ProductService,
              private cartService: CartService
  ) {
  }

  ngOnInit(): void {
  }

  addToCart(product): void {
    this.cartService.addProductToCart(product);
    const firstComp = new CartAddedModalComponent();
    firstComp.openModal();
  }
}
