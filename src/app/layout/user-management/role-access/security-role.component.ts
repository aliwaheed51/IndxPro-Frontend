import { RolePermissionComponent } from './role-permission.component';
import { SecurityRoleService } from './security-role.service';
import { RolePermissionModel } from './role-access.model';
import { UtilityService } from './../../../core/services/utility.service';
import { IMasterPage } from './../../../shared/interfaces/imaster-page';
import { FormBuilder } from '@angular/forms';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-security-role',
  templateUrl: './security-role.component.html'
})
export class SecurityRoleComponent extends MasterPage<RolePermissionModel> implements OnInit, IMasterPage {
  constructor(public service: SecurityRoleService, private formBuilder: FormBuilder, private dialog: NgbModal, private utils: UtilityService) {
    super(service);
  }

  ngOnInit(): void {
    this.initGrid();
    this.initForm();
  }

  initGrid(): void {
    this.gridConfig = {
      table: 'securityrole',
      title: 'securityrole List',
      screenCode: this.data.screenCode,
      columns: [
        {
          field: 'id',
          title: 'Key',
          width: '120'
        },
        {
          field: 'roleName',
          title: 'Role Name',
          width: '150'
        },
        {
          field: 'roleShortName',
          title: 'Role Short Name',
          width: '150'
        }
      ]
    };
  }

  initForm(): void {
    this.form = this.formBuilder.group({

    });
  }

  onReset(): void {
    if (this.id > 0) {
      this.onEdit(this.id);
    }
  }

  onEdit(id: number): void {
    this.id = id;
    this.openRolePermissionPopup(id);
  }

  onSave(): void {
    const data = this.form.value;
    data.id = this.id;
    this.subs = this.service.save(data, this.id).subscribe((res) => {
      this.id = res;
    });
  }

  onBack(): void {
    this.showDetails = false;
  }

  openRolePermissionPopup(openRolePermission: any) {
    const dialogRef = this.dialog.open(RolePermissionComponent, { windowClass: 'white-modal modal-extra-large', scrollable: true });
    dialogRef.componentInstance.data = openRolePermission;
    dialogRef.result.then((result) => {
      if (result) {
        this.grid.reloadData();
      }
      this.grid.reloadData();
    });
  }

}
