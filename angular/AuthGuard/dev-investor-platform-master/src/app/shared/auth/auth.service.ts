import { Injectable } from '@angular/core';
import { SessionStorageService } from '../../services/session-storage.service';
import { AppConstants } from '../../config/constants';

@Injectable()
export class AuthService {

    constructor(private sessionStorageService: SessionStorageService) { }

    logout() {
        this.sessionStorageService.deleteFromSession(AppConstants.loginConfig.SESSION_KEY);
    }

    isAuthenticated() {
        const accountDetails = this.sessionStorageService.getFromSession(AppConstants.loginConfig.SESSION_KEY);
        if (accountDetails) {
            return accountDetails;
        }
        return accountDetails;
    }
}
