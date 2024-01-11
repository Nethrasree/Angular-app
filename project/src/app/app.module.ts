import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { PaymentDetailComponent } from './PaymentDetail/PaymentDetail.component';
import { ListfeedbackComponent } from './listfeedback/listfeedback.component';
import { PersonaldetailComponent } from './personaldetail/personaldetail.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { PercentagePipe } from './pipe/percentage.pipe';
import { AddproductComponent } from './addproduct/addproduct.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { ViewproductsComponent } from './viewproducts/viewproducts.component';

@NgModule({
  declarations: [
      AppComponent,
      HeaderComponent,
      HomeComponent,
      SellerHomeComponent,

      SellerUpdateProductComponent,
      SearchComponent,
      ProductDetailsComponent,
      UserAuthComponent,
      CartPageComponent,
      CheckoutComponent,
      MyOrdersComponent,
      PaymentDetailComponent,
      ListfeedbackComponent,
      PersonaldetailComponent,
      LoginComponent,
      FooterComponent,
      PercentagePipe,
      AddproductComponent,
      UpdateproductComponent,
      ViewproductsComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
