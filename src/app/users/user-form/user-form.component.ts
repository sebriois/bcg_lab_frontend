import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../services/user.service';
import {TeamService} from '../../services/team.service';
import {User} from '../../models/users.model';
import {Team} from '../../models/team.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  public onClose: Subject<boolean>;

  teams: Array<Team>;
  loading: boolean;

  user: User;
  submitting: boolean;

  constructor(
    public bsModalRef: BsModalRef,
    private userService: UserService,
    private teamService: TeamService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.onClose = new Subject();
    this.loading = true;
    this.teamService.list().subscribe(response => {
      this.loading = false;
      this.teams = response;
    }, error => {
      this.loading = false;
    });
  }

  setUser(user: User) {
    this.user = user;
  }

  isValid(): boolean {
    if (!this.user.username) {
      return false;
    }
    return true;
  }

  closeModal() {
    this.bsModalRef.hide();
    this.onClose.next(false);
  }

  updateOrCreate() {
    this.submitting = true;

    if ( !!this.user.id ) {
      this.userService.update(this.user).subscribe(() => {
        this.toastr.success('Utilisateur modifié avec succès.', this.user.username);
        this.bsModalRef.hide();
        this.onClose.next(true);
        this.submitting = false;
      }, error => {
        this.submitting = false;
        console.log(error);
        if (error.hasOwnProperty('errors')) {
          error.errors.forEach(message => {
            this.toastr.error(message);
          });
        }
      });
    }
    else {
      this.userService.create(this.user).subscribe(() => {
        this.submitting = false;
        this.toastr.success('Utilisateur ajouté avec succès.', this.user.username);
        this.bsModalRef.hide();
        this.onClose.next(true);
      }, httpResponse => {
        this.submitting = false;
        if (httpResponse.error.hasOwnProperty('errors')) {
          httpResponse.error.errors.forEach(message => {
            this.toastr.error(message);
          });
        }
      });
    }
  }

}
