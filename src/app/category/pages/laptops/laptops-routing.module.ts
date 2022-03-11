import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LaptopsComponent} from './laptops.component';

const routes: Routes = [
  {path: '', component: LaptopsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LaptopsRoutingModule {
}
