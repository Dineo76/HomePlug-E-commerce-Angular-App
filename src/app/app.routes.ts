import { Routes } from '@angular/router';
import { HomePage } from './Components/home-page/home-page';
import { ProductDetails } from './Components/product-details/product-details';
import { Products } from '../app/Components/products/products';
import { RegisterComponent } from './Components/register/register';
import { LoginComponent } from './Components/login/login';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password';


export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'product/:id', component: ProductDetails },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: Products },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent }
];
