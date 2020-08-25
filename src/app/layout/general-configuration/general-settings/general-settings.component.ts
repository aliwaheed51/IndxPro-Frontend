import { DropDownModel } from './../../../core/models/drop-down.model';
import { UtilityService } from './../../../core/services/utility.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Destroyer } from 'src/app/core/utils/destroyer';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NumberFormatModel } from '../general-configuration/general-configuration.model';
import { GeneralConfigurationService } from '../general-configuration/general-configuration.service';
import { GeneralSettingsModel } from 'src/app/core/models/general-settings';

export interface ssl {
  value: boolean;
  viewValue: string;
}

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html'
})

export class GeneralSettingsComponent extends Destroyer implements OnInit {
  form: FormGroup;
  dateFormatDataSource: Array<string> = ['MM/dd/yyyy', 'dd/MM/yyyy', 'dd/MMM/yyyy', 'MMM/dd/yyyy'];
  timeFormatDataSource: Array<string> = ['HH:mm', 'hh:mm a'];
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
  generalSettings: GeneralSettingsModel;
  @Input() data: any;
  constructor(private service: GeneralConfigurationService, private formBuilder: FormBuilder, private activeModal: NgbActiveModal,
    private utils: UtilityService) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.getCompanyDropDown();
    this.onEdit(this.data.id);
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      dateFormat: ['', Validators.required],
      timeFormat: ['', Validators.required],
      idle: ['', Validators.required],
      timeout: ['', Validators.required],
      ping: ['', Validators.required],
      signalrUrl: ['', Validators.required]
    });
  }

  close() {
    this.activeModal.close();
  }

  onEdit(id: number): void {
    this.configurationId = this.data.configurationId;    
    this.id = id;
    this.form.reset();
    this.form.setValue({
      dateFormat: this.data.dateFormat,
      timeFormat: this.data.timeFormat,
      idle: +this.data.idle,
      timeout: +this.data.timeout,
      ping: +this.data.ping,
      signalrUrl: this.data.signalrUrl,
    });
    this.generalSettings = this.data;
  }

  onReset(): void {
    this.onEdit(this.id);
  }
  
  onSave() {
    const save = this.form.value;
    this.subs = this.service.saveGeneralSettings(save).subscribe((res) => {
      this.utils.toast.recordSaved();
      this.activeModal.close(res);
    },
      failed => {
        this.utils.toast.error(failed.error.message[0], 'Error');
      });
  }

  private getCompanyDropDown(callback: any = null): void {
    this.subs = this.service.getCompanyDropDown().subscribe(res => {
      this.companyDataSource = res;
    });
  }
}
