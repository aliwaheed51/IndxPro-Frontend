import { TestComponent } from './test/test.component';
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
import { SampleUiComponent } from './sample-ui/sample-ui.component';
import { UserComponent } from './user/user.component';
import { UserlistComponent } from './user/userlist.component';
import { ClientComponent } from './client/client.component';
import { ClientlistComponent } from './client/clientlist.component';
import { CompanylistComponent } from './company/companylist.component';
import { CompanyComponent } from './company/company.component';

 
@NgModule({
  declarations: [
    TestComponent,
    SampleUiComponent,
    UserComponent,
    UserlistComponent,
    ClientComponent,
    ClientlistComponent,
    CompanylistComponent,
    CompanyComponent,
  ],
  imports: [CommonModule, SharedModule, LayoutModule, ButtonsModule,
     FormsModule, ReactiveFormsModule, LayoutModule, GridModule, InputsModule,
      DropDownsModule]
})
export class MastersModule {}

export const menuItems: ComponentTabItem[] = [
  new ComponentTabItem(SampleUiComponent, 'mnu_auditreason', 'Sample UI', false),
];
