import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { DropDownModel } from 'src/app/core/models/drop-down.model';
import { ProjectidealdesignstageModel } from './projectidealdesignstagegns.model';
import { ProjectidealdesignstageService } from './projectidealdesignstage.service';
import { CompanyService } from '../../masters/company/company.service';
import { UtilityService } from 'src/app/core/services/utility.service';
@Component({
  selector: 'app-projectidealdesignstage',
  templateUrl: './projectidealdesignstage.component.html',
})
export class ProjectidealdesignstageComponent extends MasterPage<ProjectidealdesignstageModel> implements OnInit {

  @Input() data: any;
  @Output() backClick: EventEmitter<any> = new EventEmitter();
  companies: DropDownModel[];
  projectList: any;
  constructor(public service: ProjectidealdesignstageService, public companyService: CompanyService,
    private utils: UtilityService, private formBuilder: FormBuilder) {
    super(service);
  }
  ngOnInit(): void {
    this.showDetails = true;
    this.getCompanies();
    this.initForm();

    if (this.data != null && this.data.id > 0) {
      this.setdata(this.data);
    }
  }
  initForm(): void {
    this.form = this.formBuilder.group({
      companyId: ['', Validators.required],
      srNo: ['', Validators.required],
      idealDesignStageList: ['', Validators.required],
    });
  }
  getCompanies() {
    this.companyService.GetCompanyDropDownByUser().subscribe(result => {
      if (result.length > 0) {
        this.companies = result;
      }
      else
      this.companies = null;
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
      srNo: data.srNo,
      idealDesignStageList: data.idealDesignStageList,

    });
  }
  onSave(): void {

    const data = this.form.value;
    data.id = this.id;
    this.subs = this.service.save(data, this.id).subscribe((res) => {
      if (res["code"] == true) {
        this.utils.toast.recordSaved();
        this.showDetails = false;
        this.backClick.emit();
      }
      else {
        this.utils.toast.error(res["message"]);
      }
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
}
