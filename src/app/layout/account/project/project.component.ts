import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectModel } from './project.model';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { ProjectService } from './project.service';
import { CompanyService } from '../../masters/company/company.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FileModel } from '../../general-configuration/general-configuration/general-configuration.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
})
export class ProjectComponent extends MasterPage<ProjectModel> implements OnInit {
  profilePicPath: any;
  fileModel: FileModel;
  companies: any;
  departments: any;
  clients: any;
  @Input() data: any;
  @Output() backClick: EventEmitter<any> = new EventEmitter();
  public mask: string = "(999) 00-000-00-00";
  public default = { value: "Select item...", id: '' };
  constructor(public companyService: CompanyService, public service: ProjectService, private utils: UtilityService, private formBuilder: FormBuilder) {
    super(service);
  }

  ngOnInit(): void {
    this.initForm();
    this.getCompanies();
    if (this.data != null && this.data.id > 0) {
      this.setdata(this.data);
      this.companychange(this.data.companyID, true);
    }
  }

  getCompanies() {
    this.companyService.GetCompanyDropDownByUser().subscribe(result => {
      if (result.length > 0) {
        this.companies = result;
      }
    });
  }

  companychange(id: number, isInit = false) {
    if (!isInit) {
      this.form.controls['departmentID'].setValue('');
      this.form.controls['clientID'].setValue('');
    }

    this.departments = [];
    this.clients = [];

    this.getDepartments(id);
    this.getClients(id);
  }

  getDepartments(id: number) {
    this.service.GetDepartmentDropDownByCompany(id).subscribe(result => {
      if (result.length > 0) {
        this.departments = result;
      }
    });
  }

  getClients(id: number) {
    this.service.GetClientDropDownByCompany(id).subscribe(result => {
      if (result.length > 0) {
        this.clients = result;
      }
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      companyID: ['', Validators.required],
      projectRefNumber: ['', Validators.required],
      projectName: ['', Validators.required],
      isActive: [true, Validators.required],
      totalProjectBudget: [''],
      startingDate: [new Date(), Validators.required],
      deadline: [null],
      completionDate: [null],
      departmentID: ['', Validators.required],
      clientID: ['', Validators.required],
      contractID: [null],
    });
  }

  onEdit(id: number): void {
    this.id = id;
    this.form.reset();
    this.subs = this.service.getOneById(this.id).subscribe((data) => {
      this.showDetails = true;
      this.setdata(data);
      this.companychange(data.companyID, true);
    });
  }

  setdata(data: any): void {
    this.id = data.id;
    this.form.setValue({
      companyID: data.companyID,
      projectRefNumber: data.projectRefNumber,
      projectName: data.projectName,
      isActive: data.isActive,
      totalProjectBudget: data.totalProjectBudget,
      startingDate: new Date(data.startingDate),
      deadline: data.deadline ? new Date(data.deadline) : null,
      completionDate: data.completionDate ? new Date(data.completionDate) : null,
      departmentID: data.departmentID,
      clientID: data.clientID,
      contractID: data.contractID
    });
  }

  onSave(): void {
    const data = this.form.value;
    data.id = this.id;
    this.subs = this.service.save(data, this.id).subscribe((res) => {
      this.showDetails = false;
      this.utils.toast.recordSaved();
      this.backClick.emit();
    });
  }

  onReset(): void {
    this.form.reset();
    if (this.id > 0) {
      this.onEdit(this.id);
    } else {
      this.departments = [];
      this.clients = [];
    }
  }

  onBack() {
    this.showDetails = false;
  }

}

