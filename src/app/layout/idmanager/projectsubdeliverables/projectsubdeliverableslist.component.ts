import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectsubdeliverablesService } from './projectsubdeliverables.service';
import { ProjectdeliverablesService } from '../projectdeliverables/projectdeliverables.service';
import { FormBuilder } from '@angular/forms';
import { UtilityService } from 'src/app/core/services/utility.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { ProjectsubdeliverablesModel } from './projectsubdeliverables.model';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-projectsubdeliverableslist',
  templateUrl: './projectsubdeliverableslist.component.html',
})
export class ProjectsubdeliverableslistComponent extends MasterPage<ProjectsubdeliverablesModel> implements OnInit {
   @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridView: any[];
  gridData: ProjectsubdeliverablesModel[];
  data: any;
  constructor(public service : ProjectsubdeliverablesService, 
    public projectdeliverablesService: ProjectdeliverablesService,
    private utils: UtilityService, private formBuilder: FormBuilder) {
    super(service);
  }
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
            field: 'srNo',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'projectDeliverablesText',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'idealDesignStageList',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'projectSubDeliverablesText',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;
    this.dataBinding.skip = 0;
  }
}
