import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeService } from './employee.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { EmployeeModel } from './employee.model';
import { FileModel } from '../../general-configuration/general-configuration/general-configuration.model';
import { ProjectService } from '../../account/project/project.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent extends MasterPage<EmployeeModel> implements OnInit {
  profilePicPath: any;
  fileModel: FileModel;
  CvfileModel: FileModel;
  companies: any;
  @Input() data: any;
  @Output() backClick: EventEmitter<any> = new EventEmitter();
  public employeeStatusData: any[] = [
    { value: 'Active', id: 1 },
    { value: 'Unpaid leave', id: 2 },
    { value: 'Resigned ', id: 3 },
    { value: 'Any ', id: 4 },
  ];

  public employmentTypeData: any[] = [
    { value: 'Contract', id: 1 },
    { value: 'Remotly', id: 2 },
    { value: 'Freelancer', id: 3 },
    { value: 'Any', id: 4 },
  ];
  departmentList: any;
  downloadLink: any;

  constructor(public projectService: ProjectService, public service: EmployeeService, private utils: UtilityService, private formBuilder: FormBuilder) {
    super(service);
  }
  ngOnInit(): void {
    this.isSuperAdmin = this.utils.storage.CurrentUser.isSuperAdmin;
    this.getCompanies();
    if (this.utils.storage.CurrentUser.isSuperAdmin == true) {

    }
    else {
      this.getDepartment(this.utils.storage.CurrentUser.companyId);
    }
    this.initForm();
    if (this.data != null && this.data.id > 0) {
      this.getDepartment(this.data.companyId);
      this.setdata(this.data);
    }
  }
  getCompanies(): void {
    this.subs = this.utils.dropDown
      .getCompanies()
      .subscribe(companies => {
        this.companies = companies;
      });
  }
  companyChange(id: number)
  {
    this.getDepartment(id);
  }
  getDepartment(id: number) {
    this.projectService.GetDepartmentDropDownByCompany(id).subscribe(result => {
      if (result.length > 0) {
        this.departmentList = result;
      }
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      employeeStatus: [''],
      employmentType: [''],
      departmentId: [''],
      address: [''],
      accountDetails: [''],
      costPerHour: [''],
      costPerHourProfit: [''],
      companyId: ['']
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
      firstName: data.firstName,
      lastName: data.lastName,
      employeeStatus: data.employeeStatus,
      employmentType: data.employmentType,
      departmentId: data.departmentId,
      address: data.address,
      accountDetails: data.accountDetails,
      costPerHour: data.costPerHour,
      costPerHourProfit: data.costPerHourProfit,
      companyId: data.companyId
    });
    this.profilePicPath = this.data.logo;
    this.downloadLink = this.data.resume;
  }

  onSave(): void {
    const data = this.form.value;
    data.id = this.id;
    data.extension = this.fileModel != null || this.fileModel != undefined ? this.fileModel.extension : "";

    if (this.id > 0) {
      data.base64 = this.fileModel != null || this.fileModel != undefined ?
        this.fileModel.base64 : "";
      data.profilePic = this.data.fileName;
    }
    else
      data.base64 = this.fileModel != null || this.fileModel != undefined ? this.fileModel.base64 : "";

    data.cvBase64 = this.CvfileModel != null || this.CvfileModel != undefined ?
      this.CvfileModel.base64 : "";

    data.cvextension = this.CvfileModel != null || this.CvfileModel != undefined ?
      this.CvfileModel.extension : "";
    this.subs = this.service.saveUpdate(data, this.id).subscribe((res) => {
      this.showDetails = false;
      this.utils.toast.recordSaved();
      this.backClick.emit();
    });
  }

  fileChange(files: File[]) {
    if (files && files[0]) {

      const mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }
      const name = files[0].name;
      const lastDot = name.lastIndexOf('.');
      const extension = name.substring(lastDot + 1);
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (event) => {
        this.profilePicPath = reader.result;
        this.fileModel = {
          base64: reader.result,
          extension: extension
        } as FileModel;
        this.form.markAsDirty();
      };
    }
  }

  UploadfileChange(files: File[]) {
    if (files && files[0]) {
      const mimeType = files[0].type;

      const name = files[0].name;
      const lastDot = name.lastIndexOf('.');
      const extension = name.substring(lastDot + 1);
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (event) => {
        this.CvfileModel = {
          base64: reader.result,
          extension: extension
        } as FileModel;
        this.form.markAsDirty();
      };
    }
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
