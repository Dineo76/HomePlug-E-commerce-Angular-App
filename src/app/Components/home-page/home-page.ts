import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../Services/home-service';
import { productType } from '../../Interface/types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css'],
})
export class HomePage implements OnInit {
  productService = inject(ProductService);
  products = this.productService.productSig;

  ngOnInit() {
    this.productService.getProducts();
  }
}
