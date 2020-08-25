import { DialogService, DialogContainerService } from '@progress/kendo-angular-dialog';
import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app.routing';
import { NgbModalModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupModule } from '@progress/kendo-angular-popup';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { PipesModule } from './shared/pipes/pipes.module';
import { PDFService, ExcelService, SuspendService, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { MenuModule } from '@progress/kendo-angular-menu';
 
 
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, CoreModule, AppRoutingModule, NgbModalModule, PopupModule,
    TreeViewModule, HammerModule, DateInputsModule, PipesModule, ExcelModule, PDFModule, NgxPaginationModule,NgxSmartModalModule.forRoot(), MenuModule],
  bootstrap: [AppComponent],
  providers: [DialogService, DialogContainerService, NgbActiveModal, PDFService, ExcelService, SuspendService,NgxSmartModalService,
     ]
})
export class AppModule { }
