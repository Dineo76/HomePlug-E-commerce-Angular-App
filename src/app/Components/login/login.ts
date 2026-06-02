import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/product-services';
import { StorageService } from '../../services/storage';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
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
    private productsService: ProductsService
  ) {}

  close() {
    this.closeModal.emit();
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
    if (!this.validate()) {
      return;
    }

    this.authService
      .login(this.email, this.password)

      .then((userCredential) => {
        const uid = userCredential.user.uid;

        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(
            'user',
            JSON.stringify({
              uid,
              email: userCredential.user.email,
              firstName: '',
              lastName: ''
            })
          );
        }

        this.productsService.cart.set(
          this.storageService.loadCart(uid)
        );

        this.productsService.wishlist.set(
          this.storageService.loadWishlist(uid)
        );

        this.resetErrors();
        this.successLogin.emit();
      })

      .catch((error) => {
        console.error(error);
        this.generalError = error?.message || 'Login failed. Please try again.';
      });
  }
}