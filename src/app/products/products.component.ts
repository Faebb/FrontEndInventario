import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductService } from '../Services/product.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  filter = 1;
  formProduct: FormGroup;
  validateElaborateType = false;
  validateProductStateId = 1;
  listaProductos: Product[] = [];

  constructor(
    private _productService: ProductService,
    private fb: FormBuilder,
    private _router: Router
  ) {
    this.formProduct = this.fb.group({
      elaborationType: ['', Validators.required],
      productName: ['', Validators.required],
      productStateId: [, Validators.required],
    });
  }

  addProducts() {
    if (this.formProduct.value.elaborationType == 'true') {
      this.validateElaborateType = true;
    } else {
      this.validateElaborateType = false;
    }

    if (this.formProduct.value.productStateId == '1') {
      this.validateProductStateId = 1;
    } else if (this.formProduct.value.productStateId == '2') {
      this.validateProductStateId = 2;
    } else {
      this.validateProductStateId = 3;
    }
    const request: any[] = [
      {
        elaborationType: this.validateElaborateType,
        productName: this.formProduct.value.productName,
        productStateId: this.validateProductStateId,
      },
    ];

    this._productService.addProducts(request).subscribe({
      next: () => {
        console.log('Producto agregado correctamente');
        this.getProducts();
        this._router.navigate(['/productos']);
        this.formProduct.patchValue({
          elaborationType: false,
          productName: '',
          productStateId: 1,
        });
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  //cambia el filtro
  onFilterChage(filter: number) {
    this.filter = filter;
    this.getProducts();
  }
  //obtiene los productos juto con su filtro
  getProducts() {
    this._productService.getListDisponible(this.filter).subscribe({
      next: (data) => {
        this.listaProductos = data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  //se muestra por defecto los disponibles
  ngOnInit(): void {
    this.getProducts();
  }
  //muestra todos los productos
  getAllProducts() {
    this._productService.getListAll().subscribe({
      next: (data) => {
        this.listaProductos = data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  //cambia el estado del producto
  ChangeStateProduct(productId: number, newState: number) {
    this._productService.putStateProduct(productId, newState).subscribe({
      next: (data) => {
        this.getProducts();
      },
      error: (e) => {},
    });
  }
}
