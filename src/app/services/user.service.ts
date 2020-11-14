import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../models/users.model';

const API_ENDPOINT = environment.apiUrl + '/users/';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient
  ) { }

  list(): Observable<any> {
    return this.http.get(API_ENDPOINT);
  }

  retrieve(id: string): Observable<any> {
    return this.http.get(API_ENDPOINT + id + '/');
  }

  create(user: User): Observable<any> {
    return this.http.post(API_ENDPOINT, user);
  }

  update(user: User): Observable<any> {
    return this.http.put(API_ENDPOINT + user.id + '/', user);
  }

}
