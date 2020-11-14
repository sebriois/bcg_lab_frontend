import { Injectable } from '@angular/core';
import {User} from '../models/users.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import * as moment from 'moment';

const API_ENDPOINT = environment.apiUrl + '/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string;
  currentUser: User;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  getCurrentUser(): User {
    return this.currentUser;
  }

  setCurrentUser(user: User) {
    if (!!this.currentUser) {
      this.currentUser = {...this.currentUser, ...user};
      localStorage.setItem('bcglab-user', JSON.stringify(user));
    } else {
      this.currentUser = user;
    }
    console.log('set current user to:', this.currentUser);
  }

  login(username: string, password: string ) {
    return this.httpClient.post<User>(API_ENDPOINT + '/login/', {
      username, password
    }).pipe(
      map(response => {
        this.setSession(response);
        this.startSession();
      })
    );
  }

  private setSession(user: User) {
    this.currentUser = user;
    localStorage.setItem('bcglab-user', JSON.stringify(user));

    const expiresAt = new Date(user.expiresIn * 1000);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
  }

  startSession(): void {
    console.log('start session');

    if (!this.currentUser) {
      console.log('no current user, try to read from local storage');
      // try to read from local storage
      const storedUser = localStorage.getItem('bcglab-user');
      if (!!storedUser) {
        const currentUserAsJson = JSON.parse(storedUser);
        if (!!currentUserAsJson) {
          this.setCurrentUser(currentUserAsJson);
        }
      }
    }

    if (!this.currentUser) {
      console.log('no current user found');
      this.logout();
    } else if (!this.currentUser.id) {
      console.log('no user ID found');
      this.logout();
    } else if (this.isLoggedIn()) {
      const sessionLength = moment(this.getExpiration()).diff(moment());
      this.toastr.info('Session will expire in ' + moment.duration(sessionLength, 'milliseconds').humanize(), 'Session started', {
        progressBar: true,
        timeOut: 5000
      });

      setTimeout(() => {
        this.toastr.warning('Session will expire in ' + moment.duration(sessionLength * 0.05, 'milliseconds').humanize());
      }, sessionLength * 0.95);

      setTimeout(() => {
        this.toastr.info('Session has expired', 'Logging out', {
          progressBar: true,
          timeOut: 4000
        });
        this.logout();
      }, sessionLength);
    } else {
      this.toastr.info('Session has expired', 'Logging out', {
        progressBar: true,
        timeOut: 4000
      });
      this.logout();
    }
  }

  logout() {
    console.log('logging out');
    this.currentUser = undefined;
    localStorage.removeItem('bcglab-user');
    this.redirectToLogin();
  }

  public isLoggedIn() {
    if (!this.currentUser) {
      return false;
    } else {
      return moment().isBefore(this.getExpiration());
    }
  }

  public isActiveUser() {
    return !!this.currentUser && this.currentUser.is_active;
  }

  public isAdmin() {
    return !!this.currentUser && this.currentUser.is_superuser;
  }

  getToken(): string {
    if (!!this.currentUser && !!this.currentUser.access) {
      return this.currentUser.access;
    }
  }

  getExpiration(): Date {
    const expiration = localStorage.getItem('expires_at');
    return new Date(JSON.parse(expiration));
  }

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
    console.log('redirectUrl =', this.redirectUrl);
  }

  redirectToLogin() {
    console.log('redirecting to /login');
    this.router.navigate(['/login']);
  }

  redirectToInitialRoute() {
    if (!!this.redirectUrl && this.redirectUrl !== '/login') {
      console.log('redirect to', this.redirectUrl);
      this.router.navigate([this.redirectUrl]);
    } else {
      this.router.navigate(['/']);
    }
  }

  hasAnyPermission(permissionNames: Array<string>): boolean {
    if (!this.currentUser) {
      return false;
    }

    if (this.currentUser.is_superuser === true) {
      return true;
    } else {
      if (this.currentUser.hasOwnProperty('permissions')) {
        const hasPermission = this.currentUser.user_permissions.find(permission => {
          return permissionNames.indexOf(permission.name) > -1;
        });
        return !!hasPermission;
      } else {
        return false;
      }
    }
  }
}
