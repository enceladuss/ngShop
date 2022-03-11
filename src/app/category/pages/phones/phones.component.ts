import {Component, OnInit} from '@angular/core';
import {Product} from '../../../shared/interfaces';
import {CategoryService} from '../../services/category.service';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.scss']
})
export class PhonesComponent implements OnInit {

  products: Product[] = [];
  productName: string;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {

  }

}
