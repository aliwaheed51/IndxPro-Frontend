import { NgModule } from '@angular/core';

import { GridDataBindingDirective } from './grid-data-binding.directive';
import { DisableControlDirective } from './disable-control.directive';
import { AddRightsDirective } from './rights/add-rights.directive';
import { AddOrEditRightsDirective } from './rights/addOrEdit-rights.directive';
import { DeleteRightsDirective } from './rights/delete-rights.directive';
import { EditRightsDirective } from './rights/edit-rights.directive';
import { ExportRightsDirective } from './rights/export-rights.directive';
import { ViewRightsDirective } from './rights/view-rights.directive';
import { GscKendoDatePickerDirective } from './gsc-kendo-date-picker.directive';
import { GscKendoTimePickerDirective } from './gsc-kendo-time-picker.directive';
import { GscKendoGridSettingsDirective } from './gsc-kendo-grid-settings-directive';
import { NoWhiteSpaceDirective } from './no-whitespace.directive';
import { NumbersOnlyDirective } from './numbers-only.directive';
import { AlphaOnlyDirective } from './alpha-only.directive';
import { ContectOnlyDirective } from './contact-only.directive';
import { CodeOnlyDirective } from './code-only.directive';

@NgModule({
  declarations: [
    GridDataBindingDirective,
    DisableControlDirective,
    AddRightsDirective,
    AddOrEditRightsDirective,
    DeleteRightsDirective,
    EditRightsDirective,
    ExportRightsDirective,
    ViewRightsDirective,
    GscKendoDatePickerDirective,
    GscKendoTimePickerDirective,
    GscKendoGridSettingsDirective,
    NoWhiteSpaceDirective,
    NumbersOnlyDirective,
    AlphaOnlyDirective,
    ContectOnlyDirective,
    CodeOnlyDirective
  ],
  imports: [],
  exports: [
    GridDataBindingDirective,
    DisableControlDirective,
    AddRightsDirective,
    AddOrEditRightsDirective,
    DeleteRightsDirective,
    EditRightsDirective,
    ExportRightsDirective,
    ViewRightsDirective,
    GscKendoDatePickerDirective,
    GscKendoTimePickerDirective,
    GscKendoGridSettingsDirective,
    NoWhiteSpaceDirective,
    NumbersOnlyDirective,
    AlphaOnlyDirective,
    ContectOnlyDirective,
    CodeOnlyDirective
  ]
})
export class DirectivesModule {}
