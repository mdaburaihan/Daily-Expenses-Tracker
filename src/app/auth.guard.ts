import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {

  constructor(
    private AuthService: AuthService,
    private router: Router
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.AuthService.getAuthorizationToken()){
      return true;   
    }
    return this.router.createUrlTree(['/login'])
      // return this.AuthService.user.pipe(
      //   take(1),
      //   map(user => {
      //     console.log("user-->", user)
      //     if(user){
      //       return true;     
      //     }
      //     return this.router.createUrlTree(['/login'])
      //   })
      // )
    }
}
