import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
// import { SellerService } from './services/seller.service';
import { UserService } from './services/user.service';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userservice:UserService,private router: Router ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem(environment.admin)){
        console.warn("logged in as admin")
       return true;
      }
    //   alert("login as admin")

    //  return false;
     alert("Login as admin to access this page");
    this.router.navigate(['/login']); // Replace '/login' with your actual login route path

    // Return UrlTree to indicate navigation to the login page
    return this.router.parseUrl('/login');

      // return this.userservice.isUserLoggedIn;
  }
}

