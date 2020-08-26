import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { TimeSheetService } from '../timesheet.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { TimeSheetModel } from '../timesheet.model';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import {
  process,
  GroupDescriptor,
  DataResult,
} from '@progress/kendo-data-query';

@Component({
  selector: 'app-timesheet-list',
  templateUrl: './timesheet-list.component.html',
  styleUrls: ['./timesheet-list.component.scss'],
})
export class TimesheetListComponent extends MasterPage<TimeSheetModel>
  implements OnInit {
  public groups: GroupDescriptor[] = [
    // { field: 'company' },
    // { field: 'employee' },
    // { field: 'project' },
  ];
  constructor(
    public service: TimeSheetService,
    private formBuilder: FormBuilder,
    private utils: UtilityService
  ) {
    super(service);
  }
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;

  public gridView: any[];
  gridData: TimeSheetModel[];
  data: any;
  ngOnInit(): void {
    this.GetData();
  }

  GetData() {
    this.gridData = this.service.GetStaticData();
    this.gridView = this.gridData;
  }

  onBack(): void {
    this.showDetails = false;
    this.GetData();
  }

  editClick(id: any) {
    this.data = this.service.GetDataById(id);
    this.showDetails = true;
  }

  addClick() {
    this.showDetails = true;
    this.data = null;
  }

  onDelete(id: number) {
    //this.service.DeleteStaticDataById(id);
    this.utils.toast.recordDeleted();
    this.GetData();
  }

  public onFilter(inputValue: string): void {
    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'company',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'employee',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'project',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'projectArea',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'designStages',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'deliverables',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'subDeliverables',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'remarks',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'checkin',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'checkout',
            operator: 'contains',
            value: inputValue,
          },
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }
  public groupChange(groups: GroupDescriptor[]): void {
    this.groups = groups;
    this.GetData();
  }
}
