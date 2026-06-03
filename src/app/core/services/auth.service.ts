import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://13.207.191.252:3000';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  login(data: any) {
    return this.http.post<any>(`${this.baseUrl}/cus/login`, data).pipe(
      tap((response) => {
        console.log('========== LOGIN RESPONSE ==========');
        console.log(response);

        console.log('========== DATA OBJECT ==========');
        console.log(response.data);

        if (
          response &&
          response.data &&
          response.data.access_token &&
          response.data.refresh_token
        ) {
          this.tokenService.saveTokens(
            response.data.access_token,
            response.data.refresh_token
          );

          console.log('Tokens successfully saved to localStorage!');
        } else {
          console.warn(
            'Login successful, but access_token or refresh_token was missing in the response.',
            response
          );
        }
      })
    );
  }

  signup(data: any) {
    return this.http.post(`${this.baseUrl}/cus/signup`, data);
  }
}