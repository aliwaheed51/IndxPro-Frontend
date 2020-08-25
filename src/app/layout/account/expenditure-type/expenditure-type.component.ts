import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExpenditureTypeModel } from './expenditure-type.model';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { ExpenditureTypeService } from './expenditure-type.service';
import { BeneficiaryCategoryService } from '../../account/beneficiary-category/beneficiary-category.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FileModel } from '../../general-configuration/general-configuration/general-configuration.model';

@Component({
  selector: 'app-expenditure-type',
  templateUrl: './expenditure-type.component.html',
})
export class ExpenditureTypeComponent extends MasterPage<ExpenditureTypeModel> implements OnInit {
  profilePicPath: any;
  fileModel: FileModel;
  beneficiaryCategories: any;
  @Input() data: any;
  @Output() backClick: EventEmitter<any> = new EventEmitter();
  public mask: string = "(999) 00-000-00-00";
  public defaultBeneficiaryCategory = { value: "Select item...", id: '' };
  constructor(public beneficiaryCategoryService: BeneficiaryCategoryService, public service: ExpenditureTypeService, private utils: UtilityService, private formBuilder: FormBuilder) {
    super(service);
  }

  ngOnInit(): void {
    this.initForm();
    if (this.data != null && this.data.id > 0) {
      this.setdata(this.data);
    }
    this.getBeneficiaryCategories();
  }

  getBeneficiaryCategories() {
    this.beneficiaryCategoryService.GetBeneficiaryCategoryDropDown().subscribe(result => {
      if (result.length > 0) {
        this.beneficiaryCategories = result;
      }
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      beneficiaryCategoryID: ['', Validators.required],
      expenditureTypeName: ['', Validators.required]
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
      beneficiaryCategoryID: data.beneficiaryCategoryID,
      expenditureTypeName: data.expenditureTypeName
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

