import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { ProjectService } from './project.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { ProjectModel } from './project.model';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-projectList',
  templateUrl: './projectList.component.html',
})
export class ProjectListComponent extends MasterPage<ProjectModel> implements OnInit {
  constructor(public service: ProjectService, private formBuilder: FormBuilder, private utils: UtilityService,) { super(service); }
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridView: any[];
  gridData: ProjectModel[];
  data: any;
  ngOnInit(): void {
    this.GetData();
  }

  GetData() {
    this.service.Get().subscribe(result => {
      if (result.length > 0) {
        this.gridData = result;
        for (const item of this.gridData) {
          item.companyName = item.company.companyName;
          item.departmentName = item.department.departmentName;
          item.clientName = item.client.clientCompanyName;

          item.company = null;
          item.department = null;
          item.client = null;
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
            field: 'companyName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'projectRefNumber',
            operator: 'contains',
            value: inputValue
          },
          // {
          //   field: 'isActive',
          //   operator: 'contains',
          //   value: inputValue
          //},
          {
            field: 'totalProjectBudget',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'startingDate',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'deadline',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'completionDate',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'departmentName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'clientName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'contractID',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;

    this.dataBinding.skip = 0;
  }
}
