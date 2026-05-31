import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../Services/product-services';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {

  productService = inject(ProductsService);

 /* UI STATE  */

  showCart = signal(false);
  showWishlist = signal(false);
  selectedProduct = signal<any | null>(null);

  openCart() { this.showCart.set(true); }
  closeCart() { this.showCart.set(false); }

  openWishlist() { this.showWishlist.set(true); }
  closeWishlist() { this.showWishlist.set(false); }

  /* DATA  */

  cart = signal<any[]>([]);
  wishlist = signal<any[]>([]);

 /* TOAST */

  toastMessage = signal<string | null>(null);

  showToast(message: string) {
    this.toastMessage.set(message);

    setTimeout(() => {
      this.toastMessage.set(null);
    }, 2000);
  }

  /* CATEGORY FILTER */

  selectedCategory = signal<string>('all');

  filteredProducts = computed(() => {
    const products = this.productService.products();
    const category = this.selectedCategory();

    if (category === 'all') return products;

    return products.filter(p => p.category === category);
  });

 /* INIT */

  ngOnInit(): void {
    this.productService.getProducts();
  }

 /*  CART TOTALS  */

  cartTotal = computed(() =>
    this.cart().reduce((sum, item) => sum + item.quantity, 0)
  );

  cartTotalPrice = computed(() =>
    this.cart().reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    )
  );

  /* CART */

  addToCart(product: any) {
    this.cart.update(items => {
      const existing = items.find(p => p.id === product.id);

      if (existing) {
        this.showToast('Quantity updated 🛒');

        return items.map(p =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      this.showToast('Added to cart 🛒');

      return [...items, { ...product, quantity: 1 }];
    });
  }

  removeFromCart(product: any) {
    this.cart.update(items =>
      items.filter(p => p.id !== product.id)
    );

    this.showToast('Removed from cart ❌');
  }

  increaseQty(product: any) {
    this.addToCart(product);
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

  /* WISHLIST  */

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

  /*MODAL  */

  openModal(product: any) {
    this.selectedProduct.set(product);
  }

  closeModal() {
    this.selectedProduct.set(null);
  }
}