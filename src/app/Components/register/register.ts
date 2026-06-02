import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  email = '';
  password = '';
  firstName = '';
  lastName = '';
  emailError = '';
  passwordError = '';
  firstNameError = '';
  lastNameError = '';
  generalError = '';
  @Output() closeModal = new EventEmitter<void>();
  @Output() successRegister = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  close() {
    this.closeModal.emit();
  }

  private resetErrors(): void {
    this.emailError = '';
    this.passwordError = '';
    this.firstNameError = '';
    this.lastNameError = '';
    this.generalError = '';
  }

  private validate(): boolean {
    this.resetErrors();

    if (!this.firstName.trim()) {
      this.firstNameError = 'First name is required.';
    }

    if (!this.lastName.trim()) {
      this.lastNameError = 'Last name is required.';
    }

    if (!this.email.trim()) {
      this.emailError = 'Email is required.';
    }

    if (!this.password) {
      this.passwordError = 'Password is required.';
    } else if (this.password.length < 5) {
      this.passwordError = 'Password must be at least 5 characters long.';
    }

    return !this.firstNameError && !this.lastNameError && !this.emailError && !this.passwordError;
  }

  register() {
    if (!this.validate()) {
      return;
    }

    this.authService
      .register(this.email, this.password)

      .then((userCredential) => {
        const uid = userCredential.user.uid;

        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(
            'user',
            JSON.stringify({
              uid,
              email: this.email,
              firstName: this.firstName,
              lastName: this.lastName
            })
          );
        }

        this.resetErrors();
        this.successRegister.emit();
      })

      .catch((error) => {
        this.generalError = error?.message || 'Registration failed. Please try again.';
      });
  }
}