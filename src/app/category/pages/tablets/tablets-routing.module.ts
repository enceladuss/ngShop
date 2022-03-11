import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabletsComponent} from './tablets.component';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  {path: '', component: TabletsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TabletsRoutingModule {
}
