import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class productscomponent {
  productName: string = '';
  productCount: number | null = null;
  productPrice: number | null = null;
  productExp: string = ''; // Stored as a string in yyyy-mm-dd format
  isUpdateMode: boolean = false;
  currentProductIndex: number | null = null;
  products: any[] = [];
  searchQuery: string = ''; // For search filtering
  sortproducts: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
          const storedProducts = localStorage.getItem('products');
          if (storedProducts) {
            this.products = JSON.parse(storedProducts);
            this.sortProducts();
          }
        }}

  addProduct() {
    if (this.productName !== '' && this.productExp !== '') {
      const newProduct = {
        name: this.productName,
        count: this.productCount,
        price: this.productPrice,
        exp: this.productExp // Stored as a string in yyyy-mm-dd format
      };

      this.products.push(newProduct);
      this.saveProducts();
      this.clearInputs();
      this.sortProducts(); // Ensure products are sorted after adding
    }
  }

  clearInputs() {
    this.productName = '';
    this.productCount = null;
    this.productPrice = null;
    this.productExp = '';
  }

  saveProducts() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  search(query: string) {
    return this.products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  get filteredProducts() {
    return this.search(this.searchQuery);
  }

  deleteProduct(productIndex: number) {
    this.products.splice(productIndex, 1);
    this.saveProducts();
    this.sortProducts(); // Sort after deletion
  }

  editProduct(index: number) {
    this.isUpdateMode = true;
    this.currentProductIndex = index;
    const product = this.products[index];
    this.productName = product.name;
    this.productCount = product.count;
    this.productPrice = product.price;
    this.productExp = product.exp;
  }

  updateProduct() {
    if (this.currentProductIndex !== null) {
      this.products[this.currentProductIndex] = {
        name: this.productName,
        count: this.productCount,
        price: this.productPrice,
        exp: this.productExp
      };
      this.saveProducts();
      this.clearInputs();
      this.isUpdateMode = false;
      this.sortProducts(); // Sort after updating a product
    }
  }

  isProductExpired(exp: string): boolean {
    const expDate = new Date(exp);
    const now = new Date();
    return expDate < now;
  }

  sortProducts() {
    this.products.sort((a, b) => {
      const isExpiredA = this.isProductExpired(a.exp);
      const isExpiredB = this.isProductExpired(b.exp);

      if (isExpiredA && !isExpiredB) return -1;  // A comes first
      if (!isExpiredA && isExpiredB) return 1;   // B comes first

      // Sort by name if both are expired or not expired
      return a.name.localeCompare(b.name);
    });
  }

  isExpired(exp: string): boolean {
    const expDate = new Date(exp);
    const now = new Date();
    return expDate < now;
  }
}
