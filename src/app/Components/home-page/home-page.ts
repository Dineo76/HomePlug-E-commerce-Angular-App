import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
=======
import { ActivatedRoute } from '@angular/router';
>>>>>>> 050c8fb74c03b8054ded642654cb7184c821fb37
import { ProductService } from '../../Services/home-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css']
})
export class HomePage implements OnInit {
  private route = inject(ActivatedRoute);
  productService = inject(ProductService);
  searchQuery = signal('');

  filteredProducts = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    return query
      ? this.productService.productSig().filter((product) => {
          const lowerTitle = product.title.toLowerCase();
          const lowerCategory = product.category.toLowerCase();
          const lowerDescription = product.description?.toLowerCase() ?? '';
          return (
            lowerTitle.includes(query) ||
            lowerCategory.includes(query) ||
            lowerDescription.includes(query)
          );
        })
      : this.productService.productSig();
  });

  ngOnInit() {
    this.productService.getProducts();
    this.route.queryParamMap.subscribe((params) => {
      this.searchQuery.set(params.get('q') ?? '');
    });
  }

  getStars(rating: number): string[] {
    return Array.from({ length: 5 }, (_, i) =>
      i < Math.round(rating) ? 'full' : 'empty'
    );
  }
}