import { Component, OnInit } from '@angular/core';
import { cart, login, product, signup } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
  styles:[`input.ng-invalid{border-left:4px solid red;}
           input.ng-valid{border-right:5px solid green;}`]
})
export class UserAuthComponent implements OnInit {
   showLogin:boolean=true;
   authError:string="";
   Message: string|undefined;

   login:FormGroup|any;
   signup:FormGroup|any;
   userSignUp:any;
   model:any = {

    name:'',
password:'',
   email:''
}

  constructor(private user:UserService,private product:ProductService,private http:HttpClient,private router:Router) { }

  ngOnInit():void {
    this.login = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email,Validators.pattern('[a-z][a-z0-9._%+-]+@[a-z.-]+([\.])[a-z]{2,4}$')]),
      'password': new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,}$')])
    });

    this.signup = new FormGroup(
      {
        'name': new FormControl('',[Validators.required, Validators.pattern('^(?=.{3,}$)[A-Z][a-zA-Z]+$')]),
        'email': new FormControl('', [Validators.required, Validators.email,Validators.pattern('[a-z][a-z0-9._%+-]+@[a-z.-]+([\.])[a-z]{2,4}$')]),
        'password': new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,}$')])
        }
    )
    this.user.userAuthReload();
  }
  signUp(data: signup) {
    this.user.userSignUp(data)
    console.warn(data);
  }

private baseUrl:string = "https://localhost:7266/api/User/"



  logindata(login: FormGroup) {
    console.log(this.login.value);

    this.http.get<any>("http://localhost:3000/signup").subscribe(res => {

       const user = res.find((a: any) => {
        this.authError="user logged in"
        return a.name===this.login.value.name&& a.email === this.login.value.email && a.password === this.login.value.password;
      });
      this.http.get<any>("http://localhost:3000/admin").subscribe(res => {
          const adminuser = res.find((a: any) => {
            alert("admin logged in")
               return   a.email === this.login.value.email && a.password === this.login.value.password;

          });
        if (user) {
          this.user.setFirstname(this.login.value.name);
          this.login.reset();
          this.router.navigate(['/dashboard']);
       }
       else if (adminuser) {
        this.login.reset();
        this.router.navigate(['seller-add-product']);
      }
      else {
        alert('user not found');
        this.router.navigate(['login']);
      }
    });
  })
  }
  logins(data:login):void{
    this.user.userLogin(data)
     { this.user.isLoginError.subscribe((result: any)=>
      {
        if(result){this.authError="email or password invalid"}
      })}


      this.user.adminLogin(data)
      { this.user.isLoginError.subscribe((result)=>
        {

          if(result){this.authError="email or password invalid"}
       })}

      }
  openlogin()
  {
    this.showLogin=true;
  }
  openSignUp(){
    this.showLogin=false;
  }
  localCartToRemoteCart(){
   let data = localStorage.getItem('localCart');
   let user = localStorage.getItem('user');
   let userId= user && JSON.parse(user).id;
   if(data){
    let cartDataList:product[]= JSON.parse(data);


    cartDataList.forEach((product:product,index) => {
     let cartData :cart={
      ...product,
      productId: product.id,
      userId,
     };
     delete cartData.id;
     setTimeout(() => {
      this.product.addToCart(cartData).subscribe((result)=>
     {
      if(result){
        console.warn("stored in DB");
      }
     })
    }, 500);
     if(cartDataList.length===index+1){
          localStorage.removeItem('localCart')
     }
    });
   }
   setTimeout(() => {
    this.product.getCartList(userId);
   }, 2000);
  }
}
