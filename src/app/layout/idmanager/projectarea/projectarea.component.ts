import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectareaService } from './projectarea.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { ProjectareaModel } from './projectarea.model';
import { CompanyService } from '../../masters/company/company.service';
import { DropDownModel } from 'src/app/core/models/drop-down.model';
import { ProjectService } from '../../account/project/project.service';

@Component({
  selector: 'app-projectarea',
  templateUrl: './projectarea.component.html',
})
export class ProjectareaComponent extends MasterPage<ProjectareaModel> implements OnInit {

  @Input() data: any;
  @Output() backClick: EventEmitter<any> = new EventEmitter();
  companies: DropDownModel[];
  projectList: any;
  constructor(public projectService: ProjectService, public service: ProjectareaService, public companyService: CompanyService,
    private utils: UtilityService, private formBuilder: FormBuilder) {
    super(service);
  }
  ngOnInit(): void {
    this.showDetails = true;
    this.getCompanies();
    this.initForm();
    
    if (this.data != null && this.data.id > 0) {
      this.getProject(this.data.companyId);
      this.setdata(this.data);
    }
  }
  initForm(): void {
    this.form = this.formBuilder.group({
      projectId: ['', Validators.required],
      areaName: ['', Validators.required],
      areaBudget: [''],
      areaWidth: [''],
      areaLength: [''],
      areaHeight: [''],
      areaDiameter: [''],
      areaFloor: [''],
      areaQuantity: [''],
      companyId : [''], 
    });
  }
  getCompanies() {
    this.companyService.GetCompanyDropDownByUser().subscribe(result => {
      if (result.length > 0) {
        this.companies = result;
      }
    });
  }

  companychange(id: number) {
    this.getProject(id);
  }
  getProject(id: number) {
    this.projectService.GetProjectDropDownByCompany(id).subscribe(result => {
      if (result.length > 0) {
        this.projectList = result;
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
      projectId: data.projectId,
      areaName: data.areaName,
      areaBudget: data.areaBudget,
      areaWidth: data.areaWidth,
      areaLength: data.areaLength,
      areaHeight: data.areaHeight,
      areaDiameter: data.areaDiameter,
      areaFloor: data.areaFloor,
      areaQuantity: data.areaQuantity,
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
