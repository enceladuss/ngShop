import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../shared/product.service';
import {CartService} from '../shared/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product;

  constructor(private productService: ProductService,
              private cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  addToCart(product) {
    this.cartService.addProductToCart(product);
    // TODO: refactor modal logic to more efficient angular approach
    document.querySelector('.added-to-cart-bg').classList.add('active');
    document.querySelector('.added-to-cart-modal').classList.add('active');
  }
}
