import { UtilityService } from 'src/app/core/services/utility.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Destroyer } from 'src/app/core/utils/destroyer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends Destroyer implements OnInit {
  form: FormGroup;
  roles: any[];
  selectedRoleId = 0;
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private utils: UtilityService) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      roleId: 0
    });
  }

  login() {

    const value = this.form.value;
    this.subs = this.authService.login(value).subscribe((res: any) => {
      // if (res.askToSelectRole) {
      //   this.roles = res.roles;
      // } else {
      this.utils.storage.setUserData(res);
      if (localStorage.length > 0)
        localStorage.removeItem("currentOpenMenu");
      this.router.navigate(['/']);
      // }
    });
  }

  roleSelected(role: any) {
    this.selectedRoleId = role.id;
    this.form.patchValue({
      roleId: role.id
    });
  }

  roleBack() {
    this.roles = null;
    this.form.patchValue({
      roleId: 0
    });
  }
}
