import { inject, Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private http = inject(HttpClient);

  /*PRODUCTS */

  products = signal<any[]>([]);

  /* CART + WISHLIST*/

  cart = signal<any[]>([]);
  wishlist = signal<any[]>([]);

  /* UI STATE (SINGLE SOURCE OF TRUTH FOR MODALS) */
showCart = signal(false);
showWishlist = signal(false);

openCart() {
  this.showCart.set(true);
}

closeCart() {
  this.showCart.set(false);
}

openWishlist() {
  this.showWishlist.set(true);
}

closeWishlist() {
  this.showWishlist.set(false);
}

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
  }

  removeFromCart(product: any) {
    this.cart.update(items =>
      items.filter(p => p.id !== product.id)
    );
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
  }

  isWishlisted(product: any): boolean {
    return this.wishlist().some(p => p.id === product.id);
  }
}