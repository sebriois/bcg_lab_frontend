import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_ENDPOINT = environment.apiUrl + '/budgets/';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(
    private http: HttpClient
  ) { }

  retrieve(page: string): Observable<any> {
    return this.http.get(API_ENDPOINT, {params: {page}});
  }

}
