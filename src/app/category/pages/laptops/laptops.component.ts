import {Component, OnInit} from '@angular/core';
import {Product} from '../../../shared/interfaces';
import {CategoryService} from '../../services/category.service';

@Component({
  selector: 'app-laptops',
  templateUrl: './laptops.component.html',
  styleUrls: ['./laptops.component.scss']
})
export class LaptopsComponent implements OnInit {

  products: Product[] = [];
  productName: string;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getProducts('laptops').subscribe(products => {
      this.products = products;
      console.log(products);
    });
  }

}
