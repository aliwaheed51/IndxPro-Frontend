import { Constant } from 'src/app/core/constants/constants';
import { AuditDeleteReasonComponent } from './../../../shared/components/audit/audit-delete-reason/audit-delete-reason.component';
import { SecurityRoleModel, RolePermissionModel } from './role-access.model';
import { RolePermissionService } from './role-permission.service';
import { UtilityService } from './../../../core/services/utility.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, Input} from '@angular/core';
import { Destroyer } from 'src/app/core/utils/destroyer';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-role-permission',
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.scss'],
})
export class RolePermissionComponent extends Destroyer implements  OnInit {

  @Input() dataItem: any;
  roles: SecurityRoleModel[] = [];
  selectedRole: any;
  permissions: RolePermissionModel[] = [];
  FindParent: RolePermissionModel;
  FindAllChild: any[] = [];
  FindAnyExtAll = false;
  FindAnyExtAdd = false;
  FindAnyExtEdit = false;
  FindAnyExtDelete = false;
  FindAnyExtView = false;
  FindAnyExtExport = false;
  disableUpdate = true;
  id: any = 0;
  disableTextbox =  false;
  disableReset =  false;
  disableRolePermission =  false;
  hideSave =  false;
  hideAddRole =  true;
  moduleId = Constant.AuditModules.UserManagement;
  form: FormGroup;
  @Input() data: any;
  @Input() ctrlName: string;
  constructor(private service: RolePermissionService,
     private formBuilder: FormBuilder,
     private dialog: NgbModal,
     private activeModal: NgbActiveModal,
     private utils: UtilityService) {
    super();
  }

  ngOnInit(): void {
     this.initForm();
     this.disableRolePermission=true;
     if (this.data > 0) {
        this.onEdit(this.data);
      }
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      roleName: ['', Validators.required],
      roleShortName: ['', Validators.required],
    });
  }

  close() {
    this.activeModal.close();
}
  
  chkChecked(dataItem: RolePermissionModel, checkBoxType) {
      this.disableUpdate = false;
    this.checkChildren(dataItem, checkBoxType);
    if (this.FindAnyExtAll) {
        this.checkParent(dataItem, checkBoxType);
    }
    this.checksingle(dataItem);
}

checksingle(dataItem) {
    this.FindParent = this.permissions.find(x => x.appScreenId === dataItem.parentAppScreenId);
    this.FindAllChild = this.permissions.filter(x => x.parentAppScreenId === dataItem.parentAppScreenId);
    this.FindAnyExtAll = this.permissions.filter(x => x.parentAppScreenId === dataItem.parentAppScreenId).some(x => x.isAll);
    this.FindAnyExtAdd = this.FindAllChild.some(x => x.isAdd);
    this.FindAnyExtEdit = this.FindAllChild.some(x => x.isEdit);
    this.FindAnyExtDelete = this.FindAllChild.some(x => x.isDelete);
    this.FindAnyExtView = this.FindAllChild.some(x => x.isView);
    this.FindAnyExtExport = this.FindAllChild.some(x => x.isExport);

    const FindAnyExtAddCount = this.FindAllChild.filter(x => x.isAdd && x.canAdd).length;
    const FindAnyExtEditCount = this.FindAllChild.filter(x => x.isEdit && x.canEdit).length;
    const FindAnyExtDeleteCount = this.FindAllChild.filter(x => x.isDelete && x.canDelete).length;
    const FindAnyExtViewCount = this.FindAllChild.filter(x => x.isView && x.canView).length;
    const FindAnyExtExportCount = this.FindAllChild.filter(x => x.isExport && x.canExport).length;
    if (this.FindAnyExtAdd && !this.FindAnyExtAll && this.FindParent) {
        if (FindAnyExtAddCount > 0) {
            this.FindParent.isAdd = true;
        }
    }
    if (this.FindAnyExtEdit && !this.FindAnyExtAll && this.FindParent) {
        if (FindAnyExtEditCount > 0) {
            this.FindParent.isEdit = true;
        }
    }
    if (this.FindAnyExtDelete && !this.FindAnyExtAll && this.FindParent) {
        if (FindAnyExtDeleteCount > 0) {
            this.FindParent.isDelete = true;
        }
    }
    if (this.FindAnyExtView && !this.FindAnyExtAll && this.FindParent) {
        if (FindAnyExtViewCount > 0) {
            this.FindParent.isView = true;
        }
    }
    if (this.FindAnyExtExport && !this.FindAnyExtAll && this.FindParent) {
        if (FindAnyExtExportCount > 0) {
            this.FindParent.isExport = true;
        }
    }
}

