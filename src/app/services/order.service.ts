import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Order} from '../models/orders.model';
import {Product} from '../models/products.model';

const API_ENDPOINT = environment.apiUrl + '/orders/';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  retrieve(status: string): Observable<any> {
    return this.http.get(API_ENDPOINT, {params: {status}});
  }

  create(order: Order): Observable<any> {
    return this.http.post(API_ENDPOINT, order);
  }

  nextStatus(order: Order): Observable<any> {
    return this.http.get<any>(API_ENDPOINT + order.id + '/next_status/');
  }

  addToCart(product: Product, quantity: number): Observable<any> {
    return this.http.post<Order>(API_ENDPOINT + 'cart/', {product, quantity});
  }
}
