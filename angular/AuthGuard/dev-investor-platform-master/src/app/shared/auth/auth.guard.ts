import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    excludingUrls: Array<string>;

    constructor(private authService: AuthService, private router: Router) {
        this.excludingUrls = [
            '/welcome',
            '/reset-password/',
            '/forgot-password'
        ];
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (state.url.includes('/reset-password/')) {
            return true;
        }
        if (this.excludingUrls.indexOf(state.url) > -1) {
            if (this.authService.isAuthenticated()) {
                this.router.navigate(['/dashboard']);
                return false;
            } else {
                return true;
            }
        } else {
            if (this.authService.isAuthenticated()) {
                return true;
            } else {
                this.router.navigate(['/welcome']);
                return false;
            }
        }
    }
}
