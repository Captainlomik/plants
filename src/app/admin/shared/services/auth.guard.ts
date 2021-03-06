import { AdminModule } from './../../admin.module';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppModule } from 'src/app/app.module';



@Injectable({providedIn:'root'})
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