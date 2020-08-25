import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BeneficiaryNameModel } from './beneficiary-name.model';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { BeneficiaryNameService } from './beneficiary-name.service';
import { BeneficiaryCategoryService } from '../beneficiary-category/beneficiary-category.service';
import { ExpenditureTypeService } from '../expenditure-type/expenditure-type.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FileModel } from '../../general-configuration/general-configuration/general-configuration.model';

@Component({
  selector: 'app-beneficiary-name',
  templateUrl: './beneficiary-name.component.html',
})
export class BeneficiaryNameComponent extends MasterPage<BeneficiaryNameModel> implements OnInit {
  profilePicPath: any;
  fileModel: FileModel;
  beneficiaryCategories: any;
  expenditureTypesAll: any;
  expenditureTypesCurrent: any;
  @Input() data: any;
  @Output() backClick: EventEmitter<any> = new EventEmitter();
  public mask: string = "(999) 00-000-00-00";
  public default = { value: "Select item...", id: '' };
  public isDisabledExpenditureType: boolean = true;
  constructor(public beneficiaryCategoryService: BeneficiaryCategoryService,
    public expenditureTypeService: ExpenditureTypeService,
    public service: BeneficiaryNameService, private utils: UtilityService, private formBuilder: FormBuilder) {
    super(service);
  }

  ngOnInit(): void {
    this.initForm();
    if (this.data != null && this.data.id > 0) {
      this.setdata(this.data);
    }
    this.getBeneficiaryCategories();
    this.getExpenditureTypes();
  }

  getBeneficiaryCategories() {
    this.beneficiaryCategoryService.GetBeneficiaryCategoryDropDown().subscribe(result => {
      if (result.length > 0) {
        this.beneficiaryCategories = result;
      }
    });
  }

  getExpenditureTypes() {
    this.expenditureTypeService.GetExpenditureTypeDropDown().subscribe(result => {
      if (result.length > 0) {
        this.expenditureTypesAll = result;
        this.expenditureTypesCurrent = [];
        if (this.data != null && this.data.id > 0) {
          this.handleBeneficiaryCategoryChange(this.data.beneficiaryCategoryID);
        }
      }
    });
  }

  handleBeneficiaryCategoryChange(value) {
    this.expenditureTypesCurrent = [];
    for (const iterator of this.expenditureTypesAll) {
      if (Number(iterator.extraData) === value) {
        this.expenditureTypesCurrent.push(iterator);
      }
    }
    this.isDisabledExpenditureType = this.expenditureTypesCurrent.length === 0 ? true : false;
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      beneficiaryCategoryID: ['', Validators.required],
      expenditureTypeID: ['', Validators.required],
      beneficiaryName: ['', Validators.required]
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
      expenditureTypeID: data.expenditureTypeID,
      beneficiaryName: data.beneficiaryName
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

