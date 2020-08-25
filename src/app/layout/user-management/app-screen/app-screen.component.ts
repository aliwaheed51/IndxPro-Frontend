import { DropDownModel } from './../../../core/models/drop-down.model';
import { IMasterPage } from './../../../shared/interfaces/imaster-page';
import { FormBuilder, Validators } from '@angular/forms';
import { AppScreenModel } from './app-screen.model';
import { AppScreenService } from './app-screen.service';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-screen',
  templateUrl: './app-screen.component.html'
})
export class AppScreenComponent extends MasterPage<AppScreenModel> implements OnInit, IMasterPage {
  documentDataSource: DropDownModel[];
  parentAppScreenDataSource: DropDownModel[];
  constructor(public service: AppScreenService, private formBuilder: FormBuilder) {
    super(service);
  }

  ngOnInit(): void {
    this.initGrid();
    this.initForm();
    this.getParentAppScreenDropDown();
  }

  initGrid(): void {
    this.gridConfig = {
      table: 'appscreen',
      title: 'AppScreen List',
      screenCode:this.data.screenCode,
      columns: [
        {
          field: 'id',
          title: 'Key',
          width: '120'
        },
        {
          field: 'screenName',
          title: 'Screen Name',
          width: '200'
        },
        {
          field: 'parentScreenName',
          title: 'Parent',
          width: '150'
        },
        {
          field: 'urlName',
          title: 'URL',
          width: '150'
        },
        {
          field: 'seqNo',
          title: 'Sequence',
          width: '150'
        }
      ]
    };
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      screenName: ['', Validators.required],
      parentAppScreenId: ['', Validators.required],
      urlName: [''],
      seqNo: [''],
      iconPath: [''],
      screenCode: [''],
      isMenu: [''],
      isPermission: [''],
      isView: [''],
      isAdd: [''],
      isEdit: [''],
      isDelete: [''],
      isExport: ['']
    });
  }

  onEdit(id: number): void {
    this.id = id;
    this.subs = this.service.getOneById(this.id).subscribe((data) => {
      this.showDetails = true;
      this.form.setValue({
        screenName: data.screenName,
            parentAppScreenId: data.parentAppScreenId,
            urlName: data.urlName,
            seqNo: data.seqNo,
            iconPath: data.iconPath,
            screenCode: data.screenCode,
            isMenu: data.isMenu,
            isPermission: data.isPermission,
            isView: data.isView,
            isAdd: data.isAdd,
            isEdit: data.isEdit,
            isDelete: data.isDelete,
            isExport: data.isExport
      });
    });
  }

  onSave(): void {
    const data = this.form.value;
    data.id = this.id;
    this.subs = this.service.save(data, this.id).subscribe((res) => {
      this.showDetails = false;
    });
  }

  numberOnly(value: any) {
    var keyCode = value.which ? value.which : value.keyCode
    var ret = (keyCode >= 48 && keyCode <= 57);
    //ret ? "" : this.utilityService.toaster.error('only digit allows.');
    return ret;
  }

  onReset(): void {
    this.form.reset();
    if (this.id > 0) {
      this.onEdit(this.id);
    }
  }

  private getParentAppScreenDropDown(): void {
    this.subs = this.service.getAppScreenDropDown().subscribe(res => {
        this.parentAppScreenDataSource = res;
    });
  }

}
