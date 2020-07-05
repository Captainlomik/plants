import { Router } from '@angular/router';
import { Admin, FbAuthResponse, User } from './../../../shared/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators'



@Injectable({ providedIn: 'root' })
export class AuthService {
  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) { }

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }


  login(admin: Admin): Observable<any> {
    admin.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, admin)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this)))
  }

  registration(reguser: User): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, reguser)
  }

  logout() {
    this.setToken(null)

  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private handleError(err: HttpErrorResponse, router: Router) {
    const { message } = err.error.error;
    console.log(message);

    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('email не найден')
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Неверный email')
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль')
        break;
    }
    window.location.reload(false); //перезагрузка страницы из кэша
    return throwError(err);
  }

  private setToken(response: FbAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    }
    else {
      localStorage.clear();
    }
  }
}
