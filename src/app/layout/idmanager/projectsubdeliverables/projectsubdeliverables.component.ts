import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ProjectsubdeliverablesModel } from './projectsubdeliverables.model';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { CompanyService } from '../../masters/company/company.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DropDownModel } from 'src/app/core/models/drop-down.model';
import { ProjectsubdeliverablesService } from './projectsubdeliverables.service';
import { ProjectidealdesignstageService } from '../projectidealdesignstage/projectidealdesignstage.service';
import { ProjectdeliverablesService } from '../projectdeliverables/projectdeliverables.service';

@Component({
  selector: 'app-projectsubdeliverables',
  templateUrl: './projectsubdeliverables.component.html',
})
export class ProjectsubdeliverablesComponent extends MasterPage<ProjectsubdeliverablesModel> implements OnInit {

  @Input() data: any;
  @Output() backClick: EventEmitter<any> = new EventEmitter();
  companies: DropDownModel[];
  idealDesignStageList: DropDownModel[];
  projectDeliverableList: DropDownModel[];
  projectList: any;
  constructor(public service: ProjectsubdeliverablesService, public projectidealdesignstageService: ProjectidealdesignstageService,
    public projectdeliverablesService: ProjectdeliverablesService, public companyService: CompanyService,
    private utils: UtilityService, private formBuilder: FormBuilder) {
    super(service);
  }
  ngOnInit(): void {
    this.showDetails = true;
    this.getCompanies();
    this.initForm();

    if (this.data != null && this.data.id > 0) {
      this.getidealDesignStageList(this.data.companyId);
      this.projectIdealchange(this.data.projectIDealDesignStageId);
      this.setdata(this.data);
    }
  }

  public companychange(id: number) {
    this.getidealDesignStageList(id);
  }

  getidealDesignStageList(id: number) {
    this.form.patchValue({
      projectIDealDesignStageId : null,
      projectDeliverablesId : null
    });
    this.idealDesignStageList = null;
    this.projectDeliverableList = null;
    if (id == undefined || id == null || id == 0)
      return;
    else {
     
      this.projectidealdesignstageService.GetprojectIdealDesignStageDropDown(id).subscribe(result => {
        if (result["result"].length > 0) {
          this.idealDesignStageList = result["result"];
        }
        else
        {
          this.idealDesignStageList = null;
        }
      });
    }
  }

  projectIdealchange(projectIDealDesignStageId: number) {
    this.form.patchValue({
      projectDeliverablesId : null
    });
    this.projectDeliverableList = null;
    if (projectIDealDesignStageId == undefined || projectIDealDesignStageId == null || projectIDealDesignStageId == 0)
      return;
    else {
      
      this.projectdeliverablesService.GetProjectDeliverablesDropDown(projectIDealDesignStageId).subscribe(result => {
        if (result["result"].length > 0) {
          this.projectDeliverableList = result["result"];
        }
        else
        {
          this.projectDeliverableList = null;
        }
      });
    }
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      companyId: ['', Validators.required],
      srNo: ['', Validators.required],
      projectSubDeliverablesText: ['', Validators.required],
      projectIDealDesignStageId: ['', Validators.required],
      projectDeliverablesId: ['', Validators.required],
    });
  }

  getCompanies() {
    this.companyService.GetCompanyDropDownByUser().subscribe(result => {
      if (result.length > 0) {
        this.companies = result;
      }
      else
      {
        this.companies = null;
      }
    });
  }

  onEdit(id: number): void {
    this.id = id;
    this.form.reset();
    this.subs = this.service.getOneById(this.id).subscribe((data) => {
      this.showDetails = true;
      this.setdata(data);
    });
  }

  setdata(data: any): void {
    this.id = data.id;
    this.form.setValue({
      companyId: data.companyId,
      srNo: data.srNo,
      projectSubDeliverablesText: data.projectSubDeliverablesText,
      projectIDealDesignStageId: data.projectIDealDesignStageId,
      projectDeliverablesId: data.projectDeliverablesId
    });
  }

  onSave(): void {

    const data = this.form.value;
    data.id = this.id;
    this.subs = this.service.save(data, this.id).subscribe((res) => {
      if (res["code"] == true) {
        this.utils.toast.recordSaved();
        this.showDetails = false;
        this.backClick.emit();
      }
      else {
        this.utils.toast.error(res["message"]);
      }
    });
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
}
