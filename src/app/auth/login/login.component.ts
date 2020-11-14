import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../services/auth.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  version = environment.version;
  username: string;
  password: string;
  loading = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.redirectIfLoggedIn();
  }

  redirectIfLoggedIn(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.redirectToInitialRoute();
    }
  }

  login(): void {
    this.loading = true;

    this.authService.login(this.username, this.password).subscribe(
      response => {
        this.authService.redirectToInitialRoute();
        this.loading = false;
      },
      error => {
        this.loading = false;
        console.log(error);
        if (!!error && error.hasOwnProperty('error') && error.error.hasOwnProperty('non_field_errors')) {
          this.toastr.error(error.error.non_field_errors, 'Login failed');
        }
        this.authService.logout();
      },
      () => {
        this.loading = false;
      }
    );
  }
}
