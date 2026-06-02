import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products';
import { StorageService } from '../../services/storage';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private productsService: ProductsService
  ) {}

  login() {

    this.authService
      .login(this.email, this.password)

      .then((userCredential) => {

        const uid = userCredential.user.uid;

        localStorage.setItem(
          'user',
          JSON.stringify({
            uid,
            email: userCredential.user.email
          })
        );

        this.productsService.cart.set(
          this.storageService.loadCart(uid)
        );

        this.productsService.wishlist.set(
          this.storageService.loadWishlist(uid)
        );

        alert('Login successful');
      })

      .catch((error) => {

        console.error(error);

        alert(error.message);

      });
  }
}