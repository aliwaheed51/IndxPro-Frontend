import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FinishDescriptionModel } from './finish-description.model';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { FinishDescriptionService } from './finish-description.service';
import { FinishTypesService } from '../finish-types/finish-types.service';
import { FinishCatergoriesService } from '../finish-catergories/finish-catergories.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-finish-description',
  templateUrl: './finish-description.component.html',
})
export class FinishDescriptionComponent extends MasterPage<FinishDescriptionModel> implements OnInit {
  finishTypes: any;
  finishCatergories: any;
  @Input() data: any;
  @Output() backClick: EventEmitter<any> = new EventEmitter();
  public mask: string = "(999) 00-000-00-00";
  public default = { value: "Select item...", id: '' };
  constructor(public finishTypesService: FinishTypesService,
    public finishCatergoriesService: FinishCatergoriesService,
    public service: FinishDescriptionService,
    private utils: UtilityService,
    private formBuilder: FormBuilder) {
    super(service);
  }

  ngOnInit(): void {
    this.initForm();
    if (this.data != null && this.data.id > 0) {
      this.setdata(this.data);
    }
    this.getFinishTypes();
  }

  getFinishTypes(): void {
    this.finishTypesService.GetFinishTypesDropdown().subscribe(result => {
      if (result) {
        this.finishTypes = result;
        if (this.data != null && this.data.id > 0) {
          this.handleFinishTypeChange(this.data.finishTypeID, true);
        }
      }
    });
  }

  handleFinishTypeChange(value, isInit = false): void {
    this.finishCatergories = [];
    this.finishCatergoriesService.GetFinishCategoriesDropdownByFinishType(value).subscribe(result => {
      if (result) {
        this.finishCatergories = result;
      }
    });

    if (!isInit) {
      this.form.controls['finishCatergoriesID'].setValue('');
    }
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      finishTypeID: ['', Validators.required],
      finishCatergoriesID: ['', Validators.required],
      finishDescription: ['', Validators.required]
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
      finishTypeID: data.finishTypeID,
      finishCatergoriesID: data.finishCatergoriesID,
      finishDescription: data.finishDescription
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

