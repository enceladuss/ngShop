import { Component, OnInit } from '@angular/core';
import {Product} from '../../../shared/interfaces';

@Component({
  selector: 'app-tablets',
  templateUrl: './tablets.component.html',
  styleUrls: ['./tablets.component.scss']
})
export class TabletsComponent {
  products: Product[] = [];
  productName: string;
}
