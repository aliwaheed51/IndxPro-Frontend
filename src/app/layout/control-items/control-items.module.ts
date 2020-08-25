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
import { FinishTypesListComponent } from './finish-types/finish-typesList.component';
import { FinishTypesComponent } from './finish-types/finish-types.component';
import { SpecificationTypesListComponent } from './specification-types/specification-typesList.component';
import { SpecificationTypesComponent } from './specification-types/specification-types.component';
import { FinishCatergoriesListComponent } from './finish-catergories/finish-catergoriesList.component';
import { FinishCatergoriesComponent } from './finish-catergories/finish-catergories.component';
import { FinishDescriptionListComponent } from './finish-description/finish-descriptionList.component';
import { FinishDescriptionComponent } from './finish-description/finish-description.component';
import { ItemTypeListComponent } from './item-type/item-typeList.component';
import { ItemTypeComponent } from './item-type/item-type.component';

@NgModule({
  declarations: [
    FinishTypesListComponent,
    FinishTypesComponent,
    SpecificationTypesListComponent,
    SpecificationTypesComponent,
    FinishCatergoriesListComponent,
    FinishCatergoriesComponent,
    FinishDescriptionListComponent,
    FinishDescriptionComponent,
    ItemTypeListComponent,
    ItemTypeComponent
  ],
  imports: [
    CommonModule, SharedModule, LayoutModule, ButtonsModule,
    FormsModule, ReactiveFormsModule, LayoutModule, GridModule, InputsModule,
    DropDownsModule
  ]
})
export class AccountModule { }

export const menuItems: ComponentTabItem[] = [
  new ComponentTabItem(FinishTypesListComponent, 'mnu_finish_types_list', 'Finish Types List', false),
  new ComponentTabItem(FinishCatergoriesListComponent, 'mnu_finish_catergories_list', 'Finish Catergories List', false),
  new ComponentTabItem(FinishDescriptionListComponent, 'mnu_finish_description_list', 'Finish Description List', false),
  new ComponentTabItem(SpecificationTypesListComponent, 'mnu_specification_types_list', 'Specification Types List', false),
  new ComponentTabItem(ItemTypeListComponent, 'mnu_item_type_list', 'Item Type List', false),
];

