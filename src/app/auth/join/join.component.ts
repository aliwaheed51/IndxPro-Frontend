import { UtilityService } from 'src/app/core/services/utility.service';
import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Destroyer } from 'src/app/core/utils/destroyer';
import { ToasterService } from '../../core/services/toaster.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent extends Destroyer implements OnInit {
  form: FormGroup;
  constructor(private injector: Injector, private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private utils: UtilityService) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
      userName: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required]
    });
  }

  join() {
    const value = this.form.value;
    this.subs = this.authService.join(value).subscribe((res: any) => {
      this.utils.storage.setUserData(res);
      const toster = this.injector.get(ToasterService);
      toster.success("Registration success.");
      this.router.navigate(['/']);
    });
  }
}
