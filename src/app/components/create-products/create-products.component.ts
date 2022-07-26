import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.scss']
})
export class CreateProductsComponent implements OnInit {

  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    description: new FormControl<string>(''),
    price: new FormControl<number>(0, [
      Validators.required,
    ]),
  })

  get title(): FormControl {
    return this.form.controls.title as FormControl;
  }

  get description(): FormControl {
    return this.form.controls.description as FormControl;
  }

  get price(): FormControl {
    return this.form.controls.price as FormControl;
  }

  constructor(
    public productService: ProductsService,
    public modalService: ModalService,
  ) {
  }

  ngOnInit(): void {
  }

  public priceValidator(control: FormControl): boolean | null {
    return control.value >= 0 ? true : null;
  }

  submit(): void {
    if (this.form.status === 'INVALID') {
      return;
    }

    this.productService.create({
      title: this.form.value.title as string,
      price: 13.5,
      description: 'lorem ipsum set',
      image: 'https://i.pravatar.cc',
      category: 'electronic',
      rating: {
        rate: 4,
        count: 199.99,
      }
    }).subscribe((r) => {
      this.modalService.close();
      console.log(r)
    });
    console.log(this.form.value)
  }
}
