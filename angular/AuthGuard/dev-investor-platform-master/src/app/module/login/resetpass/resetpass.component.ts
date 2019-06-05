import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as alertFunctions from '../../../shared/data/sweet-alerts';
import { LoginService } from '../login.service';

@Component({
    selector: 'app-resetpass',
    templateUrl: './resetpass.component.html',
    styleUrls: ['./resetpass.component.scss']
})
export class ResetpassComponent implements OnInit {

    showMsg = false;
    token: string;
    @ViewChild('f') form: any;

    public changePassForm: any = {
        'new_password': [''],
        'confirm_new_password': ['']
    };

    changePasswordForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private loginService: LoginService,
        private router: Router
    ) {
        this.changePasswordForm = this.formBuilder.group(this.changePassForm);
    }

    ngOnInit() {
        this.token = this.route.snapshot.paramMap.get('id');
        if (this.token !== '') {
            this.loginService.checkToken(this.token).subscribe((success: any) => {
                // Do nothing
            }, (error) => {
                alertFunctions.errorPopup(
                    'Error',
                    error.error.message,
                    'Ok',
                ).then(result => {
                    this.router.navigateByUrl('welcome');
                });
            });
        } else {
            this.router.navigateByUrl('welcome');
        }
    }

    changepassword() {
        const passwordData = this.changePasswordForm.value;
        if (passwordData.new_password === '' || passwordData.confirm_new_password === '') {
            alertFunctions.errorPopup(
                'Error',
                'New Password and/or Confirm Password cannot be blank',
                'Ok',
            );
            return;
        }
        if (passwordData.new_password !== passwordData.confirm_new_password) {
            alertFunctions.errorPopup(
                'Error',
                'New Password and Confirm Password are mismatched',
                'Ok',
            );
            return;
        }
        this.loginService.resetPassword(this.token, passwordData).subscribe((success: any) => {
            this.showMsg = true;
            this.changePasswordForm.reset();
            setTimeout(() => {
                this.router.navigateByUrl('welcome');
            }, 2000);
        }, (error) => {
            alertFunctions.errorPopup(
                'Change Password Error',
                error.error.message,
                'Ok',
            ).then(result => {
            });
        });
    }
}
