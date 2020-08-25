import { NgModule } from '@angular/core';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { IdproposalComponent } from './idproposal/idproposal.component';
import { IdproposallistComponent } from './idproposal/idproposallist.component';
import { ComponentTabItem } from '../dynamic-loading/dynamic-loading.models';



@NgModule({
  declarations: [IdproposalComponent, IdproposallistComponent],
  imports: [
    CommonModule,CommonModule, SharedModule, LayoutModule, ButtonsModule,
    FormsModule, ReactiveFormsModule, LayoutModule, GridModule, InputsModule,
     DropDownsModule
  ]
})
export class DesigndirectorModule { }

export const menuItems: ComponentTabItem[] = [
  new ComponentTabItem(IdproposallistComponent, 'mnu_idproposal', 'ID Proposal' , false),
];

