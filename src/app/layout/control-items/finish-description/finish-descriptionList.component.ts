import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { FinishDescriptionService } from './finish-description.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { FinishDescriptionModel } from './finish-description.model';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-finish-descriptionList',
  templateUrl: './finish-descriptionList.component.html',
})
export class FinishDescriptionListComponent extends MasterPage<FinishDescriptionModel> implements OnInit {
  constructor(public service: FinishDescriptionService, private formBuilder: FormBuilder, private utils: UtilityService,) { super(service); }
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridView: any[];
  gridData: FinishDescriptionModel[];
  data: any;
  ngOnInit(): void {
    this.GetData();
  }

  GetData() {
    this.service.Get().subscribe(result => {
      if (result) {
        this.gridData = result;
        for (const item of this.gridData) {
          item.finishTypeName = item.finishTypes.finishType;
          item.finishCatergoriesName = item.finishCatergories.finishCatergories;
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
            field: 'finishTypeName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'finishCatergoriesName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'finishDescription',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;

    this.dataBinding.skip = 0;
  }
}
