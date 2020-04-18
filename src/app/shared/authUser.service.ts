import { environment } from './../../environments/environment.prod';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User,  FbUserAuth } from './interfaces';
import { tap, catchError } from 'rxjs/operators';



@Injectable({providedIn:'root'})
export class AuthUserService {

    public $error: Subject<string> = new Subject;
    constructor(private http: HttpClient) { }
    currentUserValue() { }

    /*get tokenn():string{
        const expDate = new Date(localStorage.getItem('fb-user-token-date'))
        if (new Date() > expDate) {
            console.log('LOOOL')
            return null;
        }
        return localStorage.getItem('fb-user-token')
    }



   /* login(user: User): Observable<any> {
        user.returnSecureToken = true;
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
            .pipe(
                tap(this.setToken),
                catchError(this.handlerror.bind(this))
            )
    }

    registration(reguser: User): Observable<any> {
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, reguser)
    }


    logout() {
        this.setToken(null);
    }

    isAuthecate(): boolean {
        console.log(!!this.tokenn);
        return !!this.tokenn
    }


    private handlerror(error: HttpErrorResponse, router: Router) {
        const { message } = error.error.error;
        switch (message) {
            case 'EMAIL_NOT_FOUND':
                this.$error.next('Email не найден')
                break;
            case 'INVALID_EMAIL':
                this.$error.next('email не верен');
                break;
            case 'INVALID_PASSWORD':
                this.$error.next('пароль не верен');
                break;
        }
        window.location.reload(false);
        return throwError(error);
    }

    private setToken(response: FbUserAuth | null) {
        if (response) {
            console.log(response);
            const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
            localStorage.setItem('fb-user-token', response.idToken);
            localStorage.setItem('fb-user-token-date,', expDate.toString());
        }
        else { localStorage.clear(); }

    }*/
}