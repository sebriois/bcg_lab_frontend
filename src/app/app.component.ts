import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bcglab-frontend';

  constructor(
    private authService: AuthService
  ) {
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
