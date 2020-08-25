import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { ExpenditureDetailService } from './expenditure-detail.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { ExpenditureDetailModel } from './expenditure-detail.model';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-expenditure-detailList',
  templateUrl: './expenditure-detailList.component.html',
})
export class ExpenditureDetailListComponent extends MasterPage<ExpenditureDetailModel> implements OnInit {
  constructor(public service: ExpenditureDetailService, private formBuilder: FormBuilder, private utils: UtilityService,) { super(service); }
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridView: any[];
  gridDataAll: ExpenditureDetailModel[];
  gridData: ExpenditureDetailModel[];
  selectedPaymentCategory: any;
  data: any;
  public paymentCategories = [
    { text: 'Paid', color: '#f0c505', selected: true },
    { text: 'Not Paid', color: '#10b507', selected: false },
    { text: 'Forcast', color: '#707070', selected: false }
  ];

  public onPaymentCategoryClick(e, cat) {
    this.gridData = this.gridDataAll.filter(item => item.paymentCategory === cat.text);
    this.gridView = this.gridData;
    this.selectedPaymentCategory = cat;
  }

  ngOnInit(): void {
    this.GetData();
    this.selectedPaymentCategory = this.paymentCategories[0];
  }

  GetData() {
    this.service.Get().subscribe(result => {
      if (result) {
        this.gridData = result;
        for (const item of this.gridData) {
          item.beneficiaryCategoryName = item.beneficiaryCategory.beneficiaryCategoryName;
          item.expenditureTypeName = item.expenditureType.expenditureTypeName;
          item.beneficiaryNameName = item.beneficiaryName.beneficiaryName;
          item.companyBankAccDetailName = item.companyBankAccountDetail ? item.companyBankAccountDetail.accountName : '';
          item.companyName = item.company.companyName;
        }
        this.gridDataAll = this.gridData;
        this.gridView = this.gridData;
        this.onPaymentCategoryClick(null, this.selectedPaymentCategory);
      }
    });
  }

  onBack(): void {
    this.showDetails = false;
    this.GetData();
  }


  editClick(id: any) {
    this.id = id;
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
            field: 'paymentCategory',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'expenseType',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'paid',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'beneficiaryCategoryName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'expenditureTypeName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'beneficiaryNameName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'amount',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'vat',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'currency',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'paidBy',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'paymentRefNumber',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'companyBankAccDetailName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'invoiceNumber',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'invoiceDate',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'note',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;

    this.dataBinding.skip = 0;
  }
}
