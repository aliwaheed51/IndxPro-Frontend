import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DepartmentModel } from './department.model';
import { DepartmentService } from './department.service';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { UtilityService } from 'src/app/core/services/utility.service';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-departmentlist',
  templateUrl: './departmentlist.component.html',

})
export class DepartmentlistComponent extends MasterPage<DepartmentModel> implements OnInit {

  constructor(public service: DepartmentService, private formBuilder: FormBuilder, private utils: UtilityService,) { super(service); }
  gridData: DepartmentModel[];
  data : any;
  ngOnInit(): void {
    this.GetData();
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      roleName: ['', Validators.required],
    });
  }
  GetData() {
    this.service.Get().subscribe(result => {
      if (result.length > 0) {
        this.gridData = result;
      }
    });
  }

  editClick(id: any) {
    
    this.id = id;
    this.form.reset();
    this.service.getOneById(this.id).subscribe((data) => {
      this.showDetails = true;
     this.data = data;
    });
  }

  addClick() {
    this.showDetails = true;
    this.data = null;
  }

  onDelete(id: number) {
    this.service.delete(id).subscribe(
      () => {
        this.utils.toast.recordDeleted();
        this.GetData() ;
      },
      (failed) => {
        this.utils.toast.error(failed.error.message[0], 'Error');
      }
    );
  }

  onBack(): void {
    this.showDetails = false;
    this.GetData();
  }

}

