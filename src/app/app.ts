import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< HEAD
import { Header } from './header/header';
import { Products } from './Components/products/products';
import { FooterComponent } from './footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Products, FooterComponent],
  templateUrl: './app.html'
=======
import { Products } from './Components/products/products';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Products],
  templateUrl: './app.html',
  styleUrl: './app.css'
>>>>>>> 3090a56ba38b785cb36bd2f9b76c1a02cb330ac5
})
export class App {}