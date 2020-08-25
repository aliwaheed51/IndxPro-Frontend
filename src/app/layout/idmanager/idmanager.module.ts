import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectarealistComponent } from './projectarea/projectarealist.component';
import { ProjectareaComponent } from './projectarea/projectarea.component';
import { ComponentTabItem } from '../dynamic-loading/dynamic-loading.models';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LabelModule } from '@progress/kendo-angular-label';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectidealdesignstageComponent } from './projectidealdesignstage/projectidealdesignstage.component';
import { ProjectidealdesignstagelistComponent } from './projectidealdesignstage/projectidealdesignstagelist.component';
import { ProjectdeliverablesComponent } from './projectdeliverables/projectdeliverables.component';
import { ProjectdeliverableslistComponent } from './projectdeliverables/projectdeliverableslist.component';
import { ProjectsubdeliverableslistComponent } from './projectsubdeliverables/projectsubdeliverableslist.component';
import { ProjectsubdeliverablesComponent } from './projectsubdeliverables/projectsubdeliverables.component';
import { IdProjectPricing } from './idprojectpricing/idprojectpricing.component';


@NgModule({
  declarations: [ProjectareaComponent, ProjectarealistComponent, ProjectidealdesignstageComponent, ProjectidealdesignstagelistComponent, ProjectdeliverablesComponent, ProjectdeliverableslistComponent, ProjectsubdeliverableslistComponent, ProjectsubdeliverablesComponent, IdProjectPricing],
  imports: [CommonModule, SharedModule, LayoutModule, ButtonsModule, LabelModule,
    FormsModule, ReactiveFormsModule, LayoutModule, GridModule, InputsModule,
    DropDownsModule]
})
export class IdmanagerModule { }

export const menuItems: ComponentTabItem[] = [
  new ComponentTabItem(ProjectarealistComponent, 'mnu_idmanager', 'Project Area List', false),
  new ComponentTabItem(ProjectidealdesignstagelistComponent, 'mnu_projectidealdesignstage', 'Project Ideal Design Stage', false),
  new ComponentTabItem(ProjectdeliverableslistComponent, 'mnu_projectDeliverables', 'Project Deliverables', false),
  new ComponentTabItem(ProjectsubdeliverableslistComponent, 'mnu_projectsubDeliverables', 'Project Sub-Deliverables List', false),
  new ComponentTabItem(IdProjectPricing, 'mnu_idprojectpricing', 'ID Project Pricing', false),
];
