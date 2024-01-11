import { Component, OnInit } from '@angular/core';
import { cart, login, product, signup } from '../data-type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  styles:[`input.ng-invalid{border-left:4px solid red;}
           input.ng-valid{border-right:5px solid green;}`]
})
export class LoginComponent implements OnInit {
  showLogin:boolean=true;
  authError:string="";
  message: string|undefined;

  password:any|undefined;
  show = false;

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  login:FormGroup|any;
  signUp:FormGroup|any;
  userSignUp:any;
  model:any = {

   name:'',
   password:'',
   email:'',
   address:''
}

 constructor(private user:UserService,private product:ProductService,private http:HttpClient,private router:Router) { }

 ngOnInit():void {

  this.password = 'password';

  this.login = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email,Validators.pattern('[a-z][a-z0-9._%+-]+@[a-z.-][a-z0-9]+([\.])[a-z]{2,4}$')]),
    'password': new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,}$')])
  });

   this.signUp = new FormGroup(
     {
       'name': new FormControl('',[Validators.required, Validators.pattern('^(?=.{3,}$)[A-Z][a-zA-Z]+$')]),
       'email': new FormControl('', [Validators.required, Validators.email,Validators.pattern('[a-z][a-z0-9._%+-]+@[a-z.-][a-z0-9]+([\.])[a-z]{2,4}$')]),
       'password': new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,}$')]),
       'address': new FormControl('',[Validators.required ]),

      }
   )
   this.user.userAuthReload();
 }
 signUpdata(data: signup) {
   this.user.userSignUp(data)

   this.router.navigate(['/']);
   console.warn(data);
 }


loginData(login: FormGroup) {
  console.log(this.login.value);
  this.http.get<any>(environment.localhost + 'users').subscribe(response => {
     const user = response.find((data: any) => {
      this.authError="user logged in"
      return  data.email === this.login.value.email && data.password === this.login.value.password;
    });

    this.http.get<any>(environment.localhost+'admin').subscribe(response => {
        const adminuser = response.find((any: any) => {
         this.authError="Admin logged in"
             return any.email === this.login.value.email && any.password === this.login.value.password;
        });

      if (user) {
       localStorage.setItem("loginuser" ,user.email);
        this.login.reset();
        this.router.navigate(['/']);
     }
     else if (adminuser) {
       localStorage.setItem("loginadminuser" ,adminuser.email);
      this.login.reset();
      this.router.navigate(['addproduct']);
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
    {
       this.user.isLoginError.subscribe((result: any)=>
     {
       if(result){

        this.authError="User not Found"}
     })
    }
     this.user.adminLogin(data)
     {
      this.user.isLoginError.subscribe((result)=>
       {
         if(result){this.authError="email or password invalid"}
      })
    }

     }


     hideShowPass() {
      this.isText = !this.isText;
      this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
      this.isText ? (this.type = 'text') : (this.type = 'password');
    }





 openLogin()
 {
   this.showLogin=true;
 }
 openSignUp(){
   this.showLogin=false;
 }
 localCartToRemoteCart(){
  let data = localStorage.getItem(environment.localcart);
  let user = localStorage.getItem(environment.user);
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