checkParent(dataItem: RolePermissionModel, checkBoxType) {
    if (this.FindAnyExtAll) {
        if (this.permissions.find(x => x.appScreenId === this.FindParent.appScreenId)) {
            this.FindParent.isAdd = true;
            this.FindParent.isDelete = true;
            this.FindParent.isEdit = true;
            this.FindParent.isExport = true;
            this.FindParent.isView = true;
            this.FindParent.isAll = true;
        }
        if (!this.FindAnyExtAdd && dataItem.isAdd === false) {
            this.FindParent.isAdd = false;
            this.FindParent.isAll = false;
        }
        if (!this.FindAnyExtEdit && dataItem.isEdit === false || !this.FindAnyExtView && dataItem.isView === false) {
            this.FindParent.isEdit = false;
            this.FindParent.isAll = false;
        }
        if (!this.FindAnyExtDelete && dataItem.isDelete === false) {
            this.FindParent.isDelete = false;
            this.FindParent.isAll = false;
        }
        if (!this.FindAnyExtView && dataItem.isView === false) {
            this.FindParent.isView = false;
            this.FindParent.isAll = false;
        }
        if (!this.FindAnyExtExport && dataItem.isExport === false) {
            this.FindParent.isExport = false;
            this.FindParent.isAll = false;
        }
    }
    else if (this.FindAnyExtAdd && this.FindAnyExtAll) {
        this.FindParent.isAdd = true;
    }
    else if (this.FindAnyExtEdit && this.FindAnyExtAll) {
        this.FindParent.isEdit = true;
    }
    else if (this.FindAnyExtDelete && this.FindAnyExtAll) {
        this.FindParent.isDelete = true;
    }
    else if (this.FindAnyExtView && this.FindAnyExtAll) {
        this.FindParent.isView = true;
    }
    else if (this.FindAnyExtExport && this.FindAnyExtAll) {
        this.FindParent.isExport = true;
    }
}

