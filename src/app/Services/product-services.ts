import { inject, Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth';
import { StorageService } from './storage';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private storageService = inject(StorageService);

  /*PRODUCTS */

  products = signal<any[]>([]);

  /* CART + WISHLIST*/

  cart = signal<any[]>([]);
  wishlist = signal<any[]>([]);

  /* HOMEWARE CATEGORIES
     (USED FOR FILTERING UI)*/

  categories = signal([
    { label: 'All', value: 'all' },
    { label: 'Furniture', value: 'furniture' },
    { label: 'Home Decor', value: 'home-decoration' },
    { label: 'Kitchen', value: 'kitchen-accessories' }
  ]);

  /*CART TOTALS*/

  cartTotal = computed(() =>
    this.cart().reduce((sum, item) => sum + item.quantity, 0)
  );

  cartTotalPrice = computed(() =>
    this.cart().reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    )
  );

  /*LOAD PRODUCT */

  getProducts() {
    this.http
      .get<any>('https://dummyjson.com/products?limit=200')
      .subscribe(res => {
  
        const allowedCategories = [
          'furniture',
          'home-decoration',
          'kitchen-accessories'
        ];
  
        const filtered = res.products.filter((p: any) =>
          allowedCategories.includes(p.category)
        );
  
        this.products.set(filtered);
      });
  }

  /*CART LOGIC */

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
    this.saveCartForCurrentUser();
  }

  removeFromCart(product: any) {
    this.cart.update(items =>
      items.filter(p => p.id !== product.id)
    );
    this.saveCartForCurrentUser();
  }

  /*WISHLIST LOGIC */

  toggleWishlist(product: any) {
    this.wishlist.update(items => {
      const exists = items.find(p => p.id === product.id);

      if (exists) {
        return items.filter(p => p.id !== product.id);
      }

      return [...items, product];
    });
    this.saveWishlistForCurrentUser();
  }

  isWishlisted(product: any): boolean {
    return this.wishlist().some(p => p.id === product.id);
  }

  private getCurrentUserId(): string {
    const user = this.authService.getUser();
    return user?.uid || '';
  }

  private saveCartForCurrentUser(): void {
    const uid = this.getCurrentUserId();
    if (!uid) {
      return;
    }
    this.storageService.saveCart(uid, this.cart());
  }

  private saveWishlistForCurrentUser(): void {
    const uid = this.getCurrentUserId();
    if (!uid) {
      return;
    }
    this.storageService.saveWishlist(uid, this.wishlist());
  }
}