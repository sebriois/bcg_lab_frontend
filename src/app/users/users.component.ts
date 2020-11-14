import { Component, OnInit } from '@angular/core';
import {User} from '../models/users.model';
import {UserService} from '../services/user.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {UserFormComponent} from './user-form/user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  bsModalRef: BsModalRef;
  users: Array<User>;
  loading: boolean;

  constructor(
    private userService: UserService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.list().subscribe(response => {
      this.loading = false;
      this.users = response;
    }, error => {
      this.loading = false;
    });
  }

  showCreateForm(): void {
    this.bsModalRef = this.modalService.show(UserFormComponent);
    const user = new User();
    this.bsModalRef.content.setUser(user);
    this.bsModalRef.content.onClose.subscribe(shouldReload => {
      if (shouldReload) {
        this.loadUsers();
      }
    });
  }

  showEditForm(user: User): void {
    this.bsModalRef = this.modalService.show(UserFormComponent);
    this.bsModalRef.content.setUser(user);
    this.bsModalRef.content.onClose.subscribe(shouldReload => {
      if (shouldReload) {
        this.loadUsers();
      }
    });
  }

  setPassword(user) {

  }

  delete(user: User) {

  }
}
