import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../shared/product.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  products = [];
  noProducts = false;
  pSub: Subscription;
  rSub: Subscription;
  productName: string;

  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.pSub = this.productService.getAll().subscribe(products => {
      this.products = products;
      if (!this.products.length) {
        this.noProducts = true;
      }else {
        // this.products.sort();
        this.products = this.products.sort((a, b) => a.type.localeCompare(b.type));
      }
    });
  }

  remove(id): void {
    this.rSub = this.productService.remove(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
      if (!this.products.length) {
        this.noProducts = true;
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
