import { Component, OnInit } from '@angular/core';
import {TeamService} from '../services/team.service';
import {Team} from '../models/team.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {TeamFormComponent} from './team-form/team-form.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  bsModalRef: BsModalRef;
  teams: Array<Team>;
  loading: boolean;

  constructor(
    private modalService: BsModalService,
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams() {
    this.loading = true;
    this.teamService.list().subscribe(response => {
      this.loading = false;
      this.teams = response;
    }, error => {
      this.loading = false;
    });
  }

  showCreateForm(): void {
    this.bsModalRef = this.modalService.show(TeamFormComponent);
    const team = new Team();
    this.bsModalRef.content.setTeam(team);
    this.bsModalRef.content.onClose.subscribe(shouldReload => {
      if (shouldReload) {
        this.loadTeams();
      }
    });
  }

  showEditForm(team: Team): void {
    this.bsModalRef = this.modalService.show(TeamFormComponent);
    this.bsModalRef.content.setTeam(team);
    this.bsModalRef.content.onClose.subscribe(shouldReload => {
      if (shouldReload) {
        this.loadTeams();
      }
    });
  }

}
