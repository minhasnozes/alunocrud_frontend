import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
    if (this.authService.isLoggedIn()) {
      this.authService.refreshToken();

      return true;
    } else {
      this.authService.logout();
      this.router.navigate(['login']);
      return false; // redireciona para a página de login se o usuário não estiver logado
    }
  }
}
