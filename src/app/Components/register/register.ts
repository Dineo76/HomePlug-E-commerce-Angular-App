import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  email = '';
  password = '';
  firstName = '';
  lastName = '';

  constructor(private authService: AuthService) {}

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
      })

      .catch((error) => {
        alert(error.message);
      });
  }
}