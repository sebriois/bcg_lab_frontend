import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/products.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-product-quantity-form',
  templateUrl: './product-quantity-form.component.html',
  styleUrls: ['./product-quantity-form.component.scss']
})
export class ProductQuantityFormComponent implements OnInit {

  constructor(
    public bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private orderService: OrderService
  ) { }

  product: Product;
  quantity: number;
  loading: boolean;

  ngOnInit() {
    this.quantity = 1;
  }

  setProduct(product: Product) {
    this.product = product;
  }

  isValid() {
    return !!this.quantity && this.quantity > 0;
  }

  addToCart() {
    this.loading = true;
    this.orderService.addToCart(this.product, this.quantity).subscribe(() => {
      this.toastr.success('quantité: ' + this.quantity.toString(), 'Produit ajouté au panier avec succès!');
      this.bsModalRef.hide();
      this.loading = false;
    }, response => {
      this.toastr.error(response.error, 'Erreur');
      this.loading = false;
    });
  }
}
