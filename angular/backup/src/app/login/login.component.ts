import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebServicesService } from '../web-services.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    constructor(private router: Router, private webservice: WebServicesService) { }

    ngOnInit() {
        $('.navbar').addClass('show')
        $('#sidebar').addClass('show');
    }
    loginField = {
        username: '',
        password: ''
    };
    private registerResponse;
    private loginResponse;
    registrationField = {
        emailId: '',
        contact: '',
        password: '',
        confPassword: '',
        username: '',
        address: ''
    };
    forgotPasswordField = {
        emailId: ''
    };
    validateUser(path) {
        if (path == 'login') {
            // this.loginResponse = this.webservice.loginUser('/user/loginUser', this.loginField)
            this.webservice.loginUser('/user/loginUser', this.loginField).subscribe((item) => {
                this.loginResponse = item;
                if (this.loginResponse.success) {
                    this.webservice.customSaveAlert("Successfully Logged in");
                    this.webservice.setData('userInfo', this.loginResponse);
                    this.router.navigateByUrl('/dashboard');
                } else {
                    this.webservice.customSaveAlert(this.loginResponse.message);
                }
            })
        } else if (path == 'register') {
            if (this.registrationField.password == this.registrationField.confPassword) {
                console.log(this.registrationField);
                this.webservice.registerUser('/user/registerUser', this.registrationField).subscribe((item) => {
                    this.registerResponse = item;
                    if (this.registerResponse.success) {
                        this.webservice.customSaveAlert("Successfully Registerd");
                        this.router.navigateByUrl('/dashboard');
                    } else {
                        this.webservice.customSaveAlert(this.registerResponse.message);
                    }
                })
            } else {
                this.webservice.customErrorAlert('password and Conf password Does not match');
            }
        } else {
            console.log(this.forgotPasswordField);
        }
    }
}
