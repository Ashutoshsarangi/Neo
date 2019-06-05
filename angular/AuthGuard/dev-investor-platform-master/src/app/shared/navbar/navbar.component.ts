import { Component, OnInit } from '@angular/core';
import * as alertFunctions from '../../shared/data/sweet-alerts';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AppConstants } from '../../config/constants';
import { AdminService } from '../../module/admin/admin.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    fullName: string;
    userProfileImage: string;
    isAdmin: boolean;

    constructor(private router: Router, private adminService: AdminService, private authService: AuthService) { }

    ngOnInit() {
        const sessionUser = this.authService.isAuthenticated();
        this.getMemberDetails(sessionUser.id);
        if (sessionUser.role.name === 'Administrator') {
            this.isAdmin = true;
        }
        this.adminService.getMember$.subscribe((success: any) => {
            this.fullName = success.first_name + ' ' + success.last_name;
            this.userProfileImage = (success.image) ? AppConstants.BASE_URL + '/' + success.image : 'assets/images/user-default.png';
        }, (error) => {
            console.log(error);
        });
    }

    getMemberDetails(id) {
        this.adminService.getMemberDetails(id).subscribe((success: any) => {
            this.adminService.getMember.next(success);
        }, (error) => {
            console.log(error);
        });
    }

    redirectToMain() {
        const sessionUser = this.authService.isAuthenticated();
        switch (sessionUser.role.name) {
            case 'Administrator':
            case 'Project Manager':
                // this.activeTab = 'dashboard';
                this.router.navigate(['/admin']);
                break;
            case 'Investor':
                this.router.navigate(['/dashboard']);
        }
    }

    redirectToProfile() {
        this.router.navigate(['/profile']);
    }

    logout() {
        alertFunctions.confirmPopup(
            'Logout',
            'Are you sure, you want to logout',
            'Yes',
            'No',
            false
        ).then(result => {
            if (result.value) {
                this.authService.logout();
                this.router.navigate(['/welcome']);
            }
        });
    }

}
