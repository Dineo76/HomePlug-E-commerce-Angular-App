// import { Component, inject, OnInit } from '@angular/core';
// import { ProductService } from '../../Services/product-service';

// @Component({
//   selector: 'app-products',
//   imports: [],
//   templateUrl: './products.html',
//   styleUrl: './products.css',
// })
// export class Products implements OnInit {

//   productService = inject(ProductService);

//   ngOnInit() {
//     this.productService.getProducts().subscribe((data) => {
//       this.productService.productSig.set(data.products);
    
//     });
//   }

// }
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product-service';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {

  productService = inject(ProductService);
  products = this.productService.productSig;

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.productService.productSig.set(data.products);
      console.log(data.products)


    
    });
  }

}