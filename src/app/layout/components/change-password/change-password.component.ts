import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilityService } from './../../../core/services/utility.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoginPreferenceModel } from '../../general-configuration/general-configuration/general-configuration.model';
import { GeneralConfigurationService } from '../../general-configuration/general-configuration/general-configuration.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {
    form: FormGroup;
    userName = '';
    isDisable = true;
    template = 'user';
    oldPassword = '';
    newPassword = '';
    reTypePassword = '';
    Message: any;
    changeButton: boolean;
    disabled: true;
    loginPreference: LoginPreferenceModel;
    constructor(
        private dialog: NgbModal,
        private _loginPreferenceService: GeneralConfigurationService,
        private utils: UtilityService, private activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
        ;
    }

    ngOnInit(): void {
        this.userName = this.utils.storage.CurrentUser.userName;
        this.initForm();
    }
    initForm(): void {
        this.form = this.formBuilder.group({
            userName: this.userName,
            oldPassword: ['', Validators.required],
            newPassword: ['', Validators.required],
            reTypePassword: ['', Validators.required],
        });
    }

    onValidUserName(): void {
        if (this.userName.trim() === '') {
            this.utils.toast.error(
                'Please insert username.',
                'Error message'
            );
            return;
        }
        this.utils.dropDown
            .userNameValidate(this.userName)
            .pipe()
            .subscribe(
                errorInfo => {
                    if (errorInfo && errorInfo.trim() !== '') {
                        this.utils.toast.error(errorInfo, 'Error message');
                    }
                    this.template = 'password';
                },
                errormsg => {
                    this.utils.toast.error(
                        errormsg.error.message[0],
                        'Error message'
                    );
                }
            );
    }

    onPasswordChange(): void {
        if (this.form.value.newPassword == '') {
            this.utils.toast.error(
                'Please enter new password.',
                'Error message'
            );
            return;
        }

        if (this.form.value.oldPassword == '') {
            this.utils.toast.error(
                'Please enter old password.',
                'Error message'
            );
            return;
        }


        if (this.form.value.newPassword != this.form.value.reTypePassword) {
            this.utils.toast.error(
                'New password and re-type password does not match.',
                'Error message'
            );
            return;
        }
        const userInfo = {
            userName: this.form.value.userName,
            newPassword: this.form.value.newPassword,
            oldPassword: this.form.value.oldPassword
        };
        this.utils.dropDown
            .changePassword(userInfo)
            .pipe()
            .subscribe(
                errorInfo => {
                    this.template = 'password';
                    this.utils.toast.info(
                        'Your password change successfully.'
                    );
                    this.activeModal.close();
                },
                errormsg => {
                    this.utils.toast.error(
                        errormsg.error.message[0],
                        'Error message'
                    );
                }
            );
    }

    onClose() {
        this.activeModal.close();
    }

    //   PasswordValidation(event: any) {
    //     this._loginPreferenceService
    //         .getLoginPreferencebyUsername(this.userName)
    //         .subscribe(aa => {
    //             this.loginPreference = aa;
    //             this.Message = [];
    //             const password = event.target.value;
    //             let hasNumber = /\d/.test(password);
    //             let hasUpper = /[A-Z]/.test(password);
    //             let hasLower = /[a-z]/.test(password);
    //             let specialCharecter = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    //             if (password.length == 0 || password == "" || password == null)
    //                 this.Message.push(" Password is Required!");
    //             else {
    //                 if (this.loginPreference.requiredAlphaNumber == true && hasNumber == false)
    //                     this.Message.push(" Must contain at least 1 number!");
    //                 if (this.loginPreference.requiredCapital == true && hasUpper == false)
    //                     this.Message.push(" Must contain at least 1 in Capital Case!");
    //                 // if (hasLower == false)
    //                 //     this.Message.push(" Must contain at least 1 Letter in Small Case!");
    //                 if (this.loginPreference.requiredSpecialChar == true && specialCharecter == false)
    //                     this.Message.push("Must contain at least 1 Special Character!");
    //                 if (password.length < this.loginPreference.minPasswordLength)
    //                     this.Message.push(" Must be at least " + this.loginPreference.minPasswordLength + " characters!");
    //             }
    //             this.MatchPassword();
    //         });
    //   }

    MatchPassword() {
        if ((this.form.value.newPassword == this.form.value.reTypePassword && this.form.value.oldPassword != "")) {
            this.changeButton = true;
        }
        else { this.changeButton = false; }
    }
}
