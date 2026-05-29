import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPasswordComponent {

  email = '';

  constructor(private authService: AuthService) {}

  resetPassword() {

    this.authService
      .forgotPassword(this.email)

      .then(() => {

        alert('Password reset email sent');

      })

      .catch((error) => {

        console.error(error);

        alert(error.message);

      });
  }
}