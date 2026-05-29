import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  login() {

    this.authService
      .login(this.email, this.password)

      .then((userCredential) => {

        localStorage.setItem(
          'user',
          JSON.stringify(userCredential.user)
        );

  alert('Login successful');
      })

      .catch((error) => {

        console.error(error);

        alert(error.message);

      });
  }
}