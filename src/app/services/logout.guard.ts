import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Injectable({
    providedIn: 'root'
})
export class LogoutGuard implements CanActivate {

    constructor(private router: Router, private afAuth: AngularFireAuth, private authService: AuthService) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return new Promise((resolve, reject) => {
            if (this.authService.userLoggedIn === false) {
                resolve(true);
            } else {

                this.router.navigate(['/product/list']);
                resolve(false);

            }
        });
    }

}
