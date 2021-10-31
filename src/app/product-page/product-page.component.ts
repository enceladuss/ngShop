import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {ProductService} from '../shared/product.service';
import {ActivatedRoute} from '@angular/router';
import {CartService} from '../shared/cart.service';
import KeenSlider from 'keen-slider';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss', '../../../node_modules/keen-slider/keen-slider.min.css']
})
export class ProductPageComponent implements OnInit {
  @ViewChild('sliderRef') sliderRef: ElementRef<HTMLElement>;

  product;
  noProduct = false;
  productId;
  slider: any = null;
  loading = true;

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
      this.loading = false;
      if (!product) {
        this.noProduct = true;
        return;
      }

      this.product = product;
      setTimeout(() => {
        this.slider = new KeenSlider(this.sliderRef.nativeElement);
      }, 1);

    }, error => {
      this.noProduct = true;
      console.error(error);
    });
  }

  ngOnDestroy() {
    if (this.slider) {
      this.slider.destroy();
    }
  }

  addToCart(product) {
    this.cartService.addProductToCart(product);

    // TODO: refactor modal logic to more efficient angular approach

    document.querySelector('.added-to-cart-bg').classList.add('active');
    document.querySelector('.added-to-cart-modal').classList.add('active');
  }
}
