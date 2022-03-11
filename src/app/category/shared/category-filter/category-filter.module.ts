import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFilterComponent } from './category-filter.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    CategoryFilterComponent
  ],
  exports: [
    CategoryFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CategoryFilterModule { }
