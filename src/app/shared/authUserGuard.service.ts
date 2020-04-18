import { AuthService } from './../admin/shared/services/auth.service';
import { AppRoutingModule } from './../app-routing.module';
import { AppModule } from './../app.module';
import { AuthUserService } from 'src/app/shared/authUser.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({providedIn:'root'})
export class AuthUserGuard implements CanActivate {
    constructor(private authUser: AuthUserService, private router: Router,
       private auth:AuthService) { }

    canActivate(
        route: import("@angular/router").ActivatedRouteSnapshot,
        state: import("@angular/router").RouterStateSnapshot
    ): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        
        if (this.auth.isAuthenticated()) {
            return true;
        }
        else {
            this.auth.logout();
            this.router.navigate(['loginUser'],
                {
                    queryParams:
                    {
                        loginUserAgain: true
                    }
                })
        }
    }

}