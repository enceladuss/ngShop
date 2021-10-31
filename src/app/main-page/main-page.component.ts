import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/product.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  products$;
  latestProducts;
  loading = true;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.productService.getAll();
    this.products$.subscribe(data => {
      this.latestProducts = data;
      this.latestProducts.sort((a, b) => b.date - a.date)
      this.latestProducts = this.latestProducts.slice(0, 4);

      this.loading = false;
    });
  }

}
