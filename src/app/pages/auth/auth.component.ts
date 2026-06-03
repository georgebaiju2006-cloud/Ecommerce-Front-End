import { Component } from '@angular/core';
import { Router } from '@angular/router'; // 1. Imported Router
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  activeTab: string = 'login';

  showLoginPassword: boolean = false;
  showSignupPassword: boolean = false;

  loginData = {
    name: '',
    email: '',
    password: ''
  };

  signupData = {
    name: '',
    email: '',
    password: '',
    DOB: '',
    main_address: '',
    secondary_address: ''
  };

  // 2. Injected Router into the constructor here
  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router 
  ) {}

  switchTab(tab: string) {
    this.activeTab = tab;
  }

  handleLogin() {
    this.authService.login(this.loginData).subscribe({
      next: (res: any) => {
        console.log('Login Success:', res);

        // NOTE: The localStorage saving is now automatically handled 
        // by your TokenService inside auth.service.ts! No need to write it here.

        this.toastr.success('Login Successful', 'Success');

        // 3. Redirect the user to your protected dashboard page
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log('Login Error:', err);
        this.toastr.error('Invalid Credentials', 'Login Failed');
      }
    });
  }

  handleSignup() {
    this.authService.signup(this.signupData).subscribe({
      next: (res: any) => {
        console.log('Signup Success:', res);
        this.toastr.success('Account Created', 'Success');
        this.activeTab = 'login';
      },
      error: (err) => {
        console.log('Signup Error:', err);
        this.toastr.error('Signup Failed', 'Error');
      }
    });
  }

  toggleLoginPassword() {
    this.showLoginPassword = !this.showLoginPassword;
  }

  toggleSignupPassword() {
    this.showSignupPassword = !this.showSignupPassword;
  }
}