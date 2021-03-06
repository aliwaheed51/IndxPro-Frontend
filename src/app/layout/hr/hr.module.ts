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
import { EmployeeComponent } from './employee/employee.component';
import { EmployeelistComponent } from './employee/employeelist.component';



@NgModule({
  declarations: [EmployeeComponent,EmployeelistComponent],
  imports: [
    CommonModule,CommonModule, SharedModule, LayoutModule, ButtonsModule,
    FormsModule, ReactiveFormsModule, LayoutModule, GridModule, InputsModule,
     DropDownsModule
  ]
})
export class HrModule { }

export const menuItems: ComponentTabItem[] = [
  new ComponentTabItem(EmployeelistComponent, 'mnu_employee', 'Employee List', false),
];

