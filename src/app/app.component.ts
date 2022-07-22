import { Component, OnInit } from '@angular/core';
import { IProduct } from './models/product';
import { ProductsService } from './services/products.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular app';
  products: IProduct[] = [];
  loading = false;

  constructor(
    private productsService: ProductsService,
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.productsService.getAll().pipe(take(1)).subscribe((p) => {
      this.products = p;
      this.loading = false;
    });
  }

}
