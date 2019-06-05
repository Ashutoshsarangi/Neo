import { Injectable } from '@angular/core';
import { AppConstants } from '../../config/constants';
import { HttpProviderService } from '../../services/http-provider.service';

@Injectable()
export class LoginService {
    constructor(private http: HttpProviderService) { }

    login(username, password) {
        const params = {
            email: username,
            password: password
        };
        return this.http.post(AppConstants.API_URL, '/members/login', params);
    }

    forgotPassword(username) {
        const params = {
            email: username
        };
        return this.http.post(AppConstants.API_URL, '/members/forgot-password', params);
    }

    resetPassword(id, data) {
        return this.http.post(AppConstants.API_URL, '/members/resetpassword/' + id, data);
    }

    checkToken(token) {
        return this.http.get(AppConstants.API_URL, '/members/reset/' + token);
    }
}
