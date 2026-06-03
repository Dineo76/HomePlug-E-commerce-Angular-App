import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
// import { Products } from './Components/products/products';
import { FooterComponent } from './footer/footer';
import { ProductsService } from './Services/product-services';
import {DecimalPipe} from '@angular/common'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header,  FooterComponent, DecimalPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  productService = inject(ProductsService);

  cart() {
    return this.productService.cart();
  }

  /* CART TOTALS */

  cartTotal() {
    return this.productService.cartTotal();
  }

  cartTotalPrice() {
    return this.productService.cartTotalPrice();
  }

  removeFromCart(product: any) {
    this.productService.removeFromCart(product);
    // this.showToast('Removed from cart ❌');
  }

   /* Wishlist*/
   wishlist(){
    return this.productService.wishlist();
   }
   wishlistOpen(){
    return this.productService.openWishlist();
   }
   wishlistclose(){
    return this.productService.closeWishlist()
   }
   toggleWishlist(product: any){
    return this.productService.toggleWishlist(product);
  }
}