import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../shared/interfaces';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit, AfterViewChecked {

  @Input() categoryName = '';
  @Input() products: Product[] = [];
  @Output() productName: EventEmitter<string> = new EventEmitter();

  constructor(private cdRef: ChangeDetectorRef   ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  // removeLoader(timeout): void {
  //   setTimeout(() => {
  //     this.loader.classList.remove('active-loader');
  //   }, timeout);
  // }

  selectChange(value: any): void {
    // this.loader.classList.add('active-loader');
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
    // this.removeLoader(550);
  }


}
