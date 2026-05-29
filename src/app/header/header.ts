import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth';
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
   this.authService.logout()

      .then(() => {

        alert('Logged out');

        this.router.navigate(['/login']);

      })

      .catch((error) => {

        console.error(error);

      });
  }
}
