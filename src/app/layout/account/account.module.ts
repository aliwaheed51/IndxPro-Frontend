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
import { CompanyBankAccountListComponent } from './company-bank-account/company-bank-accountList.component';
import { CompanyBankAccountComponent } from './company-bank-account/company-bank-account.component';
import { BeneficiaryCategoryListComponent } from './beneficiary-category/beneficiary-categoryList.component';
import { BeneficiaryCategoryComponent } from './beneficiary-category/beneficiary-category.component';
import { ExpenditureTypeListComponent } from './expenditure-type/expenditure-typeList.component';
import { ExpenditureTypeComponent } from './expenditure-type/expenditure-type.component';
import { BeneficiaryNameListComponent } from './beneficiary-name/beneficiary-nameList.component';
import { BeneficiaryNameComponent } from './beneficiary-name/beneficiary-name.component';
import { ProjectListComponent } from './project/projectList.component';
import { ProjectComponent } from './project/project.component';
import { ExpenditureDetailListComponent } from './expenditure-detail/expenditure-detailList.component';
import { ExpenditureDetailComponent } from './expenditure-detail/expenditure-detail.component';
import { ClientlistComponent } from '../masters/client/clientlist.component';


@NgModule({
  declarations: [
    CompanyBankAccountListComponent,
    CompanyBankAccountComponent,
    BeneficiaryCategoryListComponent,
    BeneficiaryCategoryComponent,
    ExpenditureTypeListComponent,
    ExpenditureTypeComponent,
    BeneficiaryNameListComponent,
    BeneficiaryNameComponent,
    ProjectListComponent,
    ProjectComponent,
    ExpenditureDetailListComponent,
    ExpenditureDetailComponent
  ],
  imports: [
    CommonModule, SharedModule, LayoutModule, ButtonsModule,
    FormsModule, ReactiveFormsModule, LayoutModule, GridModule, InputsModule,
    DropDownsModule
  ]
})
export class AccountModule { }

export const menuItems: ComponentTabItem[] = [
  new ComponentTabItem(CompanyBankAccountListComponent, 'mnu_company_bank_account', 'Company Bank Account List', false),
  new ComponentTabItem(BeneficiaryCategoryListComponent, 'mnu_beneficiary_category', 'Beneficiary Category List', false),
  new ComponentTabItem(ExpenditureTypeListComponent, 'mnu_expenditure_type', 'Expenditure Type List', false),
  new ComponentTabItem(BeneficiaryNameListComponent, 'mnu_beneficiary_name', 'Beneficiary Name List', false),
  new ComponentTabItem(ProjectListComponent, 'mnu_project', 'Project List', false),
  new ComponentTabItem(ExpenditureDetailListComponent, 'mnu_expenditure_detail', 'Expenditure Detail List', false),
  new ComponentTabItem(ClientlistComponent, 'mnu_client', 'Client List', false),
];

