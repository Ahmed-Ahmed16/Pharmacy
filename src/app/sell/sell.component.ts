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

    if (this.count > product.count) {
      this.errorMessage = 'Not enough stock available!';
      this.totalPrice = 0;
      return;
    }

    if (new Date(product.expiryDate) < new Date()) {
      this.errorMessage = 'Product is expired!';
      alert('Product is expired!')
      this.totalPrice = 0;
      return;
    }

    product.count -= this.count;
    if (product.count <= 0) {
      products.splice(products.indexOf(product), 1);
    }

    this.totalPrice = product.price * this.count;
    this.errorMessage = '';

    this.updateProducts(products);

    // إضافة المنتج إلى العربة
    this.cart.push({
      productName: this.productName,
      count: this.count,
      total: this.totalPrice
    });
  }

  // دالة لحساب مجموع الأسعار
  getTotalCartPrice(): number {
    return this.cart.reduce((sum, item) => sum + item.total, 0);
  }
}
