import { filter } from 'rxjs/operators';
import { AuthService } from '../Services/auth';
import { ProfileModal } from '../Components/profile-modal/profile-modal';
import { CommonModule } from '@angular/common';
import { StorageService } from '../Services/storage';
import { Component, inject, NgZone } from '@angular/core';
import {  Router, RouterLink, NavigationEnd, RouterLinkActive } from '@angular/router';
import { ProductsService } from '../Services/product-services';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, ProfileModal, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
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
    private ngZone: NgZone,
  ) {
    this.checkLoginStatus();
    this.loadPersistedState();

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.checkLoginStatus();
      this.loadPersistedState();

      const toastMsg = this.router.routerState.snapshot.root.queryParams['toast'];
      if (toastMsg) {
        this.showToast(toastMsg);
        this.router.navigate([], {
          queryParams: { toast: null },
          queryParamsHandling: 'merge',
          replaceUrl: true,
        });
      }
    });
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
    } else {
      this.isLoggedIn = false;
      this.userEmail = '';
      this.userId = '';
      this.userFirstName = '';
      this.userLastName = '';
    }
  }

  openProfileModal() {
    this.checkLoginStatus(); 
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
    this.ngZone.run(() => {
      this.showProfileModal = false;
      this.router.navigate(['/login']);
    });
  }

  onShowRegister() {
    this.ngZone.run(() => {
      this.showProfileModal = false;
      this.router.navigate(['/register']);
    });
  }

  onShowForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  onShowLoginFromForgot() {
    this.router.navigate(['/login']);
  }

  logout() {
    if (this.userId) {
      this.storageService.saveCart(this.userId, this.productsService.cart());

      this.storageService.saveWishlist(this.userId, this.productsService.wishlist());
    }

    this.authService
      .logout()

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
  
  productService = inject(ProductsService)
}
