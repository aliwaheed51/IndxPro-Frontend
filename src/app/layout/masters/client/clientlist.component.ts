import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientModel } from './client.model';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { ClientService } from './client.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/core/services/utility.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
@Component({
	selector: 'app-clientlist',
	templateUrl: './clientlist.component.html',
})
export class ClientlistComponent extends MasterPage<ClientModel> implements OnInit {
	constructor(public service: ClientService, private formBuilder: FormBuilder, private utils: UtilityService,) {
		super(service);
	}
	@ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
	public gridView: any[];
	gridData: ClientModel[];
	data: any;
	ngOnInit(): void {
		this.isSuperAdmin = this.utils.storage.CurrentUser.isSuperAdmin;
		this.GetData();
	}
	addClick() {
		this.showDetails = true;
		this.data = null;
	}

	GetData() {
		this.service.Get().subscribe(response => {
			if (response.code == true) {
				if (response.result.length > 0) {
					this.gridData = response.result;
					this.gridView = this.gridData;
				}
			}
			else {
				this.gridData = null;
				this.gridView = null;
			}
		});
	}
	onBack(): void {
		this.showDetails = false;
		this.GetData();
	}
	editClick(id: any) {
		this.id = id;
		this.service.GetOneById(this.id).subscribe((data) => {
			this.showDetails = true;
			this.data = data.result;
		});
	}
	public onFilter(inputValue: string): void {
		this.gridView = process(this.gridData, {
			filter: {
				logic: "or",
				filters: [
					{
						field: 'firstName',
						operator: 'contains',
						value: inputValue
					},
					{
						field: 'lastName',
						operator: 'contains',
						value: inputValue
					}
				],
			}
		}).data;
		this.dataBinding.skip = 0;
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
}