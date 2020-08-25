import { AuditService } from './../audit.service';
import { Component, OnInit, Input } from '@angular/core';
import { Destroyer } from 'src/app/core/utils/destroyer';
import { UtilityService } from 'src/app/core/services/utility.service';
import { AuditReasonModel } from '../audit.models';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-audit-delete-reason',
  templateUrl: './audit-delete-reason.component.html',
  styleUrls: ['./audit-delete-reason.component.scss']
})
export class AuditDeleteReasonComponent extends Destroyer implements OnInit {
  @Input() data: any;
  auditReasons: AuditReasonModel[];
  dataItem: any = {};
  constructor(private utils: UtilityService, private auditService: AuditService, public activeModal: NgbActiveModal) {
    super();
  }

  ngOnInit(): void {
    this.subs = this.auditService.getAuditReasonDropDown(this.data.moduleId).subscribe((res) => (this.auditReasons = res));
  }

  close() {
    this.activeModal.close();
  }

  proceed() {
    this.utils.storage.setAuditReason(this.dataItem);
    this.activeModal.close(this.dataItem);
  }

  reasonChanged(id: string) {
    const reason = this.auditReasons.find((t) => {
      return t.id === +id;
    });
    this.dataItem.isOther = reason && reason.isOther;
  }

  isInvalid(): boolean {
    const invalid = !this.dataItem.reasonId || (this.dataItem.isOther && !this.dataItem.reasonOth);

    return invalid;
  }
}
