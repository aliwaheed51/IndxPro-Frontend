import { Component, Input, OnInit } from '@angular/core';
import { GridDataBinding } from 'src/app/shared/directives/grid-data-binding.directive';
import { AuditTrailCommonModel } from 'src/app/core/models/audit-model';
import { AuditService } from '../audit.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'audit-history-common',
  templateUrl: './audit-history-common.component.html'
})
export class AuditHistoryCommonComponent extends GridDataBinding implements OnInit {
  @Input() data: any;
  companyName = 'abc';
  public now: Date = new Date();
  AuditTrailData: AuditTrailCommonModel[];
  AuditTrailCommon: AuditTrailCommonModel;

  constructor(private _AuditTrialService: AuditService, public utilityService: UtilityService, public dialogRef: NgbActiveModal) {
    super();
  }
  ngOnInit(): void {
    this.AuditTrailCommon = new AuditTrailCommonModel();
    this.AuditTrailCommon.tableName = this.data.search.tableName;
    this.AuditTrailCommon.pageName = this.data.search.pageName;
    this.AuditTrailCommon.recordId = this.data.search.recordId;
    this.companyName = this.utilityService.storage.CurrentUser.companyName;
    this.allData = this.allData.bind(this);
    this._AuditTrialService.getAuditTrialData(this.AuditTrailCommon).subscribe((res) => (this.AuditTrailData = res));
  }
  close() {
    this.dialogRef.close(null);
  }

  public allData(): ExcelExportData {
    const result: ExcelExportData = {
      data: this.AuditTrailData
    };
    return result;
  }
}
