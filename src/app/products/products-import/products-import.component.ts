import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProviderService} from '../../services/provider.service';
import {ToastrService} from 'ngx-toastr';
import {Provider} from '../../models/providers.model';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/products.model';

@Component({
  selector: 'app-products-import',
  templateUrl: './products-import.component.html',
  styleUrls: ['./products-import.component.scss']
})
export class ProductsImportComponent implements OnInit {
  provider: Provider;
  loading: boolean;

  xlsFile: File;
  fileHeader: Array<string>;
  fileContent: Array<any>;
  eraseExisting: boolean;
  offer_nb: string;
  expiry: Date;

  columns = [
    {id: 'name', name: 'Désignation'},
    {id: 'reference', name: 'Référence'},
    {id: 'price', name: 'Prix'},
    {id: 'packaging', name: 'Conditionnement'},
    {id: 'nomenclature', name: 'Nomenclature'},
    {id: 'origin', name: 'Fournisseur d\'origine'},
    {id: 'offer_nb', name: 'Offre'},
    {id: 'expiry', name: 'Expiration'},
  ];

  constructor(
    private route: ActivatedRoute,
    private providerService: ProviderService,
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadProvider(params.id);
    });
  }

  loadProvider(id: string) {
    this.loading = true;
    this.providerService.retrieve(id).subscribe(provider => {
      this.provider = provider;
      this.loading = false;
    }, httpResponseError => {
      this.loading = false;
      this.toastr.error(httpResponseError.error);
    });
  }

  importProducts() {
    this.fileContent.filter(doc => doc.isSelected && !doc.isInvalid && !doc.submitting).forEach(doc => {
      doc.submitting = true;
      const product = new Product();
      product.provider_id = this.provider.id;
      this.columns.forEach((column, idx) => {
        product[column.id] = doc.data[idx];
      });
      if (!!this.offer_nb) {
        product.offer_nb = this.offer_nb;
      }
      if (!!this.expiry) {
        product.expiry = this.expiry.toISOString();
      } else if (!!product.expiry) {
        const expiry = moment(product.expiry, 'DD/MM/YYYY', true);
        product.expiry = expiry.toISOString();
      }

      this.productService.create(product).subscribe(response => {
        doc.submitting = false;
        doc.product = response;
      }, httpResponseError => {
        doc.submitting = false;
        doc.errors = httpResponseError.error.errors;
      });
    });
  }

  isSubmitting(): boolean {
    return !!this.fileContent && this.fileContent.filter(doc => doc.submitting).length > 0;
  }

  readFile(event) {
    this.xlsFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(this.xlsFile);
    fileReader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* select the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data: Array<Array<string>> = XLSX.utils.sheet_to_json(ws, {header: 1});
      this.fileContent = data.map((row, idx) => {
        return {
          rowIdx: idx,
          isSelected: true,
          invalidColumns: [],
          data: row
        };
      });
    };
  }

  isInvalid(doc): boolean {
    doc.invalidColumns = [];

    const productIdx = this.columns.findIndex(col => col.id === 'name');
    if (!doc.data[productIdx]) {
      doc.invalidColumns.push(productIdx);
    }

    const referenceIdx = this.columns.findIndex(col => col.id === 'reference');
    if (!doc.data[referenceIdx]) {
      doc.invalidColumns.push(referenceIdx);
    }

    if (!!doc.data[productIdx] && !!doc.data[referenceIdx]) {
      const hasDuplicate = this.fileContent.find(otherDoc => {
        return otherDoc.rowIdx !== doc.rowIdx
          && !otherDoc.isInvalid
          && otherDoc.data[productIdx] === doc.data[productIdx]
          && otherDoc.data[referenceIdx] === doc.data[referenceIdx];
      });
      if (hasDuplicate) {
        console.log(hasDuplicate, doc);
        doc.invalidColumns.push(productIdx);
        doc.invalidColumns.push(referenceIdx);
      }
    }

    const priceFieldIdx = this.columns.findIndex(col => col.id === 'price');
    if (!doc.data[priceFieldIdx] || isNaN(doc.data[priceFieldIdx])) {
      doc.invalidColumns.push(priceFieldIdx);
    }

    const expiryIdx = this.columns.findIndex(col => col.id === 'expiry');
    if (!!doc.data[expiryIdx]) {
      const date = moment(doc.data[expiryIdx], 'DD/MM/YYYY', true);
      if (!date.isValid()) {
        doc.invalidColumns.push(expiryIdx);
      }
    }

    doc.isInvalid = doc.invalidColumns.length > 0;
    doc.isSelected = !doc.isInvalid;
    return doc.isInvalid;
  }

  isInvalidCol(doc, index): boolean {
    return doc.invalidColumns.indexOf(index) > -1;
  }
}
