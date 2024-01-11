import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { environment } from '../environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string = environment.default;
  name:string="";
  userName:string="";
  searchResult:undefined|product[];
  cartItems=environment.numberZero;
  constructor(private route: Router ,private product:ProductService) {}

  ngOnInit(): void {

this.route.events.subscribe((value:any)=>{
  if(value.url){
    if(localStorage.getItem(environment.admin) || value.url.includes('seller')){
    this.menuType = environment.admin;
    if(localStorage.getItem(environment.admin)){
      let sellerStore = localStorage.getItem(environment.admin);
      let sellerData = sellerStore && JSON.parse(sellerStore)[0];
      this.name=sellerData.name;
    }
  }
  else if(localStorage.getItem(environment.user)){
    let userStore = localStorage.getItem(environment.user);
    let userData  = userStore && JSON.parse(userStore);
   this.userName = userData.name;
   this.menuType = environment.user;
   this.product.getCartList(userData.id)
  }
  else{
    // console.warn("outside seller")
    this.menuType = environment.default;
  }
  }
});
let cartData = localStorage.getItem(environment.localcart);
if(cartData){
  this.cartItems= JSON.parse(cartData).length
}
 this.product.cartData.subscribe((items)=>{
  this.cartItems=items.length
})
  }
  logout(){
    localStorage.removeItem(environment.admin);
    this.route.navigate(['/']);
  }

  userLogout(){
    localStorage.removeItem(environment.user);
    localStorage.clear();
    this.route.navigate(['/']);
    this.product.cartData.emit([]);
  }

  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result)=>{
        if(result.length>environment.numberfive)
        {result.length=environment.numberfive}
        this.searchResult=result;
      })
    }
  }
  hideSearch(){
    this.searchResult=undefined
  }

  redirectToDetails(id:number)
  {
    this.route.navigate(['/details/'+id]);
  }

  submitSearch(value:string){
   console.warn(value)
   this.route.navigate([`search/${value}`])
  }

}
