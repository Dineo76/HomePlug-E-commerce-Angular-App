import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../Services/product-services';
import { CheckoutComponent } from '../../Components/checkout/checkout';
import { ActivatedRoute } from '@angular/router'; // ✅ ADDED

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, CheckoutComponent],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {

  productService = inject(ProductsService);
  private route = inject(ActivatedRoute); // ✅ ADDED

  /* UI STATE (LOCAL ONLY - PRODUCT PAGE) */

  selectedProduct = signal<any | null>(null);
  selectedCategory = signal<string>('all');
  toastMessage = signal<string | null>(null);
  showCheckoutModal = signal(false);

  searchQuery = signal(''); // ✅ ADDED

  /* TOAST */

  showToast(message: string) {
    this.toastMessage.set(message);

    setTimeout(() => {
      this.toastMessage.set(null);
    }, 2000);
  }

  /* INIT */

  ngOnInit(): void {
    this.productService.getProducts();

    // ✅ READ SEARCH FROM NAVBAR URL
    this.route.queryParams.subscribe(params => {
      const q = params['q'];

      if (q) {
        this.searchQuery.set(q.toLowerCase());
      } else {
        this.searchQuery.set('');
      }
    });
  }

  /* PRODUCT MODAL */

  openModal(product: any) {
    this.selectedProduct.set(product);
  }

  closeModal() {
    this.selectedProduct.set(null);
  }

  /* CATEGORY FILTER + SEARCH FIX */

  filteredProducts = computed(() => {
    const products = this.productService.products();
    const category = this.selectedCategory();
    const search = this.searchQuery();

    let result = products;

    // category filter (UNCHANGED)
    if (category === 'all') {
      result = products;
    } else {
      result = products.filter(p => p.category === category);
    }

    // ✅ SEARCH FIX
    if (search) {
      result = result.filter(p =>
        (p.title ?? '').toLowerCase().includes(search)
      );
    }

    return result;
  });

  /* CART ACTIONS */

  addToCart(product: any) {
    this.productService.addToCart(product);
    this.showToast('Added to cart 🛒');
  }

  removeFromCart(product: any) {
    this.productService.removeFromCart(product);
    this.showToast('Removed from cart ❌');
  }

  increaseQty(product: any) {
    this.productService.addToCart(product);
  }

  decreaseQty(product: any) {
    this.productService.cart.update(items =>
      items
        .map(p =>
          p.id === product.id
            ? { ...p, quantity: p.quantity - 1 }
            : p
        )
        .filter(p => p.quantity > 0)
    );
  }

  /* WISHLIST */

  toggleWishlist(product: any) {

    const exists = this.productService
      .wishlist()
      .some(p => p.id === product.id);

    this.productService.toggleWishlist(product);

    if (exists) {
      this.showToast('Removed from wishlist ❌');
    } else {
      this.showToast('Added to wishlist ❤️');
    }
  }

  isWishlisted(product: any) {
    return this.productService
      .wishlist()
      .some(p => p.id === product.id);
  }

  /* SIGNAL ACCESSORS */

  cart() {
    return this.productService.cart();
  }

  wishlist() {
    return this.productService.wishlist();
  }

  cartTotal() {
    return this.productService.cartTotal();
  }

  cartTotalPrice() {
    return this.productService.cartTotalPrice();
  }
}