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
  @Output() closeModal = new EventEmitter<void>();
  @Output() successRegister = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  close() {
    this.closeModal.emit();
  }

  register() {

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

        alert('Registration successful');
        this.successRegister.emit();
      })

      .catch((error) => {
        alert(error.message);
      });
  }
}