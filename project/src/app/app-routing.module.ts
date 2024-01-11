import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
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
import { AddproductComponent } from './addproduct/addproduct.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { ViewproductsComponent } from './viewproducts/viewproducts.component';

const routes: Routes = [
 {  path:'',component:HomeComponent },
 {  path:'seller-home',component:SellerHomeComponent,canActivate:[AuthGuard]},
 {  path:'viewproducts',component:ViewproductsComponent,canActivate:[AuthGuard]},

 {  path:'addproduct',component:AddproductComponent,canActivate:[AuthGuard]},
 {  path:'seller-update-product/:id',component:SellerUpdateProductComponent,canActivate:[AuthGuard]},
 {  path:'updateproduct/:id',component:UpdateproductComponent,canActivate:[AuthGuard]},
 {  path:'search/:query',component:SearchComponent },
 {  path:'details/:productId',component:ProductDetailsComponent },
 {  path:'user-auth',component:UserAuthComponent},
 {  path:'cart-page',component:CartPageComponent},
 {  path:'checkout',component:CheckoutComponent},
 {  path:'my-orders',component:MyOrdersComponent},
 { path:'PaymentDetail',component:PaymentDetailComponent},
 { path:'listfeedback',component:ListfeedbackComponent,canActivate:[AuthGuard]},
 { path:'personaldetail',component:PersonaldetailComponent},
 { path:'login',component:LoginComponent},
 { path:'footer',component:FooterComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
