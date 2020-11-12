import {Component, OnInit} from '@angular/core';
import {Pagination} from '../models/pagination.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ProviderFormComponent} from './provider-form/provider-form.component';
import {ProviderService} from '../services/provider.service';
import { Provider } from '../models/providers.model';
import {ToastrService} from 'ngx-toastr';

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
    private providerService: ProviderService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.pagination = new Pagination();
    this.loadProviders();
  }

  loadProviders(page = 1) {
    this.loading = true;
    this.providerService.list(page.toString()).subscribe(response => {
      this.pagination.totalItems = response.count;
      this.pagination.currentPage = page;
      this.pagination.nextPage = response.next;
      this.pagination.prevPage = response.previous;
      this.providers = response.results;
      this.loading = false;
    }, error => {
      this.toastr.error(error);
      this.loading = false;
    });

  }

  showCreateForm(): void {
    this.bsModalRef = this.modalService.show(ProviderFormComponent);
    const provider = new Provider();
    this.bsModalRef.content.setProvider(provider);
    this.bsModalRef.content.onClose.subscribe(shouldReload => {
      if (shouldReload) {
        this.loadProviders();
      }
    });
  }

  showEditForm(provider: Provider): void {
    this.bsModalRef = this.modalService.show(ProviderFormComponent);
    this.bsModalRef.content.setProvider(provider);
    this.bsModalRef.content.onClose.subscribe(shouldReload => {
      if (shouldReload) {
        this.loadProviders();
      }
    });
  }
}
