import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as alertFunctions from '../../../shared/data/sweet-alerts';

import { LoginService } from '../../login/login.service';

@Component({
    selector: 'app-forget',
    templateUrl: './forget.component.html',
    styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit {

    username: any;
    showMsg : boolean = false;

    constructor(private router: Router, private loginService: LoginService) { }

    ngOnInit() {
    }

    forgotPassword() {
       this.loginService.forgotPassword(this.username).subscribe((success: any) => {
        this.showMsg= true;
    }, (error) => {
        console.log(error);
        alertFunctions.errorPopup(
            'Incorrect Email',
            error.error.message,
            'Ok',
        ).then(result => {
        });
    });
    } 

}
