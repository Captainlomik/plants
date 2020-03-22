import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) { }

    canActivate(
        route: import("@angular/router").ActivatedRouteSnapshot,
        state: import("@angular/router").RouterStateSnapshot
    ): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        if (this.auth.isAuthenticated()) {
            return true
        }
        else {
            this.auth.logout();
            this.router.navigate(['/admin', 'login'],
                {
                    queryParams:
                    {
                        loginAgain: true
                    }
                })
        }
    }

}