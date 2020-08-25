import { DropDownModel } from './../../../core/models/drop-down.model';
import { UtilityService } from './../../../core/services/utility.service';
import { FormBuilder, Validators, FormGroup  } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Destroyer } from 'src/app/core/utils/destroyer';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailTemplateModel } from '../general-configuration/general-configuration.model';
import { GeneralConfigurationService } from '../general-configuration/general-configuration.service';

@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html'
})

export class EmailTemplateComponent extends Destroyer implements OnInit {
  form: FormGroup;
  companyDataSource: DropDownModel[];
  emailSettingDataSource: DropDownModel[];
  id: number;
  configurationId: number;
  emailTempate: EmailTemplateModel;
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
      keyName: ['', Validators.required],
      eMailSettingId: ['', Validators.required],
      subjectName: ['', Validators.required],
      bcc: [''],
      body: ['', Validators.required],
      companyId: ['', Validators.required],

     
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
      eMailSettingId: this.data.eMailSettingId,
      subjectName: this.data.subjectName,
      bcc: this.data.bcc,
      body: this.data.body,
      companyId: this.data.companyId,
    });
     this.emailTempate = this.data;
  }

  onSave() {
    const save = this.form.value;
    save.id = this.id;
    this.subs = this.service.saveEmailTemplate(save).subscribe((res) => {
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
