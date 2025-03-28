import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';
import {inject}                                                     from '@angular/core';
import {AuthService}                                                from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    const authService = inject(AuthService);
    console.log('==> <==', {next, state}, authService.getIsLoggedIn(), authService.decodeJwt(),
                authService.validateJwt());
    return authService.getIsLoggedIn();
};