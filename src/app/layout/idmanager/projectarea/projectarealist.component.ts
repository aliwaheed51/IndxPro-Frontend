import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectareaModel } from './projectarea.model';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { ProjectareaService } from './projectarea.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { UtilityService } from 'src/app/core/services/utility.service';
import { FormBuilder, Validators } from '@angular/forms';
import { process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-projectarealist',
  templateUrl: './projectarealist.component.html',
})
export class ProjectarealistComponent extends MasterPage<ProjectareaModel> implements OnInit {
  constructor(public service: ProjectareaService, private formBuilder: FormBuilder, private utils: UtilityService,) { super(service); }
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridView: any[];
  gridData: ProjectareaModel[];
  data: any;
  
  ngOnInit(): void {
    this.GetData();
    this.initForm();
  }
  initForm(): void {
    this.form = this.formBuilder.group({
      projectId: ['', Validators.required],
      areaName: ['', Validators.required],
      areaBudget: [''],
      areaWidth: [''],
      areaLength: [''],
      areaHeight: [''],
      areaDiameter: [''],
      areaFloor: [''],
      areaQuantity: [''],
    });
  }
  GetData() {
    this.service.Get().subscribe(result => {
      if (result.result !== null && result.result.length > 0) {
        this.gridData = result.result;
        this.gridView = this.gridData;
      }else{
        this.gridView = null;
      }
    });
  }

  onBack(): void {
    this.showDetails = false;
    this.GetData();
  }


  editClick(dataItem: any) {
    this.id = dataItem.id;
    this.form.reset();
    this.service.getOneById(this.id).subscribe((data) => {
      this.showDetails = true;
      this.data = data.result;
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
        this.GetData();
      },
      (failed) => {
        this.utils.toast.error(failed.error.message[0], 'Error');
      }
    );
  }

  public onFilter(inputValue: string): void {
    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: 'areaName',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'areaBudget',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'areaWidth',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'areaLength',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'areaHeight',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'areaDiameter',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'areaFloor',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'areaQuantity',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;
    this.dataBinding.skip = 0;
  }
}
