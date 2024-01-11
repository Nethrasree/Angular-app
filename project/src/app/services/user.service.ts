import { EventEmitter, Injectable } from '@angular/core';
import { login, signup } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  title: string|undefined;
  isOfferValid: boolean | undefined;

  days : any|undefined;
  hours: number | undefined;
  mins: number | undefined;
  secs: number | undefined;
  applyOffer:false|boolean|undefined;

localhost = environment.localhost;

  name: string ='';
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  Message: string|undefined;
 setFirstname(value:string){
  this.name = value;
}
isLoginError= new EventEmitter<boolean>(false)

  invalidUserAuth= new EventEmitter<boolean>(false)


constructor(private http:HttpClient,private router:Router) { }
userSignUp(user:signup){
console.warn(user);
this.http.post(environment.localhost+'/users',user,{observe:'response'})
.subscribe((result)=>{
  console.warn(result);
  if(result){
    localStorage.setItem('user',JSON.stringify(result.body))
    // this.router.navigate(['/home'])
    this.userAuthReload();
  }
})
}


  userLogin(data:login){

  this.http.get<signup[]>(`${environment.localhost}/users?email=${data.email}&password=${data.password}`,
  {observe:'response'})
  .subscribe((result)=>{
    if(result && result.body?.length){
      localStorage.setItem('user',JSON.stringify(result.body[0]));
      this.isUserLoggedIn.next(true)
    this.router.navigate(['/']);
    this.invalidUserAuth.emit(false)
    }
    else{
       this.isLoginError.emit(true)
        this.invalidUserAuth.emit(true)
    }
  })
}
 adminLogin(data:login){
  this.http.get<signup[]>(`${environment.localhost}/admin?email=${data.email}&password=${data.password}`,
  { observe: 'response' })
  .subscribe((result:any) =>{
    console.warn(result)
    if(result && result.body && result.body.length){
      this.isLoginError.emit(false)
      console.warn("Admin login done");
      this.Message="Admin logged in"

      this.isUserLoggedIn.next(true)
      localStorage.setItem('admin',JSON.stringify(result.body))
      this.router.navigate(['viewproducts'])
      this.invalidUserAuth.emit(false)
    }
    else{
      this.isLoginError.emit(true)
      console.warn("login failed");
      this.invalidUserAuth.emit(true)
    }
  })
}

userAuthReload(){
  if(localStorage.getItem('user'))
  {
    this.router.navigate(['/']);
  }
}

storeToken(tokenValue:string){
  localStorage.setItem('token',tokenValue)
}
getToken(){
  localStorage.getItem('token')
}
isLoggedIn(){
  return !!localStorage.getItem('token')
}




}
