import { Injectable } from '@angular/core';
import { HttpProviderService } from '../../services/http-provider.service';
import { AppConstants } from '../../config/constants';

@Injectable()
export class DashboardService {

    constructor(public http: HttpProviderService) {

    }

    getRoles() {
        return this.http.get(AppConstants.API_URL, '/roles/get', {});
    }

    getNotification() {
        return this.http.get(AppConstants.API_URL, '/notifications/get', {});
    }
}
