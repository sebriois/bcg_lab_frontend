import {Component, EventEmitter, OnChanges, OnInit, Output} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Provider, Reseller} from '../../models/providers.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ProviderService} from '../../services/provider.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.scss']
})
export class ProviderFormComponent implements OnInit {
  public onClose: Subject<boolean>;

  provider: Provider;
  resellers: Array<Reseller>;
  submitting: boolean;

  constructor(
    public bsModalRef: BsModalRef,
    private providerService: ProviderService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.onClose = new Subject();
    this.providerService.getResellers().subscribe(resellers => {
      this.resellers = resellers;
    });
  }

  setProvider(provider: Provider) {
    this.provider = provider;
  }

  isValid(): boolean {
    if (!this.provider.name) {
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

    if ( !!this.provider.id ) {
      this.providerService.update(this.provider).subscribe(() => {
        this.toastr.success('Fournisseur modifié avec succès.', this.provider.name);
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
      this.providerService.create(this.provider).subscribe(() => {
        this.submitting = false;
        this.toastr.success('Fournisseur ajouté avec succès.', this.provider.name);
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
