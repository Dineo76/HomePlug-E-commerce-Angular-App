import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
// import { Products } from './Components/products/products';
import { FooterComponent } from './footer/footer';
import { ProductsService } from './Services/product-services';
import {DecimalPipe} from '@angular/common'
import { CheckoutComponent } from './Components/checkout/checkout';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, FooterComponent],
  templateUrl: './app.html'
})
export class App {}
