import { Routes } from '@angular/router';
import { HomePage } from './Components/home-page/home-page';
import { ProductDetails } from './Components/product-details/product-details';
import { Products } from '../app/Components/products/products';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password';
import { LoginComponent } from './Components/login/login';
import { RegisterComponent } from './Components/register/register';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'product/:id', component: ProductDetails },
  { path: 'products', component: Products },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];
