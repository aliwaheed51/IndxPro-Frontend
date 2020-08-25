import { DropDownModel } from './../../../core/models/drop-down.model';
import { UtilityService } from './../../../core/services/utility.service';
import { FormBuilder, Validators, FormGroup  } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Destroyer } from 'src/app/core/utils/destroyer';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ssl, EmailSettingModel } from '../general-configuration/general-configuration.model';
import { GeneralConfigurationService } from '../general-configuration/general-configuration.service';


@Component({
  selector: 'app-email-settings',
  templateUrl: './email-settings.component.html'
})

export class EmailSettingsComponent extends Destroyer implements OnInit {
  form: FormGroup;
  companyDataSource: DropDownModel[];
  sslDataSource: ssl[] = [
    { value: true, viewValue: 'True' },
    { value: false, viewValue: 'False' },
  ];

  emailSettingDataSource: DropDownModel[];
  id: number;
  configurationId: number;
  emailSetting: EmailSettingModel;
  @Input() data: any;
  constructor(private service: GeneralConfigurationService, private formBuilder: FormBuilder, private activeModal: NgbActiveModal,
    private utils: UtilityService) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.getCompanyDropDown();
    this.getEmailSettingDropDown();
    if (this.data.id > 0) {
      this.onEdit(this.data.id);
    }
    else {
      this.configurationId = this.data.configurationId;
    }
  }

  initForm(): void {
   
     this.form = this.formBuilder.group({
      emailFrom: ['', Validators.required],
      portName: ['', Validators.required],
      domainName: ['', Validators.required],
      emailPassword: [''],
      mailSsl: [''],
      companyId: [''],
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
      emailFrom: this.data.emailFrom, 
      portName: this.data.portName,
      domainName: this.data.domainName,
      emailPassword: this.data.emailPassword,
      mailSsl: this.data.mailSsl,
      companyId: this.data.companyId
    });
     this.emailSetting = this.data;
  }

  onReset(): void {
    this.form.reset();
    if (this.id > 0) {
      this.onEdit(this.id);
    }
  }

  onSave() {
    const save = this.form.value;
    save.id = this.id;
    this.subs = this.service.saveEmailSetting(save).subscribe((res) => {
      this.utils.toast.recordSaved();
      this.activeModal.close(res);
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

  private getEmailSettingDropDown(): void {
    this.subs= this.service.getEmailSettingDropDown().subscribe(res => {
        this.emailSettingDataSource = res;
    });
  }
}
