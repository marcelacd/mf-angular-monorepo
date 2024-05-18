import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonsLibService, ICommonProduct } from '@commons-lib';

@Component({
  standalone: true,
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  imports: [CommonModule],
})

export class PaymentComponent implements OnInit {
  constructor(
    public commonsLibService: CommonsLibService
  ) { }

  products: ICommonProduct[] = [];

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(): void {
    const productsStorage = localStorage.getItem('products');
    if (productsStorage) {
      this.products = JSON.parse(productsStorage) as ICommonProduct[];
    }
  }

  deleteProduct(id: number) {
    this.commonsLibService.deleteProduct(id)
    this.getProducts()
  }
}

