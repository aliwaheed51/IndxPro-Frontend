import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { IdproposalModel } from './idproposal.model';
import { IdproposalService } from './idproposal.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../../account/project/project.service';
import { DropDownModel } from 'src/app/core/models/drop-down.model';
import { CompanyService } from '../../masters/company/company.service';

@Component({
  selector: 'app-idproposal',
  templateUrl: './idproposal.component.html',

})
export class IdproposalComponent extends MasterPage<IdproposalModel> implements OnInit {
  @Input() data: any;
  @Output() backClick: EventEmitter<any> = new EventEmitter();
  projectList: DropDownModel[];
  companies: any;
  TValidTo: Date;
  public ProposalStatusType: any[] = [
    { value: 'Approved', id: 1 },
    { value: 'Pending', id: 2 },
    { value: 'Rejected ', id: 3 },

  ];
  constructor(public service: IdproposalService,
    private companyService: CompanyService, private projectService: ProjectService, private utils: UtilityService, private formBuilder: FormBuilder) {
    super(service);
  }

  ngOnInit(): void {
    this.showDetails = true;
    this.initForm();
    this.getCompanies();
    if (this.data != null && this.data.id > 0) {
      this.getProject(this.data.companyId);
      this.setdata(this.data);
    }
  }

  getCompanies() {
    this.companyService.GetCompanyDropDownByUser().subscribe(result => {
      if (result.length > 0) {
        this.companies = result;
      }
    });
  }
  initForm(): void {
    this.form = this.formBuilder.group({
      companyId: ['', Validators.required],
      projectId: [''],
      paymentTerms: [''],
      proposalStatus: [''],
      proposalDate: [new Date()],
      proposalValidDate: ['', this.TValidTo],
      currency: [''],
      proposalId: ['']
    });
  }

  companychange(id: number) {
    this.getProject(id);
  }
  getProject(id: number) {
    this.projectService.GetProjectDropDownByCompany(id).subscribe(result => {
      if (result.length > 0) {
        this.projectList = result;
      }
    });
  }
  onEdit(id: number): void {
    this.id = id;
    this.form.reset();
    this.subs = this.service.getOneById(this.id).subscribe((data) => {
      this.showDetails = true;
      this.setdata(data);
    });
  }
  setdata(data: any): void {
    this.id = data.id;
    this.form.setValue({

      companyId: data.companyId,
      projectId: data.projectId,
      proposalId: data.proposalId,
      paymentTerms: data.paymentTerms,
      proposalStatus: data.proposalStatus,
      proposalDate: new Date(data.proposalDate),
      proposalValidDate: new Date(data.proposalValidDate),
      currency: data.currency
    });
  }
  onSave(): void {
    const data = this.form.value;
    data.proposalDate = this.form.get('proposalDate').value;
    data.proposalValidDate = this.form.get('proposalValidDate').value;
    data.id = this.id;
    this.subs = this.service.save(data, this.id).subscribe((res) => {
      this.showDetails = false;
      this.backClick.emit();
    });
  }

  onReset(): void {
    this.form.reset();
    if (this.id > 0) {
      this.onEdit(this.id);
    }
  }

  onBack() {
    this.showDetails = false;
  }

  setValidToDate(value: Date) {
    this.TValidTo = new Date();
    if (value != null) {
      this.TValidTo = new Date(new Date(this.TValidTo.setFullYear(value.getFullYear(), value.getMonth(), value.getDate())).toDateString());
      
    }
  }
}
