import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { NgProgress } from 'ngx-progressbar';

declare var $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    public notificationArray: Array<any>;
    public notificationMessage: string;

    public projectArray: Array<any>;
    public projectMessage: string;

    public todoArray: Array<any>;
    public todoMessage: string;

    public projectId: number;
    public memberCount: number;
    public duration: string;
    public notificationCount: number;
    public reportCount: number;


    constructor(private adminService: AdminService, private ngProgress: NgProgress) { }

    ngOnInit() {
        $.getScript('./assets/js/custom.js');
        this.ngProgress.start();
        this.getNotification();
        this.getProjects();
        this.getTodos();
    }

    getNotification() {
        this.adminService.getNotification().subscribe((notifications: any) => {
            if (notifications.message) {
                this.notificationMessage = 'No Activity';
            } else {
                notifications.forEach(element => {
                    const msPerMinute = 60 * 1000;
                    const msPerHour = msPerMinute * 60;
                    const msPerDay = msPerHour * 24;
                    const msPerMonth = msPerDay * 30;
                    const msPerYear = msPerDay * 365;
                    let time: any = 0;
                    const elapsed = Date.now() - new Date(element.updatedAt).getTime();

                    if (elapsed < msPerMinute) {
                        time = Math.round(elapsed / 1000) + ' seconds ago';
                    } else if (elapsed < msPerHour) {
                        time = Math.round(elapsed / msPerMinute) + ' minutes ago';
                    } else if (elapsed < msPerDay) {
                        time = Math.round(elapsed / msPerHour) + ' hours ago';
                    } else if (elapsed < msPerMonth) {
                        time = Math.round(elapsed / msPerDay) + ' days ago';
                    } else if (elapsed < msPerYear) {
                        time = Math.round(elapsed / msPerMonth) + ' months ago';
                    } else {
                        time = 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
                    }
                    element.time = time;
                });
                this.notificationArray = notifications.reverse();
            }
        }, (error) => {
            console.error(error);
        });
    }

    getProjects() {
        this.adminService.getAllProjects().subscribe((allProjects: any) => {
            if (allProjects.message) {
                this.projectMessage = allProjects.message;
            } else {
                this.projectArray = allProjects;
                if (this.projectArray.length > 0) {
                    this.projectId = this.projectArray[0].id;
                    this.seletedProject(this.projectId);
                }
            }
        }, (error) => {
            console.error(error);
        });
    }

    getTodos() {
        this.adminService.getTodos().subscribe((success: any) => {
            this.ngProgress.done();
            if (success.message) {
                this.todoMessage = 'No To Do Reminder';
            } else {
                this.todoArray = success;
            }

        }, (error) => {
            console.error(error);
        });
    }

    seletedProject(id) {
        this.adminService.getMembersCount(id).subscribe((getMembersCount: any) => {
            if (getMembersCount.message) {
                this.memberCount = 0;
            } else {
                this.memberCount = getMembersCount.length;
            }
        }, (err) => {
            console.error(err);
        });

        this.projectArray.forEach(eachProject => {
            if (eachProject.id === parseInt(id, 10)) {
                this.duration = eachProject.duration;
            }
        });

        this.adminService.getProjectNotifications(id).subscribe((getNotificationCount: any) => {
            if (getNotificationCount.message) {
                this.notificationCount = 0;
            } else {
                this.notificationCount = getNotificationCount.length;
            }
        }, (err) => {
            console.error(err);
        });

        this.adminService.getProjectReports(id, {}).subscribe((getReportsCount: any) => {
            if (getReportsCount.message) {
                this.reportCount = 0;
            } else {
                this.reportCount = getReportsCount.length;
            }
        }, (err) => {
            console.error(err);
        });

    }
}
