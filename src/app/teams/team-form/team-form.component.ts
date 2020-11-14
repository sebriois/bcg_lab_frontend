import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {Team} from '../../models/team.model';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {TeamService} from '../../services/team.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit {
  public onClose: Subject<boolean>;

  team: Team;
  submitting: boolean;

  constructor(
    public bsModalRef: BsModalRef,
    private teamService: TeamService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.onClose = new Subject();
  }

  setTeam(team: Team) {
    this.team = team;
  }

  isValid(): boolean {
    if (!this.team.name) {
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

    if ( !!this.team.id ) {
      this.teamService.update(this.team).subscribe(() => {
        this.toastr.success('Equipe modifiée !', this.team.name);
        this.bsModalRef.hide();
        this.onClose.next(true);
        this.submitting = false;
      }, error => {
        this.submitting = false;
        if (error.hasOwnProperty('errors')) {
          error.errors.forEach(message => {
            this.toastr.error(message);
          });
        }
      });
    }
    else {
      this.teamService.create(this.team).subscribe(() => {
        this.submitting = false;
        this.toastr.success('Equipe ajoutée !', this.team.name);
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
