import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IMasterPage } from 'src/app/shared/interfaces/imaster-page';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { DepartmentModel } from './department.model';
import { DepartmentService } from './department.service';
import { UtilityService } from 'src/app/core/services/utility.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html'
})
export class DepartmentComponent extends MasterPage<DepartmentModel> implements OnInit {
  @Input() data: any;
  @Output() backClick: EventEmitter<any> = new EventEmitter();
  constructor(public service: DepartmentService, private utils: UtilityService, private formBuilder: FormBuilder) {
    super(service);
  }

  ngOnInit(): void {
    this.showDetails = true;
    this.initForm();
    if (this.data != null && this.data.id > 0)
      this.setdata(this.data);
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      roleName: ['', Validators.required],
    });
  }

  onEdit(id: number): void {
    this.id = id;
    this.form.reset();
    this.subs = this.service.getOneById(this.id).subscribe((data) => {
      this.showDetails = true;
      this.form.setValue({
        roleName: data.roleName,
      });
    });
  }
  setdata(data: any): void {
    this.id = data.id;
    this.form.setValue({
      roleName: data.roleName,
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
