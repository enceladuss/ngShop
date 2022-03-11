import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../shared/interfaces';
import {CategoryService} from '../../services/category.service';

@Component({
  selector: 'app-category-filter-result',
  templateUrl: './category-filter-result.component.html',
  styleUrls: ['./category-filter-result.component.scss']
})
export class CategoryFilterResultComponent implements OnInit {

  loading = true;
  noProducts = false;
  products: Product[] = [];
  errorMessage = { title: '', text: 'There are no products in this category right now.' };
  @Input() productName;
  @Input() categoryName;
  @Output() onProducts: EventEmitter<Product[]> = new EventEmitter();

  // products: Product[] = [];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {

    this.categoryService.getProducts(this.categoryName).subscribe(products => {
      this.loading = false;


      if (!products || !products.length) {
        this.noProducts = true;
        this.errorMessage = { title: '', text: 'There are no products in this category right now.' };
        return;
      }

      this.products = products.sort((a, b) => a.sold > b.sold ? 1 : -1);
      this.onProducts.emit(this.products);
      this.errorMessage = { title: 'No products was found.', text: 'Try to change your search query' };
    });

  }

}
