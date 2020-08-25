import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ProjectdeliverablesModel } from './projectdeliverables.model';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { ProjectidealdesignstageService } from '../projectidealdesignstage/projectidealdesignstage.service';
import { CompanyService } from '../../masters/company/company.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DropDownModel } from 'src/app/core/models/drop-down.model';
import { ProjectdeliverablesService } from './projectdeliverables.service';

@Component({
  selector: 'app-projectdeliverables',
  templateUrl: './projectdeliverables.component.html',
})
export class ProjectdeliverablesComponent extends MasterPage<ProjectdeliverablesModel> implements OnInit {

  @Input() data: any;
  @Output() backClick: EventEmitter<any> = new EventEmitter();
  companies: DropDownModel[];
  idealDesignStageList: DropDownModel[];
  projectList: any;
  constructor(public projectidealdesignstageService: ProjectidealdesignstageService, public service: ProjectdeliverablesService, public companyService: CompanyService,
    private utils: UtilityService, private formBuilder: FormBuilder) {
    super(service);
  }
  ngOnInit(): void {
    this.showDetails = true;
    this.getCompanies();
    this.initForm();

    if (this.data != null && this.data.id > 0) {
      this.getidealDesignStageList(this.data.companyId);
      this.setdata(this.data);
    }
  }

  public companychange(id: number) {
    this.getidealDesignStageList(id);
  }
  getidealDesignStageList(id: number) {
    this.form.patchValue({
      projectIDealDesignStageId: null
    });
    this.idealDesignStageList = null;
    if (id == undefined || id == null || id == 0)
      return;
    else {
      this.projectidealdesignstageService.GetprojectIdealDesignStageDropDown(id).subscribe(result => {
        if (result["result"].length > 0) {
          this.idealDesignStageList = result["result"];
        }
        else {
          this.idealDesignStageList = null;
        }
      });
    }
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      companyId: ['', Validators.required],
      srNo: ['', Validators.required],
      projectDeliverablesText: ['', Validators.required],
      projectIDealDesignStageId: ['', Validators.required],
    });
  }
  getCompanies() {
    this.companyService.GetCompanyDropDownByUser().subscribe(result => {
      if (result.length > 0) {
        this.companies = result;
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
      projectDeliverablesText: data.projectDeliverablesText,
      projectIDealDesignStageId: data.projectIDealDesignStageId,
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
