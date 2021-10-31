import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../shared/product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {

  products = [];
  category;
  noProducts = false;
  productName: string;
  loading = true;
  @ViewChild('loader') loader: ElementRef;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.category = this.route.snapshot.paramMap.get('id');
      if (this.category === 'phones' || this.category === 'tablets' || this.category === 'laptops') {
        return;
      } else {
        this.router.navigate(['/404']);
      }
    });

    this.productService.getAll()
      .subscribe(data => {

        this.loading = false;

        if (!data || !data.length) {
          this.noProducts = true;
          return;
        }

        this.products = data.filter((item) => {
          return item.type.toLowerCase() + 's' === this.category;
        });

        if (!this.products.length) {
          this.noProducts = true;
          return;
        }

        // Sort products by sold number by default
        this.products = this.products.sort((a, b) => a.sold > b.sold ? 1 : -1);
      });
  }

  removeLoader(timeout): void {
    setTimeout(() => {
      this.loader.nativeElement.classList.remove('active-loader');
    }, timeout);
  }

  selectChange(value: any): void {
    this.loader.nativeElement.classList.add('active-loader');
    switch (value) {
      case 'popular':
        this.products = this.products.sort((a, b) => +a.sold > +b.sold ? 1 : -1);
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
    this.removeLoader(550);
  }

}
