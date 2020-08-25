import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { UtilityService } from 'src/app/core/services/utility.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
import { ProjectdeliverablesModel } from './projectdeliverables.model';
import { ProjectdeliverablesService } from './projectdeliverables.service';
@Component({
  selector: 'app-projectdeliverableslist',
  templateUrl: './projectdeliverableslist.component.html',
})
export class ProjectdeliverableslistComponent extends MasterPage<ProjectdeliverablesModel> implements OnInit {
  constructor(public service: ProjectdeliverablesService, private formBuilder: FormBuilder, private utils: UtilityService,) { super(service); }
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridView: any[];
  gridData: ProjectdeliverablesModel[];
  data: any;

  ngOnInit(): void {
    this.GetData();
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
        console.log(id);
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
          },
          {
            field: 'projectIDealDesignStage.idealDesignStageList',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;
    this.dataBinding.skip = 0;
  }
}
