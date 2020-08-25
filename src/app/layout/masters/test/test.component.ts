import { DropDownModel } from './../../../core/models/drop-down.model';
import { IMasterPage } from './../../../shared/interfaces/imaster-page';
import { TestService } from './test.service';
import { TestModel } from './test.model';
import { UtilityService } from 'src/app/core/services/utility.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html'
})
export class TestComponent extends MasterPage<TestModel> implements OnInit, IMasterPage {
  countries: DropDownModel[];
  testGroupDataSource: DropDownModel[];
  constructor(public service: TestService, private formBuilder: FormBuilder, private utils: UtilityService) {
    super(service);
  }

  ngOnInit(): void {
    
    this.initGrid();
    this.initForm();
  }

  initGrid(): void {
    this.gridConfig = {
      table: 'test',
      title: 'Test List',
      screenCode: this.data.screenCode,
      columns: [
        {
          field: 'id',
          title: 'Key',
          width: '120'
        },
        {
          field: 'testName',
          title: 'Test Name',
          width: '200'
        },
       
        {
          field: 'anticoagulant',
          title: 'Anticoagulant',
          width: '200'
        },
        {
          field: 'notes',
          title: 'Description',
          width: '200'
        },
      ]
    };
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      testGroupId: ["", Validators.required],
      testName: ["", Validators.required],
      anticoagulant: ["", Validators.required],
      notes: [""]
    });
  }

  onAdd(): void {
    super.onAdd();
    this.loadDropdowns();
  }

  private loadDropdowns(): void {
    this.subs = this.utils.dropDown.getDropDownData('TestGroup/GetTestGroupDropDown').subscribe((res) => {
      this.testGroupDataSource = res;
    });
  }
  
  onEdit(id: number): void {
    this.id = id;
    this.form.reset();
    this.subs = this.service.getOneById(this.id).subscribe((data) => {
      this.showDetails = true;
      this.form.setValue({
        testGroupId: data.testGroupId,
        testName: data.testName,
        anticoagulant: data.anticoagulant,
        notes: data.notes
      });
      this.loadDropdowns();
    });
  }

  onSave(): void {
    const data = this.form.value;
    data.id = this.id;
    this.subs = this.service.save(data, this.id).subscribe((res) => {
      this.utils.storage.removeAuditReason();
      this.showDetails = false;
    });
  }

  onReset(): void {
    this.form.reset();
    if (this.id > 0) {
      this.onEdit(this.id);
    }
  }
}
