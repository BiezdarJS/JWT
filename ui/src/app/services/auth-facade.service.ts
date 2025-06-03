import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUserCredentials } from '../interfaces/user-credentials.interface';
import { Observable, tap } from 'rxjs';
import { ILoginResponse } from '../interfaces/login-reponse.interface';
import { HttpClient } from '@angular/common/http';
import { LoginFormFacade } from './login-form-facade.service';
import { LoaderStateEnum } from '../enums/loader-state';

@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService {
  private http = inject(HttpClient);
  private loginFormFacade = inject(LoginFormFacade);
  private router = inject(Router);

  public login(credentials: IUserCredentials): Observable<ILoginResponse> {
    this.loginFormFacade.loaderState.update(() => LoaderStateEnum.LOADING);
    return this.http
      .post<ILoginResponse>(
        'http://localhost/jwt/api/users/authenticate',
        JSON.stringify(credentials)
      )
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        })
      );
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
