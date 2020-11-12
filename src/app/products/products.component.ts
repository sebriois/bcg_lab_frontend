import {Component, OnInit, Provider} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Pagination} from '../models/pagination.model';
import {ProviderService} from '../services/provider.service';
import {Product} from '../models/products.model';
import {ProductQuantityFormComponent} from './product-quantity-form/product-quantity-form.component';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  bsModalRef: BsModalRef;
  loading: boolean;
  pagination: Pagination;
  products: Array<Product>;

  searchText: string;

  constructor(
    private modalService: BsModalService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.pagination = {
      totalItems: 0,
      itemsPerPage: 50,
      currentPage: 1,
      nextPage: null,
      prevPage: null
    };
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.list(this.pagination.currentPage.toString()).subscribe(response => {
      this.pagination.totalItems = response.count;
      this.pagination.nextPage = response.next;
      this.pagination.prevPage = response.previous;
      this.products = response.results;
      this.loading = false;
    });
  }

  pageChanged(event) {
    if (event.page !== this.pagination.currentPage) {
      this.pagination.currentPage = event.page;
      this.loadProducts();
    }
  }

  searchProducts() {}

  showQuantityForm(product: Product): void {
    console.log(product);
    this.bsModalRef = this.modalService.show(ProductQuantityFormComponent);
    this.bsModalRef.content.setProduct(product);
  }
}
