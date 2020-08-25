import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClientModel } from './client.model';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { ClientService } from './client.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FileModel } from '../../general-configuration/general-configuration/general-configuration.model';

@Component({
	selector: 'app-client',
	templateUrl: './client.component.html',
})
export class ClientComponent extends MasterPage<ClientModel> implements OnInit {
	profilePicPath: any;
	fileModel: FileModel;
	companies: any;

	public mask: string = "(999) 00-000-00-00";
	public password: string;
	@Input() data: any;
	@Output() backClick: EventEmitter<any> = new EventEmitter();
	constructor(public service: ClientService, public utils: UtilityService, private formBuilder: FormBuilder) {
		super(service);
	}
	ngOnInit(): void {
		this.getCompanies();
		this.isSuperAdmin = this.utils.storage.CurrentUser.isSuperAdmin;

		this.initForm();
		if (this.data != null && this.data.id > 0)
			this.setdata(this.data);
	}
	initForm(): void {
		this.form = this.formBuilder.group({
			clientCompanyName: ['', Validators.required],
			officeNoAndBuilding: [''],
			city: [''],
			country: [''],
			telephoneNumber: [''],
			email: ['', Validators.email],
			contactName: ['', Validators.required],
			contactTitle: [''],
			contactMobile: [''],
			companyId: [''],
			clientBankDetail: [''],
			id: 0,
			firstName: ['', Validators.required],
			lastName: ['', Validators.required]
		});
	}
	getCompanies(): void {
		this.subs = this.utils.dropDown
			.getCompanies()
			.subscribe(companies => {
				this.companies = companies;
			});
	}
	onEdit(id: number): void {
		this.id = id;
		this.form.reset();
		this.subs = this.service.getOneById(this.id).subscribe((data) => {
			this.showDetails = true;
			this.setdata(data.result);
		});
	}
	setdata(data: any): void {
		this.form.setValue({
			firstName: data.firstName ? data.firstName : "",
			lastName: data.lastName ? data.lastName : "",
			clientCompanyName: data.clientCompanyName ? data.clientCompanyName : "",
			officeNoAndBuilding: data.officeNoAndBuilding ? data.officeNoAndBuilding : "",
			city: data.city ? data.city : "",
			country: data.country ? data.country : "",
			telephoneNumber: data.telephoneNumber ? data.telephoneNumber : "",
			email: data.email ? data.email : "",
			contactName: data.contactName ? data.contactName : "",
			contactTitle: data.contactTitle ? data.contactTitle : "",
			contactMobile: data.contactMobile ? data.contactMobile : "",
			companyId: data.companyId ? data.companyId : "",
			clientBankDetail: data.clientBankDetail ? data.clientBankDetail : "",
			id: data.id ? data.id : 0,
			// usersId: data.usersId ? data.usersId : 0
		});
		this.profilePicPath = this.data.logo;
	}
	onSave(): void {
		const data = this.form.value;
		data.extension = this.fileModel != null || this.fileModel != undefined ? this.fileModel.extension : "";
		if (data.id > 0) {
			data.base64 = this.fileModel != null || this.fileModel != undefined ?
				this.fileModel.base64 : "";
			data.logo = this.data.fileName;
		}
		else {
			data.base64 = this.fileModel != null || this.fileModel != undefined ? this.fileModel.base64 : "";
		}
		// data.usersId = this.data.usersId;
		this.subs = this.service.saveUpdate(data, this.id).subscribe((res) => {
			this.showDetails = false;
			this.utils.toast.recordSaved();
			this.backClick.emit();
		});
	}
	fileChange(files: File[]) {
		if (files && files[0]) {
			const mimeType = files[0].type;
			if (mimeType.match(/image\/*/) == null) {
				return;
			}
			const name = files[0].name;
			const lastDot = name.lastIndexOf('.');
			const extension = name.substring(lastDot + 1);
			const reader = new FileReader();
			reader.readAsDataURL(files[0]);
			reader.onload = (event) => {
				this.profilePicPath = reader.result;
				this.fileModel = {
					base64: reader.result,
					extension: extension
				} as FileModel;
				this.form.markAsDirty();
			};
		}
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
