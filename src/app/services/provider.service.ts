import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Provider} from '../models/providers.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

const API_ENDPOINT = environment.apiUrl + '/providers/';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(
    private http: HttpClient
  ) { }

  list(page: string): Observable<any> {
    return this.http.get(API_ENDPOINT, {params: {page}});
  }

  retrieve(id: string): Observable<any> {
    return this.http.get(API_ENDPOINT + id + '/');
  }

  create(provider: Provider): Observable<any> {
    return this.http.post(API_ENDPOINT, provider);
  }

  update(provider: Provider): Observable<any> {
    return this.http.put(API_ENDPOINT + provider.id + '/', provider);
  }

  getResellers(): Observable<any> {
    return this.http.get(API_ENDPOINT + 'resellers/');
  }

}
