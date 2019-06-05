import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as alertFunctions from '../../../shared/data/sweet-alerts';
import { LoginService } from '../login.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { AppConstants } from '../../../config/constants';
import { NgProgress } from 'ngx-progressbar';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
    username: any;
    password: any;

    constructor(private router: Router,
        private loginService: LoginService,
        private sessionStorageService: SessionStorageService, private ngProgress: NgProgress) { }

    ngOnInit() {
        this.ngProgress.start();
        this.ngProgress.done();
    }

    login() {
        this.loginService.login(this.username, this.password).subscribe((success: any) => {
            if (success.id) {
                this.sessionStorageService.saveToSession(AppConstants.loginConfig.SESSION_KEY, success);
                switch (success.role.name) {
                    case 'Administrator':
                    case 'Project Manager':
                        this.router.navigate(['/admin']);
                        break;
                    case 'Investor':
                        this.router.navigate(['/dashboard']);
                        break;
                }
            }
        }, (error) => {
            console.log(error);
            alertFunctions.errorPopup(
                'Login Error',
                error.error.message,
                'Ok',
            ).then(result => {
                // console.log('Result => ', result);
            });
        });
    }
}
