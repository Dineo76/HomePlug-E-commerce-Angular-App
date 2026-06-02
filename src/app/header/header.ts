import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductsService } from '../Services/product-services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  private router = inject(Router);
  searchTerm: string = '';

  searchProducts() {
    const query = this.searchTerm.trim();
    if (!query) {
      return;
    }

    this.router.navigate(['/'], {
      queryParams: { q: query },
      queryParamsHandling: 'merge',
    });
  }
}