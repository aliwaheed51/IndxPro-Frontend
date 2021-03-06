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
import { SchedulerEvent } from '@progress/kendo-angular-scheduler';
import { sampleData, displayDate } from '../events-utc';

@Component({
  selector: 'app-timesheet-list',
  templateUrl: './timesheet-list.component.html',
  styleUrls: ['./timesheet-list.component.scss'],
})
export class TimesheetListComponent
  extends MasterPage<TimeSheetModel>
  implements OnInit {
  @ViewChild('timesheetGrid') private timesheetGrid: {
    collapseGroup: (arg0: string) => void;
  };
  public selectedDate: Date = displayDate;
  public events: SchedulerEvent[] = sampleData;
  showGrid: boolean;
  public groups: GroupDescriptor[] = [
    { field: 'company' },
    // { field: 'employee' },
    // { field: 'project' },
  ];
  constructor(
    public service: TimeSheetService,
    private formBuilder: FormBuilder,
    private utils: UtilityService
  ) {
    super(service);
    this.showGrid = true;
  }
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;

  public gridView: DataResult;
  gridData: TimeSheetModel[];
  data: any;
  ngOnInit(): void {
    this.GetData();
  }

  ngAfterViewChecked() {
    this.gridView.data.forEach((_, index) => {
      this.timesheetGrid.collapseGroup(String(index));
    });
  }
  GetData() {
    this.gridData = this.service.GetStaticData();
    this.gridView = process(this.gridData, { group: this.groups });
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
    // this.gridView = process(this.gridData, {
    //   filter: {
    //     logic: 'or',
    //     filters: [
    //       {
    //         field: 'company',
    //         operator: 'contains',
    //         value: inputValue,
    //       },
    //       {
    //         field: 'employee',
    //         operator: 'contains',
    //         value: inputValue,
    //       },
    //       {
    //         field: 'project',
    //         operator: 'contains',
    //         value: inputValue,
    //       },
    //       {
    //         field: 'projectArea',
    //         operator: 'contains',
    //         value: inputValue,
    //       },
    //       {
    //         field: 'designStages',
    //         operator: 'contains',
    //         value: inputValue,
    //       },
    //       {
    //         field: 'deliverables',
    //         operator: 'contains',
    //         value: inputValue,
    //       },
    //       {
    //         field: 'subDeliverables',
    //         operator: 'contains',
    //         value: inputValue,
    //       },
    //       {
    //         field: 'remarks',
    //         operator: 'contains',
    //         value: inputValue,
    //       },
    //       {
    //         field: 'checkin',
    //         operator: 'contains',
    //         value: inputValue,
    //       },
    //       {
    //         field: 'checkout',
    //         operator: 'contains',
    //         value: inputValue,
    //       },
    //     ],
    //   },
    // }).data;

    this.dataBinding.skip = 0;
  }
  public groupChange(groups: GroupDescriptor[]): void {
    this.groups = groups;
    this.GetData();
  }
  onShowGridBtnClick() {
    if (this.showGrid) {
      this.showGrid = false;
    } else {
      this.showGrid = true;
    }
  }
}
