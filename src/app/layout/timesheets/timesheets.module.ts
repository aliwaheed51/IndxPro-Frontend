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
import { TimesheetListComponent } from './timesheet-list/timesheet-list.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [TimesheetListComponent, TimesheetComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    LayoutModule,
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    GridModule,
    InputsModule,
    DropDownsModule,
    SchedulerModule,
  ],
})
export class TimeSheetModule {}

export const menuItems: ComponentTabItem[] = [
  new ComponentTabItem(
    TimesheetListComponent,
    'mnu_timeSheetList',
    'Time Sheet List',
    false
  ),
];
