import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductsService } from '../Services/product-services';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl:'./header.html',
  styleUrls: ['./header.css']
})
export class Header {

  productService = inject(ProductsService)
}