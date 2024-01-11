import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';
import { Subject } from 'rxjs';
import products from 'razorpay/dist/types/products';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private buttonClickedSource = new Subject<boolean>();
  buttonClicked$ = this.buttonClickedSource.asObservable();

  buttonClicked(): void {
    this.buttonClickedSource.next(true);
  }

cartData= new EventEmitter<product[] | []>();
constructor(private http:HttpClient) { }


addProduct(data:product){
 return this.http.post(environment.localhost+'/products',data);
}
productList(){
  return this.http.get<product[]>(environment.localhost+'/products');
}
deleteProduct(id:number){

  return this.http.delete(`${environment.localhost}/products/${id}`);
}
getProduct(id:string)
{
  return this.http.get<product>(`${environment.localhost}/products/${id}`);
}
updateProduct(product:product){
  return this.http.put<product>(`${environment.localhost}/products/${product.id}`,product);
}
popularProducts(){
  return this.http.get<product[]>(environment.localhost+'/products?_limit=3');

}

trendyproducts(){
  return this.http.get<product[]>(environment.localhost+'/products?_limit=10');
}
searchProduct(query:string){
  return this.http.get<product[]>(environment.localhost+'/products?q=${query}');
}
localAddToCart(data:product){
  let cartData = [];
  let localCart = localStorage.getItem('localCart');
   if(!localCart)
   {
    localStorage.setItem('localCart',JSON.stringify([data]));
    this.cartData.emit([data]);
  }else{
    alert("login first");
     cartData=JSON.parse(localCart);

   }
  }

removeItemFromCart(productId:number) {
  let cartData=localStorage.getItem('localCart');
   if (cartData) {
     let items:product[]= JSON.parse(cartData);
     items = items.filter((item:product)=>productId!==item.id);
     console.warn(items);
     localStorage.setItem('localCart',JSON.stringify(items));
     this.cartData.emit(items);
   }
}

addToCart(cartData:cart){
  return this.http.post(environment.localhost+'/cart',cartData);

}
removeToCart(cartId:number) {
  return this.http.delete(environment.localhost+'/cart/'+cartId);
  }

 getCartList(userId: number) {
  return this.http.get<product[]>(environment.localhost+'/cart?userId='+userId,
  {observe: 'response'}).subscribe((result) => {
   console.warn(result);
    if(result && result.body){
    this.cartData.emit(result.body);
     }


     });
    }

    currentCart(){
      let userStore = localStorage.getItem('user');
      let userData  = userStore && JSON.parse(userStore);
      return this.http.get<cart[]>(environment.localhost+'/cart?userId='+userData.id)
      }
      orderNow(data:order)
      {
        return this.http.post(environment.localhost+'/orders',data)
      }
      orderList(){
        let userStore = localStorage.getItem('user');
        let userData  = userStore && JSON.parse(userStore);
        return this.http.get<order[]>(environment.localhost+'/orders?='+userData.id);
      }
      deleteCartitems(cartId:number)
      {
        return this.http.delete(environment.localhost+'/cart/'+cartId,{observe :'response'}).subscribe((result)=>
        {
          if(result)
        {
          this.cartData.emit([])
        }})

      }

      cancelOrder(orderId:number){
        return this.http.delete(environment.localhost+'/orders/'+orderId);
      }

}

