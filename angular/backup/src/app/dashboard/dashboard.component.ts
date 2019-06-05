import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebServicesService } from '../web-services.service'
import { Local } from 'protractor/built/driverProviders';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    private flag;
    constructor(private router: Router, private webservice: WebServicesService) {

        this.flag = true;
    }
    monthList = [
        { name: 'January', id: 1 },
        { name: 'Feb', id: 2 },
        { name: 'March', id: 3 },
        { name: 'April', id: 4 },
        { name: 'May', id: 5 },
        { name: 'Jun', id: 6 },
    ];
    ngOnInit() {
        $('.navbar').removeClass('show')
        $('#sidebar').removeClass('show');
        if (!localStorage.getItem('firstLoad')) {
            localStorage['firstLoad'] = true;
            window.location.reload();
        }
        else {
            localStorage.removeItem('firstLoad');
        }
    }
    // openPage(){
    //   this._router.navigate(['/product']);
    // }
}
