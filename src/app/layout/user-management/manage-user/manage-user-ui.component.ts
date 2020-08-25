import { Component, OnInit, Input } from '@angular/core';
import { Constant } from 'src/app/core/constants/constants';
import { DialogService } from '@progress/kendo-angular-dialog';
import { ManageUserService } from '../manage-user/manage-user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UtilityService } from 'src/app/core/services/utility.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Destroyer } from 'src/app/core/utils/destroyer';
import { MasterGridConfig } from 'src/app/shared/components/master-grid/master-grid.component';
import { ManageUserComponent } from '../manage-user/manage-user.component';
import { IMasterPage } from 'src/app/shared/interfaces/imaster-page';
import { MasterPage } from 'src/app/shared/classes/master-page';
import { ManageUserModel, UserRole } from './manage-user.model';

@Component({
  selector: 'app-manage-user-ui',
  templateUrl: './manage-user-ui.component.html'
})
export class ManageUserUiComponent extends MasterPage<ManageUserModel>  implements OnInit ,IMasterPage{
  moduleId = Constant.AuditModules.UserManagement;
  constructor(public service: ManageUserService,
    private dialog: NgbModal, private formBuilder: FormBuilder, private utils: UtilityService,
    private dialogService: DialogService) {
    super(service);
  }

  ngOnInit(): void {
     this.initGrid();
    this.initForm();
  }
  gridConfig: MasterGridConfig;
  @Input() data: any;
  initGrid(): void {
    this.gridConfig = {
      table: 'user',
      title: 'User List',
      screenCode: this.data.screenCode,
      columns: [
        {
          field: 'id',
          title: 'Key',
          width: '120'
        },
        {
          field: 'userName',
          title: 'User Name',
          width: '150'
        },
        {
          field: 'firstName',
          title: 'First Name',
          width: '150'
        },
        {
          field: 'middleName',
          title: 'Middle Name',
          width: '150'
        },
        {
          field: 'lastName',
          title: 'Last Name',
          width: '150'
        },
        {
          field: 'email',
          title: 'Email ID',
          width: '200'
        },
        {
          field: 'role',
          title: 'Role',
          width: '200'
        }
      ]
    };
  }

  initForm(): void {
    this.form = this.formBuilder.group({
    });
  }
  form: FormGroup;
  id = 0;
  onEdit(id: number): void {
    this.id = id;
     this.openUserPopup(id);
  }

  onReset(): void {
    this.form.reset();
    
    if (this.id > 0) {
      this.onEdit(this.id);
    }
  }

  onAdd(): void {
    this.openUserPopup(null);
 }


  openUserPopup(id?: number) {
    const dialogRef = this.dialog.open(ManageUserComponent, { windowClass: 'white-modal modal-medium' });
    dialogRef.componentInstance.data = id;
    dialogRef.result.then((result) => {
      if (result) {
        this.grid.reloadData();
      }
    });
    
  }
   
  onSave(){
      
  }

  




  

 

  
  

 

}
