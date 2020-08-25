import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { SpecificationTypesService } from './specification-types.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { SpecificationTypesModel } from './specification-types.model';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-specification-typesList',
  templateUrl: './specification-typesList.component.html',
})
export class SpecificationTypesListComponent extends MasterPage<SpecificationTypesModel> implements OnInit {
  constructor(public service: SpecificationTypesService, private formBuilder: FormBuilder, private utils: UtilityService,) { super(service); }
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridView: any[];
  gridData: SpecificationTypesModel[];
  data: any;
  ngOnInit(): void {
    this.GetData();
  }

  GetData() {
    this.service.Get().subscribe(result => {
      if (result) {
        this.gridData = result;
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
            field: 'specificationCode',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'specificationName',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;

    this.dataBinding.skip = 0;
  }
}
