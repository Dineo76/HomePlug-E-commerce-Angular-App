// import { Injectable, inject, signal, computed } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ShopService {

//   private http = inject(HttpClient);

//   private apiUrl = 'https://dummyjson.com/products/category/furniture';

//   // SIGNALS
//   products = signal<any[]>([]);
//   searchTerm = signal<string>('');
//   cart = signal<any[]>([]);
//   wishlist = signal<any[]>([]);


//   getProducts() observable<any> {
//     return this.http.get<any>(this.apiUrl);
//   }

//   constructor() {
//     this.loadProducts();
//   }

//   // Load all products
//   loadProducts() {
//     this.http.get<any>(this.apiUrl).subscribe((res) => {
//       this.products.set(res.products);
//     });
//   }

//   // Get single product by ID
//   getProduct(id: number) {
//     return this.http.get(`https://dummyjson.com/products/${id}`);
//   }

//   // Filtered products (search)
//   filteredProducts = computed(() => {
//     return this.products().filter(p =>
//       p.title.toLowerCase().includes(this.searchTerm().toLowerCase())
//     );
//   });
// }
