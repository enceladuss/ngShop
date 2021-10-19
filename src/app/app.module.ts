import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {QuillModule} from 'ngx-quill';
import {AuthInterceptor} from './shared/auth.interceptor';
import { ProductComponent } from './product/product.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { ProductSearchPipe } from './shared/productSearch.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CartProductComponent } from './cart-product/cart-product.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { OrderGratitudeComponent } from './order-gratitude/order-gratitude.component';

@NgModule({
    declarations: [
        AppComponent,
        MainLayoutComponent,
        CartPageComponent,
        MainPageComponent,
        ProductPageComponent,
        NotFoundPageComponent,
        ProductComponent,
        CategoryPageComponent,
        ProductSearchPipe,
        CartProductComponent,
        CheckoutPageComponent,
        OrderGratitudeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        QuillModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: AuthInterceptor
        }
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
