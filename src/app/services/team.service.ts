import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Team} from '../models/team.model';

const API_ENDPOINT = environment.apiUrl + '/teams/';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    private http: HttpClient
  ) { }

  list(): Observable<any> {
    return this.http.get(API_ENDPOINT);
  }

  retrieve(id: string): Observable<any> {
    return this.http.get(API_ENDPOINT + id + '/');
  }

  create(team: Team): Observable<any> {
    return this.http.post(API_ENDPOINT, team);
  }

  update(team: Team): Observable<any> {
    return this.http.put(API_ENDPOINT + team.id + '/', team);
  }

}
