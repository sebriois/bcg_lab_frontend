import { Component, OnInit } from '@angular/core';
import {User} from '../models/users.model';
import {AuthService} from '../services/auth.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isCollapsed: boolean;
  currentUser: User;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isCollapsed = false;
    this.currentUser = this.authService.getCurrentUser();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  displayVersion(): string {
    return environment.version;
  }
}
