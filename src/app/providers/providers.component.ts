import {Component, OnInit, Provider} from '@angular/core';
import {Pagination} from '../models/pagination.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ProviderFormComponent} from './provider-form/provider-form.component';
import {ProviderService} from '../services/provider.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {
  bsModalRef: BsModalRef;
  loading: boolean;
  pagination: Pagination;
  providers: Array<Provider>;

  constructor(
    private modalService: BsModalService,
    private providerService: ProviderService
  ) { }

  ngOnInit(): void {
    this.initPagination();
  }

  initPagination() {
    this.pagination = {
      totalItems: 0,
      itemsPerPage: 50,
      currentPage: 1,
      nextPage: null,
      prevPage: null
    };
  }

  getPage(event) {
    this.providerService.retrieve(event.page).subscribe(response => {
      this.pagination.totalItems = response.count;
      this.pagination.currentPage = event.page;
      this.pagination.nextPage = response.next;
      this.pagination.prevPage = response.previous;
      this.providers = response.results;
    });

  }

  showCreateForm(): void {
    this.bsModalRef = this.modalService.show(ProviderFormComponent);
  }

  showEditForm(provider: Provider): void {
    this.bsModalRef = this.modalService.show(ProviderFormComponent);
    this.bsModalRef.content.setProvider(provider);
  }
}
