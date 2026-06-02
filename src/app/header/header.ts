import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../services/auth';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
   this.authService.logout()

      .then(() => {

        localStorage.removeItem('user');

        this.router.navigate(['/login']);

      })

      .catch((error) => {

        console.error(error);

      });
  }
}
