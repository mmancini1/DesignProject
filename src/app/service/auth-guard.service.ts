import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
    CanActivate(){
          if (this.authService.isAuthenticated()) {
            // If they do, return true and allow the user to load app
            return true;
        }

        // If not, they redirect them to the login page
        this.router.navigate(['/anonymous']);
        return false;
    }


  // the Router call canActivate() method,
  // if canActivate is registered in Routes[]
  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
  //   // here we check if user is logged in or not
  //   // the authService returs user object, or
  //   // it returns undefined/null when user is not logged in
    
  //   // SINCE OUR 'authService.user' IS OF TYPE 'Observable'
  //   // WE MUST USE 'subscribe' TO GET VALUE OF 'user'
  //   return new Promise((resolve, reject) => {
  //     this.authService.user.subscribe((user) => {
  //       // here we check if user is logged in or not
  //       // the authService returs user object, or
  //       // it returns undefined/null when user is not logged in
  //       if (!user) {
  //         // just return false - if user is not logged in
  //         return resolve(false);
  //       } else {
  //         // just return true - if user is logged in
  //         return resolve(true);
  //       }
  //     });
  //   });
  // }
}