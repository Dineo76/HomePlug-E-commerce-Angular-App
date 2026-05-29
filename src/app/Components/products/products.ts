import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductsService} from '../../Services/product-services'

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})

export class Products {

  productService = inject(ProductsService);

  // CART with quantity
  cart = signal<any[]>([]);

  // WISHLIST
  wishlist = signal<any[]>([]);

  // MODAL
  selectedProduct = signal<any | null>(null);

  constructor() {
    this.productService.getProducts();
  }

  /* CART  */

  addToCart(product: any) {
    this.cart.update(items => {
      const existing = items.find(p => p.id === product.id);

      if (existing) {
        return items.map(p =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...items, { ...product, quantity: 1 }];
    });
  }

  removeFromCart(product: any) {
    this.cart.update(items =>
      items.filter(p => p.id !== product.id)
    );
  }

  increaseQty(product: any) {
    this.cart.update(items =>
      items.map(p =>
        p.id === product.id
          ? { ...p, quantity: p.quantity + 1 }
          : p
      )
    );
  }

  decreaseQty(product: any) {
    this.cart.update(items =>
      items
        .map(p =>
          p.id === product.id
            ? { ...p, quantity: p.quantity - 1 }
            : p
        )
        .filter(p => p.quantity > 0)
    );
  }

  /* ---------------- WISHLIST ---------------- */

  toggleWishlist(product: any) {
    this.wishlist.update(items => {
      const exists = items.find(p => p.id === product.id);

      if (exists) {
        return items.filter(p => p.id !== product.id);
      }

      return [...items, product];
    });
  }

  isWishlisted(product: any) {
    return this.wishlist().some(p => p.id === product.id);
  }

  /* ---------------- MODAL ---------------- */

  openModal(product: any) {
    this.selectedProduct.set(product);
  }

  closeModal() {
    this.selectedProduct.set(null);
  }
}