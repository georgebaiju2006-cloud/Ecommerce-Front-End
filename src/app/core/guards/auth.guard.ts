import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service'; // Adjust path if needed

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    const token = this.tokenService.getAccessToken();

    // If the token exists in localStorage, let the user pass
    if (token) {
      return true;
    }

    // If no token exists, redirect them to the login/auth page
    return this.router.parseUrl('/auth'); 
  }
}