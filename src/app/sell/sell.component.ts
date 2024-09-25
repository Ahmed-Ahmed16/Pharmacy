import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-sell-product',
  standalone: true,
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
  imports: [FormsModule, CommonModule]
})
export class SellProductComponent {
  productName: string = '';
  count: number = 0;
  totalPrice: number = 0;
  errorMessage: string = '';
  cart: any[] = [];
  productCount: number | null = null;

  getProducts(): any[] {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
  }

  updateProducts(products: any[]): void {
    localStorage.setItem('products', JSON.stringify(products));
  }

  sellProduct() {
    const products = this.getProducts();
    

    const product = products.find(p => p.name.toLowerCase() === this.productName.toLowerCase());
  
    if (!product) {
      this.errorMessage = 'Product not found!';
      this.totalPrice = 0;
      return;
    }
  
    const currentDate = new Date();
    const productExpiryDate = new Date(product.exp);
  
    if (productExpiryDate < currentDate) {
      this.errorMessage = "Product ${this.productName} is expired and cannot be added to the cart!";
      this.totalPrice = 0;
      return; 
    }
  
    if (this.count > product.count) {
      this.errorMessage = 'Not enough stock available!';
      this.totalPrice = 0;
      return;
    }
  
    product.count -= this.count;
    this.totalPrice = product.price * this.count;
    this.errorMessage = '';
  
  
    if (product.count <= 0) {
      const index = products.indexOf(product);
      products.splice(index, 1);  
    }
  
    this.updateProducts(products);
   
    this.cart.push({
      productName: this.productName,
      count: this.count,
      total: this.totalPrice
    
    }); 
    this.clearInputs()
    
  }

  clearInputs() {
    this.productName = '';
    this.count = 0;

  }
  
  
  
  deleteAllProducts() {
    this.cart = [];
  
    localStorage.removeItem('cart');
    this.errorMessage = '';
  }

  getTotalCartPrice(): number {
    return this.cart.reduce((sum, item) => sum + item.total, 0);
  }
}