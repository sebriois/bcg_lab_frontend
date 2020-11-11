import {Component, OnChanges, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Provider, Reseller} from '../../models/providers.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ProviderService} from '../../services/provider.service';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.scss']
})
export class ProviderFormComponent implements OnInit, OnChanges {

  providerForm: FormGroup;
  resellers: Array<Reseller>;
  submitting: boolean;
  hasErrors = false;
  provider: Provider;

  constructor(
    public bsModalRef: BsModalRef,
    private providerService: ProviderService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.providerForm = this.formBuilder.group({
      id: '',
      name: ['', [Validators.required]],
      reseller: null,
      direct_reception: false,
      is_local: false,
      is_service: false,
      notes: '',
      users_in_charge: [[]]
    });
    this.providerService.getResellers().subscribe(resellers => {
      this.resellers = resellers;
    });
  }

  ngOnChanges() {
    this.providerForm.reset({
      id: this.provider && this.provider.id || null,
      name: this.provider && this.provider.name || '',
      reseller: this.provider && this.provider.reseller || null,
      direct_reception: this.provider && this.provider.direct_reception || false,
      is_local: this.provider && this.provider.is_local || false,
      is_service: this.provider && this.provider.is_service || false,
      notes: this.provider && this.provider.notes || '',
      users_in_charge: this.provider && this.provider.users_in_charge || []
    });
  }

  setProvider(provider: Provider) {
    this.provider = provider;
    this.ngOnChanges();
  }

  prepareSaveProvider(): Provider {
    const formModel = this.providerForm.value;

    const saveProvider: Provider = {
      id: formModel.id,
      name: formModel.name as string,
      direct_reception: formModel.direct_reception as boolean,
      is_local: formModel.is_local as boolean,
      is_service: formModel.is_service as boolean,
      notes: formModel.notes as string,
      reseller: formModel.reseller as number
    };

    if (formModel.users_in_charge) {
      saveProvider.users_in_charge = formModel.users_in_charge;
    }

    if (this.provider) {
      saveProvider.id = this.provider.id;
    }

    return saveProvider;
  }

  revert() {
    this.ngOnChanges();
  }

  updateOrCreate() {
    this.submitting = true;
    const saveProvider = this.providerForm.value;

    if ( this.provider ) {
      this.providerService.update(saveProvider).subscribe(() => {
        this.toastr.success('Fournisseur modifié avec succès.', saveProvider.name);
        this.bsModalRef.hide();
        this.submitting = false;
      }, response => {
        this.submitting = false;
        response.error.forEach(fieldName => {
          if (this.providerForm.controls.hasOwnProperty(fieldName)) {
            this.providerForm.controls[fieldName].setErrors({incorrect: true});
          }
        });
        this.hasErrors = true;
      });
    }
    else {
      this.providerService.create(saveProvider).subscribe(() => {
        this.submitting = false;
        this.toastr.success('Fournisseur ajouté avec succès.', saveProvider.name);
        this.bsModalRef.hide();
      }, response => {
        this.submitting = false;
        response.error.forEach(fieldName => {
          if (this.providerForm.controls.hasOwnProperty(fieldName)) {
            this.providerForm.controls[fieldName].setErrors({incorrect: true});
          }
        });
        this.hasErrors = true;
      });
    }
  }

}
