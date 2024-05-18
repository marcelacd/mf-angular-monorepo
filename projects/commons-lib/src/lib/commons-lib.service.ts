import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICommonProduct } from './models/product.interface';

@Injectable({
  providedIn: 'root',
})

export class CommonsLibService {
  private _products: ICommonProduct[] = [];

  private _channelSource = new BehaviorSubject<number>(0);
  channelPayment$ = this._channelSource.asObservable();

  constructor() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      this._products = JSON.parse(storedProducts);
      this._channelSource.next(this._products.length);
    }
  }

  sendData(product: ICommonProduct): void {
    this._products.push(product);
    this.saveData()
  }

  deleteProduct(id: number): void {
    this._products = this._products.filter(product => product.id !== id);
    this.saveData()
  }
  
  saveData(): void{
    localStorage.setItem('products', JSON.stringify(this._products));
    this._channelSource.next(this._products.length);
  }

}