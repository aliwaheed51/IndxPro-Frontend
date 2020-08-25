import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonModule, ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { TooltipModule } from '@progress/kendo-angular-tooltip';

import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';
import { PartialDateComponent } from './components/partial-date/partial-date.component';
import { AuditDeleteReasonComponent } from './components/audit/audit-delete-reason/audit-delete-reason.component';
import { GridSettingsComponent } from './components/master-grid/grid-settings/grid-settings.component';
import { GridActiveButtonComponent } from './components/buttons/grid-active-button.component';
import { GridButtonsComponent } from './components/buttons/grid-button.component';
import { GridDeleteButtonComponent } from './components/buttons/grid-delete-button.component';
import { GridSettingsButtonComponent } from './components/buttons/grid-settings-button.component';
import { MasterHeaderComponent } from './components/buttons/master-header.component';
import { MasterSaveButtonComponent } from './components/buttons/master-save-button.component';
import { MasterGridComponent } from './components/master-grid/master-grid.component';
import { AuditHistoryCommonButtonComponent } from './components/buttons/audit-history-common-button.component';
import { AuditHistoryCommonComponent } from './components/audit/audit-history-common/audit-history-common.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { EditorModule } from '@progress/kendo-angular-editor';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
@NgModule({
  declarations: [
    PartialDateComponent,
    AuditDeleteReasonComponent,
    GridSettingsComponent,
    GridActiveButtonComponent,
    GridButtonsComponent,
    GridDeleteButtonComponent,
    GridSettingsButtonComponent,
    MasterHeaderComponent,
    MasterSaveButtonComponent,
    MasterGridComponent,
    AuditHistoryCommonButtonComponent,
    AuditHistoryCommonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    PipesModule,
    ButtonModule,
    ButtonsModule,
    DropDownsModule,
    InputsModule,
    DateInputsModule,
    GridModule,
    PDFModule,
    ExcelModule,
    RouterModule,
    TooltipModule,
    DialogModule,
    EditorModule,
    ToolBarModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    PipesModule,
    ButtonModule,
    ButtonsModule,
    InputsModule,
    DropDownsModule,
    DateInputsModule,
    GridModule,
    PDFModule,
    ExcelModule,
    PartialDateComponent,
    AuditDeleteReasonComponent,
    GridSettingsComponent,
    GridActiveButtonComponent,
    GridButtonsComponent,
    GridDeleteButtonComponent,
    GridSettingsButtonComponent,
    MasterHeaderComponent,
    MasterSaveButtonComponent,
    MasterGridComponent,
    AuditHistoryCommonButtonComponent,
    DialogModule,
    EditorModule,
    ToolBarModule
  ],
  entryComponents: []
})
export class SharedModule {}
