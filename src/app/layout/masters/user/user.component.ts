import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserModel, UserCompany } from './user.model';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { UserService } from './user.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FileModel } from '../../general-configuration/general-configuration/general-configuration.model';
import { DropDownModel } from 'src/app/core/models/drop-down.model';
import { UserRole } from '../../user-management/manage-user/manage-user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent extends MasterPage<UserModel> implements OnInit {
  profilePicPath: any;
  fileModel: FileModel;
  companies: any;
  public mask: string = "(999) 00-000-00-00";
  public password: string;
  employeeCompany: UserCompany;
  otherRole: UserRole;
  @Input() data: any;
  @Output() backClick: EventEmitter<any> = new EventEmitter();
  roleData: DropDownModel[];
  selectedRoles: DropDownModel[];
  selectedCompany: DropDownModel[];

  constructor(public service: UserService, private utils: UtilityService, private formBuilder: FormBuilder) {
    super(service);
  }
  ngOnInit(): void {
    this.getCompanies();
    this.getRoleData();
    this.initForm();
    if (this.data != null && this.data.id > 0)
      this.setdata(this.data);
  }

  getRoleData(): void {
    this.subs = this.utils.dropDown
      .getDropDownData(`SecurityRole/GetSecurityRoleDropDown`)
      .subscribe(department => {
        this.roleData = department;
      });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      userName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: [''],
      email: ['', [Validators.required, Validators.email]],
      companyId: ['', Validators.required],
      userType: [''],
      address: [''],
      password: ['', Validators.required],
      isEmailVerify: [false],
      isEmployee: [false],
      userRoleId: ['']
    });
  }

  getCompanies(): void {
    this.subs = this.utils.dropDown
      .getCompanies()
      .subscribe(companies => {
        this.companies = companies;
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
    if (data.userRole != null || data.userRole != undefined) {
      this.selectedRoles = [];
      data.userRole.map(role => {
        let obj = new DropDownModel;
        obj.id = role.userRoleId
        obj.value = role.securityRole.roleName;
        this.selectedRoles.push(obj);
      });
    }

    let userroleId = data.isEmployee == false && data.userRole != null && data.userRole.length > 0 ? data.userRole[0].userRoleId : null;
    this.id = data.id;
    this.form.setValue({
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      email: data.email,
      mobile: data.mobile,
      userType: data.userType,
      address: data.address,
      companyId: data.companyId,
      password: "*******",
      isEmailVerify: data.isEmailVerify,
      isEmployee: data.isEmployee,
      userRoleId: userroleId
    });
    this.profilePicPath = this.data.profilePic;
  }

  onSave(): void {
    const data = this.form.value;
   
    const selectedUserRole = this.selectedRoles;
    debugger
    let userRoles: UserRole[] = [];
    if (data.isEmployee == null || data.isEmployee == undefined || data.isEmployee == false) {

      if (data.userRoleId == undefined || data.userRoleId == null || data.userRoleId <= 0) {
        this.utils.toast.error("Please select Role Name....");
        return
      }

      this.otherRole = new UserRole();
      this.otherRole.userId = this.id;
      this.otherRole.userRoleId = data.userRoleId;
      userRoles.push(this.otherRole);
    }
    else {
      if (selectedUserRole.length == 0) {
        this.utils.toast.error("Please select Role Name....");
        return
      }
      userRoles = selectedUserRole.map(role => {
        return {
          userId: this.id,
          userRoleId: role.id
        } as UserRole;
      });
    }

    data.id = this.id;
    data.password = this.id > 0 ? "" : data.password;
    data.extension = this.fileModel != null || this.fileModel != undefined ? this.fileModel.extension : "";
    data.userRole = userRoles;
    // data.userCompany = usercompany;
    data.isPowerAdmin = this.id > 0 ? this.data.isPowerAdmin : false;
    if (this.id > 0) {
      data.base64 = this.fileModel != null || this.fileModel != undefined ?
        this.fileModel.base64 : "";
      data.profilePic = this.data.fileName;
    }
    else
      data.base64 = this.fileModel != null || this.fileModel != undefined ? this.fileModel.base64 : "";
    this.subs = this.service.save(data, this.id).subscribe((res) => {
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

  onReset(): void {
    this.form.reset();
    if (this.id > 0) {
      this.onEdit(this.id);
    }
  }

  onBack() {
    this.showDetails = false;
  }

  rolechange(aaaa: any) {
    this.form.markAsDirty();
  }
}
