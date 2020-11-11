import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

const API_ENDPOINT = environment.apiUrl + '/budget-lines/';

@Injectable({
  providedIn: 'root'
})
export class BudgetlineService {

  constructor(
    private http: HttpClient
  ) { }

  retrieve(page: string, filters?: any): Observable<any> {
    return this.http.get(API_ENDPOINT, {params: {page, ...filters}});
  }

}
