import { DynamicLoaderComponent } from './dynamic-loading/dynamic-loader/dynamic-loader.component';
import { DynamicContainerComponent } from './dynamic-loading/dynamic-container/dynamic-container.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@progress/kendo-angular-layout';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './components/header/header.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { CompHostDirective } from './dynamic-loading/comp-host.directive';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ClickOutsideModule } from 'ng-click-outside';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
 
@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    LayoutModule,
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    GridModule,
    InputsModule,
    DropDownsModule,
    ClickOutsideModule
  ],
  declarations: [LayoutComponent, HeaderComponent, MenubarComponent, SidebarMenuComponent, CompHostDirective, DynamicContainerComponent, DynamicLoaderComponent, ChangePasswordComponent]
})
export class AppLayoutModule {}
