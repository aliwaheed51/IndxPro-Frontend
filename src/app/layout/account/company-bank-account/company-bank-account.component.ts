import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CompanyBankAccountModel } from './company-bank-account.model';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { CompanyBankAccountService } from './company-bank-account.service';
import { CompanyService } from '../../masters/company/company.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FileModel } from '../../general-configuration/general-configuration/general-configuration.model';

@Component({
  selector: 'app-company-bank-account',
  templateUrl: './company-bank-account.component.html',
  styleUrls: ['./company-bank-account.component.scss']
})
export class CompanyBankAccountComponent extends MasterPage<CompanyBankAccountModel> implements OnInit {
  profilePicPath: any;
  fileModel: FileModel;
  companies: any;
  @Input() data: any;
  @Output() backClick: EventEmitter<any> = new EventEmitter();
  public mask: string = "(999) 00-000-00-00";
  public defaultCompany = { value: "Select item...", id: '' };
  constructor(public companyService: CompanyService, public service: CompanyBankAccountService, private utils: UtilityService, private formBuilder: FormBuilder) {
    super(service);
  }

  ngOnInit(): void {
    this.initForm();
    if (this.data != null && this.data.id > 0) {
      this.setdata(this.data);
    }
    this.getCompanies();
  }

  getCompanies() {
    this.companyService.GetCompanyDropDownByUser().subscribe(result => {
      if (result.length > 0) {
        this.companies = result;
      }
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      companyID: ['', Validators.required],
      bankName: ['', Validators.required],
      bankBranch: ['', Validators.required],
      swiftCode: ['', Validators.required,],
      accountName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      iban: ['', Validators.required],
      accCurrency: ['', Validators.required]
    });
  }

  onEdit(id: number): void {
    this.id = id;
    this.form.reset();
    this.subs = this.service.getOneById(this.id).subscribe((data) => {
      this.showDetails = true;
      this.setdata(data);
    });
  }
  setdata(data: any): void {
    this.id = data.id;
    this.form.setValue({
      companyID: data.companyID,
      bankName: data.bankName,
      bankBranch: data.bankBranch,
      swiftCode: data.swiftCode,
      accountName: data.accountName,
      accountNumber: data.accountNumber,
      iban: data.iban,
      accCurrency: data.accCurrency
    });
  }

  onSave(): void {
    const data = this.form.value;
    data.id = this.id;
    this.subs = this.service.save(data, this.id).subscribe((res) => {
      this.showDetails = false;
      this.utils.toast.recordSaved();
      this.backClick.emit();
    });
  }

  onReset(): void {
    this.form.reset();
    if (this.id > 0) {
      this.onEdit(this.id);
    }
  }

  onBack() {
    this.showDetails = false;
  }

}
