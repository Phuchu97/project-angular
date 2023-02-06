import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TokenEnum } from '../common/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const authorized = this.authService.getToken(TokenEnum.ACCESS_TOKEN);

      if (authorized) {
        return Promise.resolve(true);
      } else {
        this.authService.redirectUrl = state.url;
        this.router.navigate(['/auth/login']);

        return Promise.resolve(false);
      }
  }

}
