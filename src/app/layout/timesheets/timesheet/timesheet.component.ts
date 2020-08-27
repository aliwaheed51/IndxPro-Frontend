import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimeSheetModel } from '../timesheet.model';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { TimeSheetService } from '../timesheet.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IntlService } from '@progress/kendo-angular-intl';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
})
export class TimesheetComponent
  extends MasterPage<TimeSheetModel>
  implements OnInit {
  companies: any;
  projects: any;
  projectAreas: any;
  designStages: any;
  deliverables: any;
  subDeliverables: any;
  @Input() data: any;
  @Output() backClick: EventEmitter<any> = new EventEmitter();
  public mask: string = '(999) 00-000-00-00';
  public defaultCompany = { copmany: 'Select item...', companyId: '' };
  public defaultProject = { project: 'Select item...', projectId: '' };
  public defaultProjectArea = {
    projectArea: 'Select item...',
    projectAreaId: '',
  };
  public defaultDesignStage = {
    designStage: 'Select item...',
    designStageId: '',
  };
  public defaultDeliverable = {
    deliverable: 'Select item...',
    deliverableId: '',
  };
  public defaultSubDeliverable = {
    subDeliverable: 'Select item...',
    subDeliverableId: '',
  };
  constructor(
    public service: TimeSheetService,
    private utils: UtilityService,
    private formBuilder: FormBuilder,
    private intl: IntlService
  ) {
    super(service);
  }

  ngOnInit(): void {
    this.getCompanies();
    this.getProjects();
    this.getProjectAreas();
    this.getDesignStages();
    this.getDeliverables();
    this.getSubDeliverables();
    this.initForm();
    if (this.data != null && this.data.id > 0) {
      this.setdata(this.data);
    }
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      companiesDD: ['', Validators.required],
      employee: ['', Validators.required],
      projectsDD: ['', Validators.required],
      projectAreasDD: ['', Validators.required],
      designStagesDD: ['', Validators.required],
      deliverablesDD: ['', Validators.required],
      subDeliverablesDD: ['', Validators.required],
      remarks: ['', Validators.required],
      checkin: [new Date(), Validators.required],
      checkout: [new Date(), Validators.required],
    });
  }

  onEdit(id: number): void {
    this.id = id;
    this.form.reset();
    this.showDetails = true;
    this.setdata(this.service.GetDataById(this.id));
  }
  setdata(data: any): void {
    this.id = data.id;
    this.form.setValue({
      companiesDD: data.companyId,
      employee: data.employee,
      projectsDD: data.projectId,
      projectAreasDD: data.projectAreaId,
      designStagesDD: data.designStageId,
      deliverablesDD: data.deliverableId,
      subDeliverablesDD: data.subDeliverableId,
      remarks: data.remarks,
      checkin:  new Date(data.checkin),
      checkout:  new Date(data.checkout),
    });
  }

  onSave(): void {
    const data = this.form.value;
    data.id = this.id;
    this.companies.forEach((item: { id: any; value: any }) => {
      if (data.companiesDD === item.id) {
        data.company = item.value;
      }
    });

    this.projects.forEach((item: { id: any; value: any }) => {
      if (data.projectsDD === item.id) {
        data.project = item.value;
      }
    });

    this.projectAreas.forEach((item: { id: any; value: any }) => {
      if (data.projectAreasDD === item.id) {
        data.projectArea = item.value;
      }
    });

    this.designStages.forEach((item: { id: any; value: any }) => {
      if (data.designStagesDD === item.id) {
        data.designStage = item.value;
      }
    });

    this.deliverables.forEach((item: { id: any; value: any }) => {
      if (data.deliverablesDD === item.id) {
        data.deliverable = item.value;
      }
    });

    this.subDeliverables.forEach((item: { id: any; value: any }) => {
      if (data.subDeliverablesDD === item.id) {
        data.subDeliverable = item.value;
      }
    });
    data.checkin = this.service.GetDateTime(data.checkin);
    data.checkout = this.service.GetDateTime(data.checkout);
    this.service.SaveData(data);
    this.showDetails = false;
    this.utils.toast.recordSaved();
    this.backClick.emit();
  }

  onReset(): void {
    this.form.reset();
    if (this.id > 0) {
      this.onEdit(this.id);
    }
  }

  onBack() {
    this.showDetails = false;
  }

  getCompanies(): void {
    this.companies = this.service.GetCompanies();
  }
  getProjects(): void {
    this.projects = this.service.GetProjects();
  }
  getProjectAreas(): void {
    this.projectAreas = this.service.GetProjectAreas();
  }
  getDesignStages(): void {
    this.designStages = this.service.GetDesignStages();
  }
  getDeliverables(): void {
    this.deliverables = this.service.GetDeliverables();
  }
  getSubDeliverables(): void {
    this.subDeliverables = this.service.GetSubDeliverables();
  }
}
