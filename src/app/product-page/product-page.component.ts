import {Component, OnInit} from '@angular/core';
import {ProductService} from '../shared/product.service';
import {ActivatedRoute} from '@angular/router';
import {CartService} from '../shared/cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  product;
  noProduct = false;
  productId;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    // TODO: ASK ABOUT CORRECT WAY OF GETTING URL ID

    // this.route.params.pipe(switchMap((params) => {
    //   this.productId = params['id'];
    //   return params['id'];
    // }));

    this.route.paramMap.subscribe(() => {
      this.productId = this.route.snapshot.paramMap.get('id');
    });

    this.productService.getById(this.productId).subscribe((product) => {
      if (!product) {
        this.noProduct = true;
        return;
      }
      this.product = product;
    }, error => {
      this.noProduct = true;
      console.error(error);
    });

  }

  addToCart(product) {
    this.cartService.addProductToCart(product);

    // TODO: refactor modal logic to more efficient angular approach

    document.querySelector('.added-to-cart-bg').classList.add('active');
    document.querySelector('.added-to-cart-modal').classList.add('active');
  }
}
