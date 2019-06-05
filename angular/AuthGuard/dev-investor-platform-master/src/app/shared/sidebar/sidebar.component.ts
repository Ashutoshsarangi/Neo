import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AdminService } from '../../module/admin/admin.service';
import { AppConstants } from '../../config/constants';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    public isActive: string;
    public showDash: boolean;
    public userInfo: any;
    public projectList: Array<any>;
    public baseURL = AppConstants.BASE_URL;

    constructor(private router: Router, private authService: AuthService, private adminService: AdminService) { }

    ngOnInit() {

        this.userInfo = this.authService.isAuthenticated();

        switch (this.userInfo.role.name) {
            case 'Administrator':
            case 'Project Manager':
                // this.isActive = 'dashboard';
                this.showDash = true;
                break;
            case 'Investor':
                this.showDash = false;
            // this.isActive = 'newsfeed';
        }

        this.router.events.subscribe((e: any) => {
            if (e.url === '/admin') {
                this.adminService.setSidebarActiveTab.next('dashboard');
            }
            if (e.url === '/dashboard') {
                this.adminService.setSidebarActiveTab.next('newsfeed');
            }
        });

        this.adminService.getProjects$.subscribe((success: any) => {
            if (this.userInfo.role.name === 'Investor') {
                this.getInvestorProject(this.userInfo.id);
            } else {
                this.getProjects();
            }
        }, (error) => {
            console.log(error);
        });

        this.adminService.sidebarActiveTab$.subscribe((success: any) => {
            this.isActive = success;
        });
    }

    getProjects() {
        this.adminService.getAllProjects().subscribe((success: any) => {
            if (success.message) {
                this.projectList = [];
            } else {
                this.projectList = success;
            }
        }, (error) => {
            console.log(error);
        });
    }

    getInvestorProject(id) {
        this.adminService.getInvestorProject(id).subscribe((success: any) => {
            if (success.message) {
                this.projectList = [];
            } else {
                this.projectList = [];
                success.forEach((eachProj) => {
                    this.projectList.push(eachProj.project);
                });
            }
        }, (error) => {
            console.log(error);
        });
    }

    setRedirect() {
        this.router.navigate(['/admin/project']);
    }

    navLink(link, activeTab, id) {

        if (!link) {
            switch (this.userInfo.role.name) {
                case 'Administrator':
                case 'Project Manager':
                    link = 'admin/project';
                    break;
                case 'Investor':
                    link = 'projects';
                    break;
            }
        }
        this.adminService.setSidebarActiveTab.next(activeTab);
        if (id) {
            link = link + '/' + id;
        }
        this.router.navigate([link]);
    }

}
