import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { TokenEnum } from '../common/app.constants';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isToken = this.authService.getToken(TokenEnum.ACCESS_TOKEN);
    if (!isToken) {
      this.router.navigate(['/auth/login']);
    }

    return true;
  }
}
