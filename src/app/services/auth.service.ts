import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import { tap, shareReplay } from 'rxjs';
import { JWTPayload } from '../interfaces/jwt.payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiRoot = 'http://localhost:8000/auth/';

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    return this.http.post(
      this.apiRoot.concat('login/'),
      { username, password }
    ).pipe(
      tap(response => this.setSession(response)),
      shareReplay(),
    );
  }

  signup(username: string, email: string, password1: string, password2: string) {
    // TODO: implement signup
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  get token(): any {
    return localStorage.getItem('token');
  }

  private setSession(authResult: any) {
    const token = authResult.token;
    const payload = <JWTPayload>jwt_decode(token);
    const expiresAt = moment.unix(payload.exp);

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  getExpiration() {
    const expiration: any = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
  }

  refreshToken() {
    if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
      return this.http.post(
        this.apiRoot.concat('refresh-token/'),
        { token: this.token }
      ).pipe(
        tap(response => this.setSession(response)),
        shareReplay(),
      ).subscribe();
    }
    // Se a condição não for satisfeita, retorne null (ou undefined)
    return null;
  }


  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

}
