import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { buynow, cart, product } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { faThumbTack } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../environment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  // fname:string="";
  loginUser:string|null=null;

  productData:undefined|product;
  productQuantity:number=1;
  removeCart=false;
  cartData:product|undefined;

  userName:string="";

  modalTitle="";
  personalDetails: any = [];
  personId = environment.numberZero;
  name:string="";
  dateOfBirth="";
  email="";
  gender="";
 address="";
 mobileNo="";
identityProof=environment.identityProof;
photoPath = environment.PHOTO_URL;


  constructor(private activeRoute:ActivatedRoute,private router: Router ,private product:ProductService,private http:HttpClient,private user:UserService) {
    // this.fname = user.name;
  }
  ngOnInit(): void {

    let productId=this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((result)=>{
      this.productData=result;

       let cartData = localStorage.getItem(environment.localcart);
       if(productId && cartData)
       {
         let items= JSON.parse(cartData);
         items = items.filter((item:product)=>productId== item.id.toString())
         if(items.length)
         {

          this.removeCart=true;
        }else{
          this.removeCart=false;
         }
       }
       let user =localStorage.getItem(environment.user);
       if(user){

        let userId= user && JSON.parse(user).id
        this.product.getCartList(userId);

        this.product.cartData.subscribe((result)=>{
          let item = result.filter((item:product)=>productId?.toString()===item.productId?.toString())
             if(item.length){
              this.cartData=item[0];
              this.removeCart=true
             }
        })
       }
      //  localStorage.setItem("total amount" ,this.productData.price.toString());

    })
  }

  checkOut(){
    this.router.navigate(['checkout'])
    this.refreshList();
  }

  handleQuantity(value:string){
   if(this.productQuantity<20 && value==='plus'){
    this.productQuantity+=1;
   }else if(this.productQuantity>1 && value==='min'){
    this.productQuantity-=1;
   }
   }
   addToCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity;
      if(!localStorage.getItem(environment.user)){
        console.warn(this.productData);
        this.product.localAddToCart(this.productData);
        this.removeCart=false;
        this.router.navigate(['/login'])
      }else{

         let user =localStorage.getItem(environment.user);
         let userId= user && JSON.parse(user).id
         let cartData:cart={
          ...this.productData,
          userId,
          productId:this.productData.id,
        }
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result)=>{
          if(result){
            this.product.getCartList(userId);
            this.removeCart=true
          }
        })
      }
      }
     }

    buyNow(){
      if(this.productData){
        this.productData.quantity = this.productQuantity;
        if(!localStorage.getItem(environment.user)){
          console.warn(this.productData);
          this.product.localAddToCart(this.productData);
          this.removeCart=false;
          this.router.navigate(['/login'])
        }else{

           let user =localStorage.getItem(environment.user);
           let userId= user && JSON.parse(user).id
           let cartData:cart={
            ...this.productData,
            userId,
            productId:this.productData.id,
          }
          delete cartData.id;
          this.product.addToCart(cartData).subscribe((result)=>{
            if(result){
              this.product.getCartList(userId);
              this.removeCart=true
            }
          })
        }
        }
      var value = {
        name: this.name,
        dateOfBirth:this.dateOfBirth,
        email:this.email,
        gender:this.gender,
        address:this.address,
        mobileNo:this.mobileNo,
        identityProof: this.identityProof,
      };



      this.http.post(environment.API_URL + 'PersonalDetail', value)
        .subscribe(response => {

          this.router.navigate(['cart-page'])
          this.refreshList();
        });
      this.router.navigate(['cartpage'])
    }

    removeToCart(productId:number){
      if(!localStorage.getItem(environment.user)){
       console.warn("Not login")
        this.product.removeItemFromCart(productId);
      }else{
        let user =localStorage.getItem(environment.user);
        let userId= user && JSON.parse(user).id;
        console.warn("login")
       console.warn(this.cartData);
        this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result)=>{
         if(result) {    this.product.getCartList(userId);}
        })
        this.removeCart=false;
       }



      }


refreshList()
 {
   this.http.get<any>(environment.API_URL + 'PersonalDetail')
    .subscribe(data =>
    {
      this.personalDetails=data;
    });
 }
 addClick() {
  this.modalTitle = "Add details";
  this.personId = environment.numberZero;
  this.name = "";
  this.dateOfBirth = "";
  this.email = "";
  this.gender = "";
  this.address = "";
  this.mobileNo = "";
  this.identityProof = environment.identityProof;
}
editClick(personaldetail:any) {
  this.modalTitle = "edit details";
  this.personId=personaldetail.personId;
  this.name=personaldetail.name;
  this.dateOfBirth = personaldetail.dateOfBirth;
  this.email = personaldetail.email;
  this.gender = personaldetail.gender;
  this.address = personaldetail.address;
  this.mobileNo = personaldetail.mobileNo;
  this.identityProof = personaldetail.identityProof;
}

createClick() {
  var value = {
    name: this.name,
    dateOfBirth:this.dateOfBirth,
    email:this.email,
    gender:this.gender,
    address:this.address,
    mobileNo:this.mobileNo,
    identityProof: this.identityProof,
  };

  this.http.post(environment.API_URL + 'PersonalDetail', value)
    .subscribe(response => {
      alert(response.toString());

      // this.router.navigate(['checkout'])
      this.refreshList();
    });
}
updateClick() {
  var value = {
    personId:this.personId,
    name: this.name,
    dateOfBirth:this.dateOfBirth,
    email:this.email,
    gender:this.gender,
    address:this.address,
    mobileNo:this.mobileNo,
    identityProof: this.identityProof,


  };

  this.http.put(environment.API_URL + 'PersonalDetail', value)
    .subscribe(response => {
      alert(response.toString());
      this.refreshList();
    });
}

deleteClick(personId:any) {
  if(confirm("are you sure to delete?")){
  this.http.delete(environment.API_URL + 'PersonalDetail/' +personId)
    .subscribe(response => {
      alert(response.toString());
      this.refreshList();
    });
  }
}


imageUpload(event:any){
   var file=event.target.files[0];
   const formData:FormData= new FormData();

     formData.append('file',file,file.name);
   this.http.post(environment.API_URL + 'PersonalDetail/SaveFile',formData)
   .subscribe((data:any)=>
   {
    this.identityProof=data.toString();
   });


}
// url="data:image/png;base64,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";
//  onselectFile(event:any){
//   let fileType=event.target.files[0].type
//   if(fileType.match(/image\/*/)){
//     var reader = new FileReader();
//     const formData:FormData= new FormData();

//     formData.append('file',fileType,fileType.name);
//     this.http.post(environment.API_URL + 'PersonalDetail/SaveFile',formData)

//     reader.readAsDataURL(event.target.files[0]);
//     reader.onload=(eve:any)=>{
//         this.url=eve.target.result;
//     }


//   }
//   else{
//     window.alert('select image format correctly');
// }
//  }
    }


