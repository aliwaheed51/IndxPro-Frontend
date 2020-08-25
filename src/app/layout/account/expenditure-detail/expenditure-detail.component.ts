import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExpenditureDetailModel } from './expenditure-detail.model';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { ExpenditureDetailService } from './expenditure-detail.service';
import { BeneficiaryCategoryService } from '../beneficiary-category/beneficiary-category.service';
import { CompanyService } from '../../masters/company/company.service';
import { ExpenditureTypeService } from '../expenditure-type/expenditure-type.service';
import { CompanyBankAccountService } from '../company-bank-account/company-bank-account.service';
import { BeneficiaryNameService } from '../beneficiary-name/beneficiary-name.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FileModel } from '../../general-configuration/general-configuration/general-configuration.model';

@Component({
  selector: 'app-expenditure-detail',
  templateUrl: './expenditure-detail.component.html',
})
export class ExpenditureDetailComponent extends MasterPage<ExpenditureDetailModel> implements OnInit {
  profilePicPath: any;
  fileModel: FileModel;
  beneficiaryCategories: any;
  expenditureTypesAll: any;
  expenditureTypesCurrent: any;
  beneficiaryNames: any;
  companyBankAccounts: any;
  companies: any;
  paymentCategories: any;
  expenseTypes: any;
  paidBy: any;
  @Input() data: any;
  @Output() backClick: EventEmitter<any> = new EventEmitter();
  public mask: string = "(999) 00-000-00-00";
  public default = { value: "Select item...", id: '' };
  public isDisabledExpenditureType: boolean = true;
  public isDisabledBeneficiaryName: boolean = true;
  constructor(
    public companyService: CompanyService,
    public companyBankAccountService: CompanyBankAccountService,
    public beneficiaryCategoryService: BeneficiaryCategoryService,
    public expenditureTypeService: ExpenditureTypeService,
    public beneficiaryNameService: BeneficiaryNameService,
    public service: ExpenditureDetailService, private utils: UtilityService, private formBuilder: FormBuilder
  ) {
    super(service);
  }

  ngOnInit(): void {
    this.initForm();
    if (this.data != null && this.data.id > 0) {
      this.setdata(this.data);
    }
    this.getBeneficiaryCategories();
    this.getExpenditureTypes();
    this.getCompanies();

    this.paymentCategories = [
      { id: "Paid", value: "Paid" },
      { id: "Not Paid", value: "Not Paid" },
      { id: "Forcast", value: "Forcast" }
    ];
    this.expenseTypes = [
      { id: "Nonreimbursable", value: "Nonreimbursable" },
      { id: "Reimbursable", value: "Reimbursable" },
      { id: "Security deposit ", value: "Security deposit " }
    ];
    this.paidBy = [
      { id: "Cash", value: "Cash" },
      { id: "Card", value: "Card" },
      { id: "Bank Transfer", value: "Bank Transfer" }
    ];
  }

  getCompanies() {
    this.companyService.GetCompanyDropDownByUser().subscribe(result => {
      if (result.length > 0) {
        this.companies = result;
        if (this.data != null && this.data.id > 0) {
          this.handleCompanyChange(this.data.companyID);
        }
      }
    });
  }

  getBeneficiaryCategories() {
    this.beneficiaryCategoryService.GetBeneficiaryCategoryDropDown().subscribe(result => {
      if (result.length > 0) {
        this.beneficiaryCategories = result;
      }
    });
  }

  getExpenditureTypes() {
    this.expenditureTypeService.GetExpenditureTypeDropDown().subscribe(result => {
      if (result.length > 0) {
        this.expenditureTypesAll = result;
        this.expenditureTypesCurrent = [];
        if (this.data != null && this.data.id > 0) {
          this.handleBeneficiaryCategoryChange(this.data.beneficiaryCategoryID, true);
        }
      }
    });
  }

  handleBeneficiaryCategoryChange(value, isInit = false) {
    this.expenditureTypesCurrent = [];
    for (const iterator of this.expenditureTypesAll) {
      if (Number(iterator.extraData) === value) {
        this.expenditureTypesCurrent.push(iterator);
      }
    }

    if (!isInit) {
      this.form.controls['expenditureTypeID'].setValue('');
      this.form.controls['beneficiaryNameID'].setValue('');

      this.isDisabledExpenditureType = false;
      this.isDisabledBeneficiaryName = true;
    } else {
      if (this.data != null && this.data.id > 0) {
        this.isDisabledExpenditureType = false;
        this.handleExpenditureTypeChange(this.data.expenditureTypeID, true);
      }
    }
  }

  handleExpenditureTypeChange(value, isInit = false) {
    const beneficiaryCategoryID = this.form.get('beneficiaryCategoryID').value;
    this.beneficiaryNameService.GetBeneficiaryNameDropDownByExpenditureTypeAndBeneficiaryCat(beneficiaryCategoryID, value).subscribe(result => {
      if (result.length > 0) {
        this.beneficiaryNames = result;
        this.isDisabledBeneficiaryName = false;
      }
    });

    if (!isInit) {
      this.form.controls['beneficiaryNameID'].setValue('');
    }
  }

  handleCompanyChange(value) {
    this.companyBankAccountService.GetCompanyBankAccountDetailDropDownByCompany(value).subscribe(result => {
      if (result.length > 0) {
        this.companyBankAccounts = result;
      }
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      companyID: ['', Validators.required],
      paymentCategory: ['Paid', Validators.required],
      expenseType: ['Nonreimbursable', Validators.required],
      paid: [new Date(), Validators.required],
      beneficiaryCategoryID: ['', Validators.required],
      expenditureTypeID: ['', Validators.required],
      beneficiaryNameID: ['', Validators.required],
      amount: [0, Validators.required],
      vat: [0],
      currency: ['', Validators.required],
      paidBy: [''],
      paymentRefNumber: [''],
      companyBankAccDetailID: [''],
      invoiceNumber: [0],
      invoiceDate: [null],
      note: ['']
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
      paymentCategory: data.paymentCategory,
      expenseType: data.expenseType,
      paid: new Date(data.paid),
      beneficiaryCategoryID: data.beneficiaryCategoryID,
      expenditureTypeID: data.expenditureTypeID,
      beneficiaryNameID: data.beneficiaryNameID,
      amount: data.amount,
      vat: data.vat,
      currency: data.currency,
      paidBy: data.paidBy,
      paymentRefNumber: data.paymentRefNumber,
      companyBankAccDetailID: data.companyBankAccDetailID,
      invoiceNumber: data.invoiceNumber,
      invoiceDate: data.invoiceDate ? new Date(data.invoiceDate) : null,
      note: data.note
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

