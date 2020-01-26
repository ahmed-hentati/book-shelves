import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {



  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean 
  | Promise<boolean | UrlTree> 
  | Observable<boolean | UrlTree>
  | UrlTree {
    return this.authService.user.pipe(
     take(1), // subsribe to the first value and then unsubscribe:
     map(user => { 
      const isAuth = !!user // !! convert truesh to boolean true, and falsech like undefined, null to false   
      if (isAuth) { 
        return true
      }
      return this.router.createUrlTree(['/auth/signin']);
    }));    
  }
  constructor(private authService: AuthService, private router : Router) { }
}
