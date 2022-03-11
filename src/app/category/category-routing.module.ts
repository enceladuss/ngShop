import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryComponent} from './category.component';

const routes: Routes = [
  {
    path: '', component: CategoryComponent, children: [
      {path: '', redirectTo: 'phones'},
      {path: 'phones', loadChildren: () => import('./pages/phones/phones.module').then(m => m.PhonesModule)},
      {path: 'tablets', loadChildren: () => import('./pages/tablets/tablets.module').then(m => m.TabletsModule)},
      {path: 'laptops', loadChildren: () => import('./pages/laptops/laptops.module').then(m => m.LaptopsModule)},
      {path: '**', redirectTo: '/404'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class CategoryRoutingModule {
}
