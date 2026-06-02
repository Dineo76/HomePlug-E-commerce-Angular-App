import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';
import { ProfileModal } from '../Components/profile-modal/profile-modal';
import { LoginComponent } from '../Components/login/login';
import { RegisterComponent } from '../Components/register/register';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../services/product-services';
import { StorageService } from '../services/storage';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, ProfileModal, LoginComponent, RegisterComponent],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {

  showProfileModal = false;
  showLoginModal = false;
  showRegisterModal = false;
  isLoggedIn = false;
  userEmail = '';
  userId = '';
  userFirstName = '';
  userLastName = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private productsService: ProductsService,
    private storageService: StorageService

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

  closeLoginModal() {
    this.showLoginModal = false;
  }

  closeRegisterModal() {
    this.showRegisterModal = false;
  }

  handleLoginSuccess() {
    this.showLoginModal = false;
    this.showProfileModal = false;
    this.checkLoginStatus();
  }

  handleRegisterSuccess() {
    this.showRegisterModal = false;
    this.showLoginModal = true;
  }

  onShowLogin() {
    this.showProfileModal = false;
    this.showLoginModal = true;
  }

  onShowRegister() {
    this.showProfileModal = false;
    this.showRegisterModal = true;
  }


  logout() {
    if (this.userId) {

    this.storageService.saveCart(
      this.userId,
      this.productsService.cart()
    );

    this.storageService.saveWishlist(
      this.userId,
      this.productsService.wishlist()
    );

  }


   this.authService.logout()

      .then(() => {

        this.productsService.cart.set([]);
        this.productsService.wishlist.set([]);

        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem('user');
        }

        this.isLoggedIn = false;
        this.userEmail = '';
        this.userId = '';
        this.userFirstName = '';
        this.userLastName = '';
        this.showProfileModal = false;
        this.router.navigate(['/']);

      })

      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  }
}
