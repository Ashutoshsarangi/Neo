import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
import { WebServicesService } from '../web-services.service'

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

    constructor(private router: Router, private webservice: WebServicesService) { }
    menus = [
        { name: 'dashboard' },
        { name: 'vender' },
        { name: 'category' },
        { name: 'product' },
        { name: 'purchase' },
        { name: 'order' },
        { name: 'customer' },
        { name: 'role' },
        { name: 'module' },
        { name: 'coupon' },
        // {name: 'contact'},

    ];
    selectedItem: string = 'dashboard';
    public userName = ''
    private cnt = 1;
    ngOnInit() {
        // alert('1');
        let temp = window.location.href.split('/')[3];
        this.selectedItem = temp;
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
        });
        if (this.selectedItem != 'login') {
            $('.navbar').removeClass('show');
            $('#sidebar').removeClass('show');
        } else {
            $('.navbar').addClass('show');
            $('#sidebar').addClass('show');
        }
        if (this.webservice.getData('userInfo')) {
            this.userName = this.webservice.getData('userInfo').data;
        }
    }

    toogleClass(event, newValue) {
        console.log(newValue);
        $('.navbar').removeClass('show')
        $('#sidebar').removeClass('show');
        this.selectedItem = newValue.name;
        this.router.navigateByUrl('/' + newValue.name);
    }
    logOut() {
        window.localStorage.clear();
    }

}
