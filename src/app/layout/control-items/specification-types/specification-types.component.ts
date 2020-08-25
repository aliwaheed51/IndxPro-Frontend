import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SpecificationTypesModel } from './specification-types.model';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { SpecificationTypesService } from './specification-types.service';
import { CompanyService } from '../../masters/company/company.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FileModel } from '../../general-configuration/general-configuration/general-configuration.model';

@Component({
  selector: 'app-specification-types',
  templateUrl: './specification-types.component.html',
})
export class SpecificationTypesComponent extends MasterPage<SpecificationTypesModel> implements OnInit {
  profilePicPath: any;
  fileModel: FileModel;
  companies: any;
  @Input() data: any;
  @Output() backClick: EventEmitter<any> = new EventEmitter();
  public mask: string = "(999) 00-000-00-00";
  public defaultCompany = { value: "Select item...", id: '' };
  constructor(public service: SpecificationTypesService, private utils: UtilityService, private formBuilder: FormBuilder) {
    super(service);
  }

  ngOnInit(): void {
    this.initForm();
    if (this.data != null && this.data.id > 0) {
      this.setdata(this.data);
    }
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      specificationCode: ['', Validators.required],
      specificationName: ['', Validators.required]
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
      specificationCode: data.specificationCode,
      specificationName: data.specificationName
    });
  }

  onSave(): void {
    const data = this.form.value;
    data.id = this.id;
    this.subs = this.service.save(data, this.id).subscribe((res) => {
      this.showDetails = false;
      this.utils.toast.recordSaved();
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

}

