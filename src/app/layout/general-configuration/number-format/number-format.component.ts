import { DropDownModel } from './../../../core/models/drop-down.model';
import { UtilityService } from './../../../core/services/utility.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Destroyer } from 'src/app/core/utils/destroyer';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NumberFormatModel, ssl } from '../general-configuration/general-configuration.model';
import { GeneralConfigurationService } from '../general-configuration/general-configuration.service';


@Component({
  selector: 'app-number-format',
  templateUrl: './number-format.component.html'
})

export class NumberFormateComponent extends Destroyer implements OnInit {
  form: FormGroup;
  country: DropDownModel[];
  state: DropDownModel[];
  city: DropDownModel[];
  cityArea: DropDownModel[];
  companyDataSource: DropDownModel[];
  id: number;
  sslDataSource: ssl[] = [
    { value: true, viewValue: 'True' },
    { value: false, viewValue: 'False' },
  ];
  configurationId: number;
  numberFormat: NumberFormatModel;
  @Input() data: any;
  constructor(private service: GeneralConfigurationService, private formBuilder: FormBuilder, private activeModal: NgbActiveModal,
    private utils: UtilityService) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.getCompanyDropDown();
    if (this.data.id > 0) {
      this.onEdit(this.data.id);
    }
    else {
      this.configurationId = this.data.configurationId;
    }
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      keyName: ['', Validators.required],
      prefixFormat: [''],
      yearFormat: [''],
      monthFormat: [''],
      startNumber: [''],
      companyId: [''],
      separateSign: [''],
      resetYear: [''],
      hint: [''],
      numberLength: [''],
      isManual: [false]
    });
  }

  close() {
    this.activeModal.close();
  }

  onReset(): void {
    this.form.reset();
    if (this.id > 0) {
      this.onEdit(this.id);
    }
  }
  onEdit(id: number): void {
    this.configurationId = this.data.configurationId;
    this.id = id;
    this.form.reset();
    this.form.setValue({
      keyName: this.data.keyName,
      prefixFormat: this.data.prefixFormat,
      yearFormat: this.data.yearFormat,
      monthFormat: this.data.monthFormat,
      startNumber: this.data.startNumber,
      companyId: this.data.companyId,
      separateSign: this.data.separateSign,
      resetYear: this.data.resetYear,
      hint: this.data.hint,
      numberLength: this.data.numberLength,
      isManual: this.data.isManual
    });
    this.numberFormat = this.data;
  }

  onSave() {
    const save = this.form.value;
    save.id = this.id;
    this.subs = this.service.saveNumberFormat(save).subscribe((res) => {
      this.utils.toast.recordSaved();
      this.activeModal.close(true);
    },
      failed => {
        this.utils.toast.error(failed.error.message[0], 'Error');
      });
  }

  private getCompanyDropDown(): void {
    this.subs = this.service.getCompanyDropDown().subscribe(res => {
      this.companyDataSource = res;
    });
  }
}
