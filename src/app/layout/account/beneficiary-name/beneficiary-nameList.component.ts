import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { BeneficiaryNameService } from './beneficiary-name.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { BeneficiaryNameModel } from './beneficiary-name.model';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-beneficiary-nameList',
  templateUrl: './beneficiary-nameList.component.html',
})
export class BeneficiaryNameListComponent extends MasterPage<BeneficiaryNameModel> implements OnInit {
  constructor(public service: BeneficiaryNameService, private formBuilder: FormBuilder, private utils: UtilityService,) { super(service); }
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridView: any[];
  gridData: BeneficiaryNameModel[];
  data: any;
  ngOnInit(): void {
    this.GetData();
  }

  GetData() {
    this.service.Get().subscribe(result => {
      if (result.length > 0) {
        this.gridData = result;
        for (const item of this.gridData) {
          item.beneficiaryCategoryName = item.beneficiaryCategory.beneficiaryCategoryName;
          item.expenditureTypeName = item.expenditureType.expenditureTypeName;
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
            field: 'expenditureTypeName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'beneficiaryCategoryName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'beneficiaryName',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;

    this.dataBinding.skip = 0;
  }
}
