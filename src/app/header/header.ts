import { Component, NgZone } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';
import { ProfileModal } from '../Components/profile-modal/profile-modal';
import { LoginComponent } from '../Components/login/login';
import { RegisterComponent } from '../Components/register/register';
import { ForgotPasswordComponent } from '../Components/forgot-password/forgot-password';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../services/product-services';
import { StorageService } from '../services/storage';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, ProfileModal, LoginComponent, RegisterComponent, ForgotPasswordComponent],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {

  showProfileModal = false;
  showLoginModal = false;
  showRegisterModal = false;
  showForgotPasswordModal = false;
  isLoggedIn = false;
  userEmail = '';
  userId = '';
  userFirstName = '';
  userLastName = '';
  toastMessage: string | null = null;
  private toastTimer: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private productsService: ProductsService,
    private storageService: StorageService,
    private ngZone: NgZone
  ) {
    this.checkLoginStatus();
    this.loadPersistedState();
  }

  private loadPersistedState() {
    if (!this.userId) {
      return;
    }

    const storedCart = this.storageService.loadCart(this.userId);
    const storedWishlist = this.storageService.loadWishlist(this.userId);

    this.productsService.cart.set(storedCart);
    this.productsService.wishlist.set(storedWishlist);
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

  closeForgotPasswordModal() {
    this.showForgotPasswordModal = false;
  }

  handleLoginSuccess() {
    this.ngZone.run(() => {
      this.showLoginModal = false;
      this.showProfileModal = false;
      this.checkLoginStatus();
      this.showToast('Logged in successfully');
    });
  }

  handleRegisterSuccess() {
    this.ngZone.run(() => {
      this.showRegisterModal = false;
      this.showLoginModal = true;
      this.showToast('Registration complete. Please sign in.');
    });
  }

  handleForgotPasswordSuccess(message: string) {
    this.ngZone.run(() => {
      this.showForgotPasswordModal = false;
      this.showToast(message);
    });
  }

  private showToast(message: string) {
    this.toastMessage = message;

    if (this.toastTimer) {
      window.clearTimeout(this.toastTimer);
    }

    this.toastTimer = window.setTimeout(() => {
      this.ngZone.run(() => {
        this.toastMessage = null;
        this.toastTimer = null;
      });
    }, 2000);
  }

  onShowLogin() {
    this.showProfileModal = false;
    this.showLoginModal = true;
  }

  onShowRegister() {
    this.showProfileModal = false;
    this.showRegisterModal = true;
  }

  onShowForgotPassword() {
    this.showLoginModal = false;
    this.showForgotPasswordModal = true;
  }

  onShowLoginFromForgot() {
    this.showForgotPasswordModal = false;
    this.showLoginModal = true;
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

        this.ngZone.run(() => {
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
          this.showToast('Logged out successfully');
          this.router.navigate(['/']);
        });

      })

      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  }
}
