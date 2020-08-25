import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FinishCatergoriesModel } from './finish-catergories.model';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { FinishCatergoriesService } from './finish-catergories.service';
import { FinishTypesService } from '../finish-types/finish-types.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-finish-catergories',
  templateUrl: './finish-catergories.component.html',
})
export class FinishCatergoriesComponent extends MasterPage<FinishCatergoriesModel> implements OnInit {
  finishTypes: any;
  @Input() data: any;
  @Output() backClick: EventEmitter<any> = new EventEmitter();
  public mask: string = "(999) 00-000-00-00";
  public default = { value: "Select item...", id: '' };
  constructor(public finishTypesService: FinishTypesService, public service: FinishCatergoriesService, private utils: UtilityService, private formBuilder: FormBuilder) {
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
      }
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      finishTypeID: ['', Validators.required],
      finishCatergories: ['', Validators.required]
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
      finishCatergories: data.finishCatergories
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

