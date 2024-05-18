import { Component, OnInit } from '@angular/core';
import { IProductCard } from '../models/product-card.interface';

import { delay } from 'rxjs/operators';
import { AnimeService } from '../service/anime.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(private _animeService: AnimeService) {}
  products: IProductCard[] = [];

  ngOnInit(): void {
    this._animeService.getAnimes()
    .pipe(delay(400))
    .subscribe((response) => {
      this.products = response;
    });
  }
}
