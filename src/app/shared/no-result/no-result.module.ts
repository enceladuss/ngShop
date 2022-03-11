import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoResultComponent } from './no-result.component';



@NgModule({
    declarations: [
        NoResultComponent
    ],
    exports: [
        NoResultComponent
    ],
    imports: [
        CommonModule
    ]
})
export class NoResultModule { }
