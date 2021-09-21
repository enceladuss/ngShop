import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../shared/product.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {


  products = [];
  pSub: Subscription;
  rSub: Subscription;
  productName: string;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.pSub = this.productService.getAll().subscribe(products => {
      this.products = products;
    });
  }

  remove(id) {
    this.rSub = this.productService.remove(id).subscribe( () => {
      this.products = this.products.filter( product => product.id !== id);
    });
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }

    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }
}
