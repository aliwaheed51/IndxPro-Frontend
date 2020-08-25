import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { ProjectidealdesignstageModel } from './projectidealdesignstagegns.model';
import { ProjectidealdesignstageService } from './projectidealdesignstage.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
@Component({
  selector: 'app-projectidealdesignstagelist',
  templateUrl: './projectidealdesignstagelist.component.html',
})
export class ProjectidealdesignstagelistComponent extends MasterPage<ProjectidealdesignstageModel> implements OnInit {
  constructor(public service: ProjectidealdesignstageService, private formBuilder: FormBuilder, private utils: UtilityService,) { super(service); }
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridView: any[];
  gridData: ProjectidealdesignstageModel[];
  data: any;

  ngOnInit(): void {
    this.GetData();
    this.initForm();
  }
  initForm(): void {
    this.form = this.formBuilder.group({
      companyId: ['', Validators.required],
      srNo: ['', Validators.required],
      idealDesignStageList: ['', Validators.required],
    });
  }
  GetData() {
    this.service.Get().subscribe(result => {
      if (result.result !== null && result.result.length > 0) {
        this.gridData = result.result;
        this.gridView = this.gridData;
      } else {
        this.gridView = null;
      }
    });
  }

  onBack(): void {
    this.showDetails = false;
    this.GetData();
  }


  editClick(dataItem: any) {
    this.id = dataItem.id;
    this.form.reset();
    this.service.getOneById(this.id).subscribe((data) => {
      this.showDetails = true;
      this.data = data.result;
    });
  }

  addClick() {
    this.showDetails = true;
    this.data = null;
  }

  onDelete(id: number) {
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
            field: 'company.companyName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'srNo',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'idealDesignStageList',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;
    this.dataBinding.skip = 0;
  }
}
