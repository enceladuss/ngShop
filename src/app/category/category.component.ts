import {Component} from '@angular/core';

@Component({
  selector: 'app-category',
  template: `
    <app-main-layout-wrap>
      <router-outlet></router-outlet>
    </app-main-layout-wrap>
  `,
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

}
