import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from './models/product';
import { ProductsService } from './services/products.service';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular app';
  loading = false;
  products: IProduct[] = [];
  term = '';

  protected ngUnsubscribe = new Subject<void>;

  constructor(
    public productsService: ProductsService,
    public modalService: ModalService,
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.productsService.getAll().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.loading = false);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
