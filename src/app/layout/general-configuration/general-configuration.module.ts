import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
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
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { NumberFormateComponent } from './number-format/number-format.component';
import { EmailTemplateComponent } from './email-template/email-template.component';
import { EmailSettingsComponent } from './email-settings/email-settings.component';
import { UploadSettingComponent } from './upload-setting/upload-setting.component';
import { LoginPreferenceComponent } from './login-preference/login-preference.component';
@NgModule({
  declarations: [
    NumberFormateComponent,
    EmailTemplateComponent,
    EmailSettingsComponent,
    UploadSettingComponent,
    LoginPreferenceComponent,
    GeneralSettingsComponent
  ],
  imports: [ CommonModule, SharedModule, LayoutModule, ButtonsModule, FormsModule, DateInputsModule,
    ReactiveFormsModule,TreeViewModule , LayoutModule, GridModule, InputsModule, DropDownsModule]
})
export class GeneralConfigurationModule { }

export const menuItems: ComponentTabItem[] = [
 ];
