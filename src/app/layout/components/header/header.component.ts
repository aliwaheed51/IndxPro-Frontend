import { CurrentUserModel } from './../../../core/models/current-user';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/core/services/utility.service';
import { Destroyer } from './../../../core/utils/destroyer';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent extends Destroyer implements OnInit {
  currentUser: CurrentUserModel;
  showRoles = false;
  constructor(private utils: UtilityService,private dialog: NgbModal, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.currentUser = this.utils.storage.CurrentUser;
  }

  logout() {
    this.subs = this.utils.data.get<any>(`login/logout/${this.currentUser.userId}`).subscribe((res) => {
      localStorage.removeItem("currentOpenMenu");
      this.utils.storage.clear();
      this.router.navigate(['/auth']);
    });
  }

  changeRole(roleId: number): void {
    // if (this.currentUser.roleId === roleId) {
    //   return;
    // }

    this.showRoles = false;

    const data = {
      userId: this.currentUser.userId,
      roleId: roleId
    };

    this.utils.data.post('login/role', data).subscribe((res: CurrentUserModel) => {
      this.utils.storage.setUserData(res);
      this.currentUser = this.utils.storage.CurrentUser;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/']);
    });
  }

  openPasswordChange() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, { windowClass: 'white-modal modal-small' });
    dialogRef.result.then((result) => {
      if (result) {
      }
    });
    
  }
}
