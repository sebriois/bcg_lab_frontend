import { Component, OnInit } from '@angular/core';
import {User} from '../models/users.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isCollapsed: boolean;
  currentUser: User;

  constructor() { }

  ngOnInit(): void {
    this.isCollapsed = false;
    this.currentUser = {
      username: 'briois'
    };
  }

  isLoggedIn(): boolean {
    return true;
  }

  displayVersion(): string {
    return 'DEV';
  }
}
