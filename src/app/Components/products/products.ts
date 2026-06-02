import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../Services/product-services';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
<<<<<<< HEAD
  styleUrls: ['./products.css'],
=======
  styleUrl: './products.css'
>>>>>>> 5d8f4c34e01437f706f71226dc8ddd79644cb248
})
export class Products implements OnInit {

  productService = inject(ProductsService);

  /* UI STATE (REQUIRED FOR HTML) */

  showCart = signal(false);
  showWishlist = signal(false);
  selectedProduct = signal<any | null>(null);
  selectedCategory = signal<string>('all');
  toastMessage = signal<string | null>(null);

  showToast(message: string) {
    this.toastMessage.set(message);
  
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 2000);
  }
  

  /*INIT*/

  ngOnInit(): void {
    this.productService.getProducts();
  }

  /* MODALS (CART / WISHLIST / PRODUCT) */

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

  openModal(product: any) {
    this.selectedProduct.set(product);
  }

  closeModal() {
    this.selectedProduct.set(null);
  }

  /* CATEGORY FILTER */

  filteredProducts = computed(() => {
    const products = this.productService.products();
    const category = this.selectedCategory();

    if (category === 'all') return products;

    return products.filter(p => p.category === category);
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

  /* WISHLIST ACTIONS */

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
    return this.productService.wishlist().some(p => p.id === product.id);
  }

  /* SIGNAL ACCESSORS (FOR HTML)*/

  cart() {
    return this.productService.cart();
  }

  wishlist() {
    return this.productService.wishlist();
  }

  /* CART TOTALS (FROM SERVICE) */

  cartTotal() {
    return this.productService.cartTotal();
  }

  cartTotalPrice() {
    return this.productService.cartTotalPrice();
  }
}