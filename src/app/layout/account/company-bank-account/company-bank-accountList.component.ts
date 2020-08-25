import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../masters/user/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { CompanyBankAccountService } from './company-bank-account.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { CompanyBankAccountModel } from './company-bank-account.model';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-company-bank-accountList',
  templateUrl: './company-bank-accountList.component.html',
  styleUrls: ['./company-bank-accountList.component.scss']
})
export class CompanyBankAccountListComponent extends MasterPage<CompanyBankAccountModel> implements OnInit {
  constructor(public service: CompanyBankAccountService, private formBuilder: FormBuilder, private utils: UtilityService,) { super(service); }
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridView: any[];
  gridData: CompanyBankAccountModel[];
  data: any;
  ngOnInit(): void {
    this.GetData();
    this.initForm();
  }
  initForm(): void {
    this.form = this.formBuilder.group({
      companyName: ['', Validators.required],
      bankName: ['', Validators.required],
      bankBranch: ['', Validators.required],
      swiftCode: ['', Validators.required,],
      accountName: ['', Validators.required],
      accountNo: ['', Validators.required],
      iban: ['', Validators.required],
      accountCurrency: ['', Validators.required]
    });
  }

  GetData() {
    this.service.Get().subscribe(result => {
      if (result.length > 0) {
        this.gridData = result;
        for (const item of this.gridData) {
          item.companyName = item.company.companyName;
        }
        this.gridView = this.gridData;
      }
    });
  }

  onBack(): void {
    this.showDetails = false;
    this.GetData();
  }


  editClick(id: any) {
    this.id = id;
    this.form.reset();
    this.service.getOneById(this.id).subscribe((data) => {
      this.showDetails = true;
      this.data = data;
    });
  }

  addClick() {
    this.showDetails = true;
    this.data = null;
  }

  onDelete(id: number) {
    this.utils.toast.recordDeleted();
    this.service.delete(id).subscribe(
      () => {
        this.utils.toast.recordDeleted();
        this.GetData();
      },
      (failed) => {
        this.utils.toast.error(failed.error.message[0], 'Error');
      }
    );
  }

  public onFilter(inputValue: string): void {
    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: 'companyName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'bankName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'bankBranch',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'swiftCode',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'accountName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'accountNo',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'iban',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'accountCurrency',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;


    this.dataBinding.skip = 0;
  }
}
