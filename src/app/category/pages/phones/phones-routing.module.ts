import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PhonesComponent} from './phones.component';

const routes: Routes = [
  {path: '', component: PhonesComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PhonesRoutingModule {
}
