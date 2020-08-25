
import { ManageUserModel, UserRole } from './manage-user.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilityService } from './../../../core/services/utility.service';
import { ProjectDropDown } from './../../../core/models/drop-down.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageUserService } from './manage-user.service';
import { Component, OnInit, Input } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { MasterGridConfig } from 'src/app/shared/components/master-grid/master-grid.component';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { IMasterPage } from 'src/app/shared/interfaces/imaster-page';
import { AuditDeleteReasonComponent } from 'src/app/shared/components/audit/audit-delete-reason/audit-delete-reason.component';
import { Constant } from 'src/app/core/constants/constants';
import { FileModel } from '../../general-configuration/general-configuration/general-configuration.model';
@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html'
})
export class ManageUserComponent extends MasterPage<ManageUserModel> implements OnInit, IMasterPage {
  id: number;
  moduleId = Constant.AuditModules.UserManagement;
  form: FormGroup;
  userDisable = false;
  projectDesigns: ProjectDropDown[];
  logoPath: any;
  fileModel: FileModel;
  defaultProfilePic = 'assets/images/default-profile-pic.png';
  userTypes: any;
  TValidTo: Date;
  companies: any;
  selectedValues: number[] = [];
  private _user: ManageUserModel;
  public get user(): ManageUserModel {
    return this._user;
  }
  public set user(value: ManageUserModel) {
    this._user = value;
  }

  @Input() data: any;
  profilePicPath: any;
  public value: Date = new Date();
  constructor(public service: ManageUserService,
    public ngxSmartModalService: NgxSmartModalService,
    private dialog: NgbModal,
    private utils: UtilityService, private activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
    super(service);
  }

  ngOnInit(): void {
    this.loadProjectDesigns();
    this.profilePicPath = this.defaultProfilePic;
    this.initForm();
    // this.initGrid();
    this.getCompanies();
    this.getUserRoles();
    if (this.data > 0) {
      this.onEdit(this.data);
    }
    if (this.data.profilePicPath) {
      this.profilePicPath = this.data.profilePicPath;
    }
  }

  getCompanies(): void {
    this.subs = this.utils.dropDown
      .getCompanies()
      .subscribe(companies => {
        this.companies = companies;
      });
  }

  gridConfig: MasterGridConfig;
  initGrid(): void {
    this.gridConfig = {
      table: 'user',
      title: 'User List',
      screenCode: 'mnu_user',
      columns: [
        {
          field: 'id',
          title: 'Key',
          width: '120'
        },
        {
          field: 'userName',
          title: 'User Name',
          width: '150'
        },
        {
          field: 'firstName',
          title: 'First Name',
          width: '150'
        },
        {
          field: 'middleName',
          title: 'Middle Name',
          width: '150'
        },
        {
          field: 'lastName',
          title: 'Last Name',
          width: '150'
        },
        {
          field: 'email',
          title: 'Email ID',
          width: '200'
        },
        {
          field: 'role',
          title: 'Role',
          width: '200'
        }
      ]
    };
  }

  removeProfilePic() {
    this.webcamImage = null;
    this.profilePicPath = this.defaultProfilePic;
    if (this._user) {
      this._user.logo = null;
      this.user.profilePic = null;
    }
    this.form.markAsDirty();
  }
  openFileSelection() {
    document.getElementById('fileInput').click();
  }
  fileChange(files: File[]) {
    if (files && files[0]) {
      this.webcamImage = null;
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

  loadProjectDesigns() {
    this.service.getProjectsForDataEntry().subscribe((res) => {
      this.projectDesigns = res;
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      userName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      validFrom: [''],
      validTo: ['', this.TValidTo],
      companyId: ['', Validators.required],
      userRole: ['', Validators.required],
    });
  }

  setValidToDate(value: Date) {
    this.TValidTo = new Date();
    if (value != null) {
      this.TValidTo = new Date(new Date(this.TValidTo.setFullYear(value.getFullYear(), value.getMonth(), value.getDate())).toDateString());
    }
  }

  getUserRoles(): void {
    this.subs = this.utils.dropDown.userTypes().subscribe((userTypes) => {
      this.userTypes = userTypes;
    });
  }

  onReset(): void {
    this.form.reset();
    if (this.id > 0) {
      this.onEdit(this.id);
    }
  }

  close() {
    this.activeModal.close();
  }

  onEdit(id: number): void {
    this.userDisable = true;
    this.id = id;
    this.form.reset();
    this.subs = this.service.getOneById(this.id).subscribe((data) => {
      this.selectedValues = data.userRoles.map((role) => {
        return role.userRoleId;
      });
      this.profilePicPath = data.profilePicPath;
      this.form.setValue({
        userName: data.userName,
        lastName: data.lastName,
        middleName: data.middleName,
        firstName: data.firstName,
        email: data.email,
        phone: data.phone,
        userRole: this.selectedValues,
        validFrom: data.validFrom ? new Date(data.validFrom) : null,
        validTo: data.validTo ? new Date(data.validTo) : null,
        companyId: data.companyId

      });
    });
  }

  buildUser(): ManageUserModel {
    let userRoles: UserRole[];
    const selectedUserRole = this.selectedValues;
    userRoles = selectedUserRole.map(role => {
      return {
        userId: this.user ? this.user.id : 0,
        userRoleId: role
      } as UserRole;
    });
    const userObj: ManageUserModel = {
      id: this.user ? this.user.id : 0,
      userName: this.form.get('userName').value,
      lastName: this.form.get('lastName').value,
      firstName: this.form.get('firstName').value,
      middleName: this.form.get('middleName').value,
      email: this.form.get('email').value,
      phone: this.form.get('phone').value,
      validFrom: this.form.get('validFrom').value,
      validTo: this.form.get('validTo').value,
      companyId: this.form.get('companyId').value,
      userRoles: [...userRoles],

      fileModel: this.fileModel,
      profilePic: this.user ? this.user.profilePic : null,
    };
    return userObj;
  }

  public webcamImage: WebcamImage = null;

  onSave() {

    const save = this.buildUser();
    save.id = this.id;
    var manageUserId = this.id;
    if (!manageUserId) {
      this.saveUser(save);
      return;

    }
    const dialogRef = this.dialog.open(AuditDeleteReasonComponent, { windowClass: 'white-modal modal-small' });
    dialogRef.componentInstance.data = { message: '', moduleId: this.moduleId };
    dialogRef.result.then((result) => {
      if (result) {
        this.saveUser(save);
      }
    });
    // this.subs = this.service.save(save, save.id).subscribe((res) => {
    //   this.utils.toast.recordSaved();
    //   this.activeModal.close(res);
    // });
  }
  saveUser(save) {
    this.subs = this.service.save(save, save.id).subscribe((res) => {
      this.utils.toast.recordSaved();
      this.activeModal.close(res);
    });
  }
}
