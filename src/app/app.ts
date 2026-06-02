import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Products } from './Components/products/products';
import { FooterComponent } from './footer/footer';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Products, FooterComponent,],
  templateUrl: './app.html'
})
export class App {}