import { UtilityService } from './../../../core/services/utility.service';
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { GridDataBinding } from 'src/app/shared/directives/grid-data-binding.directive';
import { Constant } from 'src/app/core/constants/constants';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { MasterGridConfig } from 'src/app/shared/components/master-grid/master-grid.component';
import { ManageUserModel } from '../manage-user/manage-user.model';
import { ManageUserService } from '../manage-user/manage-user.service';
import { AuditDeleteReasonComponent } from 'src/app/shared/components/audit/audit-delete-reason/audit-delete-reason.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-manage-user-list',
    templateUrl: './manage-user-list.component.html'
})
export class ManageUserListComponent extends GridDataBinding implements OnInit {
    userData: ManageUserModel[];
    public now: Date = new Date();
    @Input() ctrlName: string;
    @Input() dataItem: any;
    
    moduleId = Constant.AuditModules.UserManagement;
    securityObj: any;
    @Input() config: MasterGridConfig;
    @Output() previewClick: EventEmitter<any> = new EventEmitter();
    @Output() deleted: EventEmitter<any> = new EventEmitter();
    @Output() deleteClick: EventEmitter<any> = new EventEmitter();
    @Output() addClick: EventEmitter<any> = new EventEmitter();
    @Output() editClick: EventEmitter<any> = new EventEmitter();

    constructor(private service: ManageUserService,
        private dialog: NgbModal, private utils: UtilityService) {
        super();
        this.allData = this.allData.bind(this);
        this.service.getManageUsers().subscribe(res =>
            this.userData = res,
            );
        this.securityObj = this.utils.storage.CurrentUser;

    }

    ngOnInit(): void {
    }

    public allData(): ExcelExportData {
        const result: ExcelExportData = {
            data: this.userData,
        };
        return result;
    }
    
    UnBlockSearch(id: number){
        const dialogRef = this.dialog.open(AuditDeleteReasonComponent, {windowClass: 'white-modal modal-small'});
        dialogRef.componentInstance.data = { moduleId: this.moduleId };
        dialogRef.result.then((result) => {
          if (result) {
            const getuserreset$ = this.service.blockUnblockChange(id);
            this.service.blockUnblockChange(id).subscribe(res => {
                this.reloadData();
            });
            this.utils.data.patch<void>(this.ctrlName, this.dataItem.id).subscribe(
              () => {
                this.utils.storage.removeAuditReason();
                this.utils.toast.recordActivated();
              },
              (failed) => {
                this.utils.toast.error(failed.error.message[0], 'Error');
              }
            );
          }
        });
    }
}
