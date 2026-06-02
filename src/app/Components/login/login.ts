import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/product-services';
import { StorageService } from '../../services/storage';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = '';
  password = '';
  @Output() closeModal = new EventEmitter<void>();
  @Output() successLogin = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private productsService: ProductsService
  ) {}

  close() {
    this.closeModal.emit();
  }

  login() {

    this.authService
      .login(this.email, this.password)

      .then((userCredential) => {

        const uid = userCredential.user.uid;

        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(
            'user',
            JSON.stringify({
              uid,
              email: userCredential.user.email,
              firstName: '',
              lastName: ''
            })
          );
        }

        this.productsService.cart.set(
          this.storageService.loadCart(uid)
        );

        this.productsService.wishlist.set(
          this.storageService.loadWishlist(uid)
        );

        alert('Login successful');
        this.successLogin.emit();
      })

      .catch((error) => {

        console.error(error);

        alert(error.message);

      });
  }
}