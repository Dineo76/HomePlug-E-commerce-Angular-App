import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPasswordComponent {

  email = '';
  emailError = '';
  generalError = '';

  @Output() closeModal = new EventEmitter<void>();
  @Output() successReset = new EventEmitter<string>();
  @Output() showLogin = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router) {}

  close() {
    this.closeModal.emit();
    this.router.navigate(['/login']);
  }

  openLogin() {
    this.showLogin.emit();
    this.router.navigate(['/login']);
  }

  private validate(): boolean {
    this.emailError = '';
    this.generalError = '';

    if (!this.email.trim()) {
      this.emailError = 'Email is required.';
      return false;
    }
    return true;
  }

  resetPassword() {
    if (!this.validate()) {
      return;
    }

    this.authService
      .forgotPassword(this.email)
      .then(() => {
        this.successReset.emit('Password reset email sent');
        this.router.navigate(['/login'], { queryParams: { toast: 'Password reset email sent' } });
      })
      .catch((error) => {
        console.error(error);
        this.generalError = error?.message || 'Failed to send reset email. Please try again.';
      });
  }
}