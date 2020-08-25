import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CompanyDepartmentService } from './company-department.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { CompanyDepartmentModel } from './company-department.model';
import { DropDownModel } from 'src/app/core/models/drop-down.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-department',
  templateUrl: './company-department.component.html',
 
})
export class CompanyDepartmentComponent  extends MasterPage<CompanyDepartmentModel> implements OnInit {
 
  @Input() data: any;
  @Output() backClick: EventEmitter<any> = new EventEmitter();
  companyList : DropDownModel[];
  constructor(public service: CompanyDepartmentService, private utils: UtilityService, private formBuilder: FormBuilder) {
    super(service);
  }
  ngOnInit(): void {
    this.getCompanyList();
    this.initForm();
    if (this.data != null && this.data.id > 0)
      this.setdata(this.data);
  }
  getCompanyList(): void {
    this.subs = this.utils.dropDown
      .getDropDownData(`Company/GetCompanyDropDownByUser`)
      .subscribe(com => {
        this.companyList = com;
      });
  }
  initForm(): void {
    this.form = this.formBuilder.group({
      departmentName: ['', Validators.required],
      companyId :  ['', Validators.required],
    });
  }

  onEdit(id: number): void {
    this.id = id;
    this.form.reset();
    this.subs = this.service.getOneById(this.id).subscribe((data) => {
      this.showDetails = true;
      this.form.setValue({
        departmentName: data.departmentName,
        companyId : data.companyID
      });
    });
  }
  setdata(data: any): void {
    this.id = data.id;
    this.form.setValue({
      departmentName: data.departmentName,
      companyId : data.companyID
    });
  }
  onSave(): void {
    const data = this.form.value;
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

  onBack()
  {
    this.showDetails = false;
  }
}
