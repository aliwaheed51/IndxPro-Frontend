import { Directive, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { DataBindingDirective, GridComponent, ColumnComponent } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { UtilityService } from 'src/app/core/services/utility.service';

@Directive({
  selector: '[gridDataBinding]'
})
export class GridDataBindingDirective extends DataBindingDirective implements OnInit, OnDestroy {
  private serviceSubscription: Subscription;
  private gridData: any[] = [];
  @Input() gridDataBinding: string;
  @Input() searchObject: Object;
  _globalFilter: string;

  @Input() set globalFilter(value: string) {
    this._globalFilter = value;
    this.applyState({
      take: this.state.take,
      group: this.state.group
    });
    this.rebind();
  }
  constructor(private utilityService: UtilityService, protected grid: GridComponent) {
    super(grid);
  }
  public ngOnInit(): void {
    this.reloadData();
    super.ngOnInit();
  }
  public reloadData(isDeleted?: boolean): void {
    if (this.searchObject) {
      this.serviceSubscription = this.utilityService.data.post<any[]>(this.gridDataBinding, this.searchObject).subscribe((result) => {
        this.applyState({
          take: this.state.take,
          group: this.state.group
        });
        this.gridData = result;
        this.rebind();
      });
    } else {
      this.serviceSubscription = this.utilityService.data.get<any[]>(this.gridDataBinding, isDeleted).subscribe((result) => {
        this.applyState({
          take: this.state.take,
          group: this.state.group
        });
        this.gridData = result;
        this.rebind();
      });
    }
  }
  private loadData(): void {
    this.grid.loading = false;
    this.grid.data = process(this.filterArray(this.gridData, this._globalFilter), this.state);
    this.notifyDataChange();
  }
  public ngOnDestroy(): void {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
    super.ngOnDestroy();
  }

  public rebind(): void {
    this.grid.loading = true;
    this.loadData();
  }
  private getGridColumns(): string[] {
    const rtnObj = [];
    this.grid.visibleColumns.forEach((item: ColumnComponent) => {
      if (item.field) {
        // if (item.field !== 'id') {
        rtnObj.push(item.field);
        // }
      }
    });
    return rtnObj;
  }

  private filterArray(items: Array<any>, searchText: string): any {
    if (searchText) {
      return items.filter((item) => {
        const filter = this.getGridColumns(); // Object.keys(item);
        return filter.some((key) => {
          if (item[key]) {
            return item[key].toString().toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
          } else {
            return false;
          }
        });
      });
    }
    return items;
  }
}

@Directive()
export class GridDataBinding {
  @ViewChild(GridDataBindingDirective)
  private gridDataBindingDirective: GridDataBindingDirective;
  public globalFilter: string;
  public isDeleted = false;
  buttonData: Array<any> = [
    {
      text: 'To PDF',
      icon: 'pdfa',
      type: 'pdf'
    },
    {
      text: 'To Excel',
      icon: 'xlsa',
      type: 'excel'
    }
  ];
  public reloadData(): void {
    this.gridDataBindingDirective.reloadData(this.isDeleted ? true : null);
  }
  public onDeleteChange() {
    this.reloadData();
  }
}
