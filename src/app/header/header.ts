import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';
import { ProfileModal } from '../Components/profile-modal/profile-modal';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, ProfileModal],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {

  showProfileModal = false;
  isLoggedIn = false;
  userEmail = '';
  userId = '';
  userFirstName = '';
  userLastName = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {this.checkLoginStatus();

    }

  checkLoginStatus() {
    if (typeof localStorage === 'undefined') {
      return;
    }

    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this.isLoggedIn = true;
        this.userEmail = user.email || '';
        this.userId = user.uid || '';
        this.userFirstName = user.firstName || '';
        this.userLastName = user.lastName || '';
      } catch (e) {
        console.error('Error parsing user data', e);
      }
    }
  }

  openProfileModal() {
    this.checkLoginStatus(); // Refresh status before opening
    this.showProfileModal = true;
  }

  closeProfileModal() {
    this.showProfileModal = false;
  }


  logout() {
   this.authService.logout()

      .then(() => {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem('user');
        }

        this.isLoggedIn = false;
        this.userEmail = '';
        this.userId = '';
        this.userFirstName = '';
        this.userLastName = '';
        this.router.navigate(['/login']);

      })

      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  }
}
