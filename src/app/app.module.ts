import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainLayoutComponent} from './shared/main-layout/main-layout.component';
import {CartPageComponent} from './cart-page/cart-page.component';
import {MainPageComponent} from './main-page/main-page.component';
import {ProductPageComponent} from './product-page/product-page.component';
import {NotFoundPageComponent} from './not-found-page/not-found-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {QuillModule} from 'ngx-quill';
import {AuthInterceptor} from './shared/auth.interceptor';
import {CategoryPageComponent} from './category-page/category-page.component';
import {ProductSearchPipe} from './shared/productSearch.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CartProductComponent} from './cart-product/cart-product.component';
import {CheckoutPageComponent} from './checkout-page/checkout-page.component';
import {OrderGratitudeComponent} from './order-gratitude/order-gratitude.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatCarouselModule} from '@ngmodule/material-carousel';
import {MainHeaderModule} from './shared/main-header/main-header.module';
import {MainFooterModule} from './shared/main-footer/main-footer.module';
import {ProductModule} from './product/product.module';
import {LoaderModule} from './shared/loader/loader.module';
import {CartAddedModalModule} from './shared/cart-added-modal/cart-added-modal.module';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    CartPageComponent,
    MainPageComponent,
    ProductPageComponent,
    NotFoundPageComponent,
    CategoryPageComponent,
    ProductSearchPipe,
    CartProductComponent,
    CheckoutPageComponent,
    OrderGratitudeComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        QuillModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatCarouselModule.forRoot(),
        MainHeaderModule,
        MainFooterModule,
        ProductModule,
        LoaderModule,
        CartAddedModalModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptor
    }
  ],
  exports: [
    ProductSearchPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
