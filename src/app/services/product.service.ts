import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Product} from '../models/products.model';

const API_ENDPOINT = environment.apiUrl + '/products/';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  retrieve(page: string): Observable<any> {
    return this.http.get(API_ENDPOINT, {params: {page}});
  }

  create(product: Product): Observable<any> {
    return this.http.post(API_ENDPOINT, product);
  }

  update(product: Product): Observable<any> {
    return this.http.put(API_ENDPOINT + product.id + '/', product);
  }

}
