import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';
import { PathsApi } from '../shared/config-urls';

export interface AuthResponseData {
  idToken: string;
  username: string;
  expiresIn: string;
  userId: string;
  role?:string
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(username: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        PathsApi.singup,
        {
          username: username,
          password: password,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          const payload :any  = JSON.parse(atob(resData.idToken.split('.')[1])) ;
          this.handleAuthentication(
            // resData.username,
            // resData.userId,
            // resData.idToken,
            // +resData.expiresIn
            payload.username,
            payload.id ,
            resData.idToken ,
            +payload.iat,
            +payload.exp
          );
        })
      );
  }

  login(username: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        PathsApi.login,
        {
          username: username,
          password: password,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          const payload :any  = JSON.parse(atob(resData.idToken.split('.')[1])) ;
          this.handleAuthentication(
            // resData.username,
            // resData.userId,
            // resData.idToken,
            // +resData.expiresIn
            payload.username,
            payload.id ,
            resData.idToken ,
            +payload.iat,
            +payload.exp
          );
        })
      );
  }

  autoLogin() {

    const userData: {
      username: string;
      userId: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.username,
      userData.userId,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {

      this.user.next(loadedUser);

      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    username: string,
    userId: string,
    token: string,
    expiresIn: number,
    expireAfter :number
  ) {
    // const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(username, userId, token, new Date(expireAfter*1000));
    this.user.next(user);
    // this.autoLogout(expiresIn * 1000);
    this.autoLogout((expireAfter - expiresIn)*1000) ;
    localStorage.setItem("userData", JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'USERNAME_EXISTS':
        errorMessage = 'Ce username existe deja';
        break;
      case 'USERNAME_NOT_FOUND':
        errorMessage = 'Ce username n existe pas' ;
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Le password correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
