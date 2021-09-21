import {Component, OnInit} from '@angular/core';
import {ProductService} from '../shared/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {

  products;
  category;
  noProducts = false;
  productName: string;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.category = this.route.snapshot.paramMap.get('id');
    });

    this.productService.getAll()
      .subscribe(data => {
        if (!data || !data.length) {
          this.noProducts = true;
          return;
        }
        this.products = data.filter((item) => {
          return item.type.toLowerCase() + 's' === this.category;
        });

        // Sort products by sold number by default
        this.products = this.products.sort((a, b) => a.sold > b.sold ? -1 : 1);

        if (!this.products.length) {
          this.noProducts = true;
          return;
        }
      });
  }

  selectChange(value: any): void {
    switch (value) {
      case 'popular':
        this.products = this.products.sort((a, b) => a.sold > b.sold ? -1 : 1);
        break;
      case 'newest':
        this.products = this.products.sort((a, b) => new Date(a.date) > new Date(b.date) ? -1 : 1);
        break;
      case 'lowPrice':
        this.products = this.products.sort((a, b) => +a.price > +b.price ? 1 : -1);
        break;
      case 'highPrice':
        this.products = this.products.sort((a, b) => +a.price > +b.price ? -1 : 1);
        break;
      default :
        console.log('Filter setting not found');
    }
  }
}
