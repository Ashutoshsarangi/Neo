import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
    selector: 'app-newsfeed',
    templateUrl: './newsfeed.component.html',
    styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {

    public notifications: Array<any>;

    constructor(private dashboardService: DashboardService) {

    }

    ngOnInit() {
        this.dashboardService.getRoles().subscribe((success: any) => {
            console.log(success);
        }, (error) => {
            console.error(error);
        });

        this.dashboardService.getNotification().subscribe((success: any) => {
            if (!success.message) {
                this.notifications = success;
            }
            console.log(success);
        }, (error) => {
            console.error(error);
        });
    }

}
