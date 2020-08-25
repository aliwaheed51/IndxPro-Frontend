import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { AppScreenComponent } from './app-screen/app-screen.component';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { RolePermissionComponent } from './role-access/role-permission.component';
import { SecurityRoleComponent } from './role-access/security-role.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentTabItem } from '../dynamic-loading/dynamic-loading.models';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManageUserUiComponent } from './manage-user/manage-user-ui.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageUserListComponent } from './manage-user/manage-user-list.component';
import { CameraComponent } from './manage-user/camera/camera.component';
import { WebcamModule } from 'ngx-webcam';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { UserlistComponent } from '../masters/user/userlist.component';
import { CompanylistComponent } from '../masters/company/companylist.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentlistComponent } from './department/departmentlist.component';
import { CompanyDepartmentlistComponent } from './company-department/company-department/company-departmentlist.component';
import { CompanyDepartmentComponent } from './company-department/company-department/company-department.component';

@NgModule({
  declarations: [
    AppScreenComponent,
    SecurityRoleComponent,
    RolePermissionComponent,
    ManageUserComponent,
    ManageUserListComponent,
    ManageUserUiComponent,
    CameraComponent,
    DepartmentComponent,
    DepartmentlistComponent,
    CompanyDepartmentComponent,
    CompanyDepartmentlistComponent
  ],
  imports: [CommonModule, WebcamModule,NgxSmartModalModule.forRoot(), SharedModule, LayoutModule, ButtonsModule, FormsModule, DateInputsModule,
    ReactiveFormsModule,TreeViewModule , LayoutModule, GridModule, InputsModule, DropDownsModule],
    entryComponents:[CameraComponent],
   providers:[]
})
export class UserManagementModule { }

export const menuItems: ComponentTabItem[] = [
  new ComponentTabItem(UserlistComponent, 'mnu_user', 'User List', false),
  new ComponentTabItem(DepartmentlistComponent, 'mnu_department', 'Role List', false),
  new ComponentTabItem(CompanyDepartmentlistComponent,'mnu_companydepartment', 'Department List', null),
  new ComponentTabItem(CompanylistComponent,'mnu_company', 'Company List', false),
  // new ComponentTabItem(SecurityRoleComponent, 'mnu_securityrole', 'Role Access', null),
  
];
