import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../Services/product-services';
import { StorageService } from '../../Services/storage';
import { AuthService } from '../../Services/auth';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  emailError = '';
  passwordError = '';
  generalError = '';
  @Output() closeModal = new EventEmitter<void>();
  @Output() successLogin = new EventEmitter<void>();
  @Output() showForgotPassword = new EventEmitter<void>();

  openForgotPassword() {
    this.showForgotPassword.emit();
  }

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private productsService: ProductsService,
    private router: Router,
  ) {}

  close() {
    this.closeModal.emit();
    this.router.navigate(['/']);
  }

  private resetErrors(): void {
    this.emailError = '';
    this.passwordError = '';
    this.generalError = '';
  }

  private validate(): boolean {
    this.resetErrors();

    if (!this.email.trim()) {
      this.emailError = 'Email is required.';
    }

    if (!this.password) {
      this.passwordError = 'Password is required.';
    } else if (this.password.length < 5) {
      this.passwordError = 'Password must be at least 5 characters long.';
    }

    return !this.emailError && !this.passwordError;
  }

  login() {
    console.log('LoginComponent: login() triggered with email:', this.email);
    if (!this.validate()) {
      console.log('LoginComponent: validation failed. Errors:', {
        emailError: this.emailError,
        passwordError: this.passwordError
      });
      return;
    }
    console.log('LoginComponent: validation passed. Calling authService.login()...');

    this.authService
      .login(this.email, this.password)

      .then((userCredential) => {
        console.log('LoginComponent: login success. userCredential:', userCredential);
        const uid = userCredential.user.uid;

        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(
            'user',
            JSON.stringify({
              uid,
              email: userCredential.user.email,
              firstName: userCredential.user.firstName || '',
              lastName: userCredential.user.lastName || '',
            }),
          );
        }

        this.productsService.cart.set(this.storageService.loadCart(uid));

        this.productsService.wishlist.set(this.storageService.loadWishlist(uid));

        this.resetErrors();
        this.successLogin.emit();
        console.log('LoginComponent: navigating to / with toast...');
        this.router.navigate(['/'], { queryParams: { toast: 'Logged in successfully' } });
      })

      .catch((error) => {
        console.error('LoginComponent: login failed with error:', error);
        this.generalError = error?.message || 'Login failed. Please try again.';
      });
  }
}
