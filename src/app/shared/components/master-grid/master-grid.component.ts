import { UtilityService } from './../../../core/services/utility.service';
import { Constant } from 'src/app/core/constants/constants';
import { GridDataBinding } from '../../directives/grid-data-binding.directive';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { DataService } from 'src/app/core/services/data.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { formatDate, formatNumber } from '@angular/common';

@Component({
  selector: 'app-master-grid',
  templateUrl: './master-grid.component.html'
})
export class MasterGridComponent extends GridDataBinding implements OnInit {
  data: any[];
  url: string;
  companyName = '';
  now = new Date();
  @Input() moduleId = Constant.AuditModules.Master;
  actionWidth = 100;

  @Input() config: MasterGridConfig;
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() deleteClick: EventEmitter<any> = new EventEmitter();
  @Output() addClick: EventEmitter<any> = new EventEmitter();
  @Output() editClick: EventEmitter<any> = new EventEmitter();
  constructor(private utils: UtilityService) {
    super();
    this.allData = this.allData.bind(this);
  }

  ngOnInit(): void {
    this.companyName = this.utils.storage.CurrentUser.companyName;

    // this.config.columns.push({
    //   field: 'dummy',
    //   title: '',
    //   width: '*'
    // });
    
    this.url = this.config.table;
    if (this.config.query) {
      this.url += `/${this.config.query}`;
    }
    if (this.config.hideEdit) {
      this.actionWidth -= 35;
    }
    this.utils.data.get(this.url).subscribe((res: any[]) => {
      this.data = res;
    });
  }

  public allData(): ExcelExportData {
    const result: ExcelExportData = {
      data: this.data
    };
    return result;
  }

  getValue(dataItem: any, col: MasterGridColumn) {
    let value: any;
    if (col.field.indexOf('.') !== -1) {
      const fields = col.field.split('.');
      value = dataItem;
      fields.forEach((t) => {
        if (!value) {
          return null;
        }

        value = value[t];
      });
    } else {
      value = dataItem[col.field];
    }

    if (value) {
      if (col.dataType === Constant.DataType.Date) {
        value = formatDate(value, 'dd/MM/yyyy', 'en');
      } else if (col.dataType === Constant.DataType.Number) {
        value = formatNumber(value, 'en', '1.0-2');
      }
    }

    return value;
  }
}

export class MasterGridConfig {
  title?: string;
  table?: string;
  query?: string;
  hideToolbar?: boolean;
  hideEdit?: boolean;
  notPageable?: boolean;
  groupable?: boolean;
  columns?: MasterGridColumn[];
  customDelete?: boolean;
  screenCode?: string;
}

export class MasterGridColumn {
  field?: string;
  title?: string;
  width?: string;
  dataType?: number;
  button?: (d: any) => void;
}