checkChildren(dataItem: RolePermissionModel, checkBoxType) {
    if (dataItem.parentAppScreenId != null) {
        this.FindAllChild = this.permissions.filter(x => x.parentAppScreenId === dataItem.parentAppScreenId);
        this.FindAnyExtAll = this.permissions.filter(x => x.parentAppScreenId === dataItem.parentAppScreenId).some(x => x.isAll);
        this.FindAnyExtAdd = this.FindAllChild.some(x => x.isAdd);
        this.FindAnyExtEdit = this.FindAllChild.some(x => x.isEdit);
        this.FindAnyExtDelete = this.FindAllChild.some(x => x.isDelete);
        this.FindAnyExtView = this.FindAllChild.some(x => x.isView);
        this.FindAnyExtExport = this.FindAllChild.some(x => x.isExport);
        this.FindParent = this.permissions.find(x => x.appScreenId === dataItem.parentAppScreenId);
    }
    else {
        this.FindAllChild = [];
        this.FindAnyExtAll = false;
        this.FindParent = null;
    }

    this.permissions.forEach((childItem, index) => {
        if (
            childItem.parentAppScreenId === dataItem.appScreenId ||
            childItem.appScreenId === dataItem.parentAppScreenId ||
            childItem.appScreenId === dataItem.appScreenId
        ) {
            if (checkBoxType === 0) {
                childItem.isAdd = dataItem.isAll;
                childItem.isDelete = dataItem.isAll;
                childItem.isEdit = dataItem.isAll;
                childItem.isExport = dataItem.isAll;
                childItem.isView = dataItem.isAll;
            } else if (checkBoxType === 1) {
                childItem.isAdd = dataItem.isAdd;
                if (childItem.isAdd) {
                    childItem.isView = true;
                }
            } else if (checkBoxType === 2) {
                childItem.isEdit = dataItem.isEdit;
                if (childItem.isEdit) {
                    childItem.isView = true;
                }
            } else if (checkBoxType === 3) {
                childItem.isDelete = dataItem.isDelete;
            } else if (checkBoxType === 4) {
                childItem.isView = dataItem.isView;
                if (!childItem.isView) {
                    childItem.isEdit = false;
                    childItem.isAdd = false;
                }
            } else if (checkBoxType === 5) {
                childItem.isExport = dataItem.isExport;
            }
            if (
                childItem.isAdd &&
                childItem.isEdit &&
                childItem.isDelete &&
                childItem.isExport &&
                childItem.isView
            ) {
                childItem.isAll = true;
            }
            else {
                childItem.isAll = false;
            }
        }
    });
  }

  onSave() {
    const save = {
        roleName: this.form.value.roleName,
        roleShortName: this.form.value.roleShortName
        
    } as SecurityRoleModel;
    save.id = this.id;
    this.subs = this.service.save(save,save.id).subscribe((res:any) => {
      this.utils.toast.recordSaved();
      this.selectedRole=save
      this.permissions =  res
      if(res){
        this.disableTextbox = true;
        this.disableReset = true;
        this.disableRolePermission=false
      }
    });
}

onReset(): void {
    this.disableUpdate = true;
    this.form.reset();
    if (this.id > 0) {
        this.onEdit(this.id);
    }
}

onPermission(){
    this.id = 0;
    this.form.reset();
    this.permissions=[];
    this.selectedRole="";
    this.disableTextbox = false;
    this.disableReset = false;
    this.hideSave = false;
    this.disableRolePermission=true;
    this.hideAddRole = true;
}

onSaveRolePermission(): void {
    const alreadySaved = this.permissions.some(t=>t.rolePermissionId);
    if(alreadySaved==true){
        const dialogRef = this.dialog.open(AuditDeleteReasonComponent, {windowClass: 'white-modal modal-small'});
        dialogRef.componentInstance.data = { moduleId: this.moduleId };
        dialogRef.result.then((result) => {
          if (result) {
            this.subs = this.service.updatePermission(this.permissions).subscribe(data => {
                this.utils.toast.recordSaved();
                this.activeModal.close(this.permissions);
            });
            this.utils.data.patch<void>(this.ctrlName, this.dataItem.id).subscribe(
              () => {
               
                this.utils.storage.removeAuditReason();
                this.utils.toast.recordActivated();
               
              },
              (failed) => {
                this.utils.toast.error(failed.error.message[0], 'Error');
              }
            );
          }
        });
    }
   else{
    this.subs = this.service.savePermission(this.permissions).subscribe(data => {
        this.utils.toast.recordSaved();
        this.activeModal.close(this.permissions);
    });}
}

onEdit(id: number): void {
    this.id = id;
    this.hideSave = true;
    this.hideAddRole = false;
    this.disableTextbox = true;
    this.disableRolePermission=false;
    this.subs = this.service.getOneById(this.id).subscribe((data) => {
      this.form.setValue({
        roleShortName: data.roleShortName,
        roleName: data.roleName,
      });
    });
 this.subs = this.service
    .get(this.id)
    .subscribe((data: any[]) => {
        this.selectedRole =this.data.roleName
        this.permissions = data;
    });
}
}
