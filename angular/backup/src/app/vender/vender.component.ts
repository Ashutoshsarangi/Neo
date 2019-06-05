import { Component, OnInit } from '@angular/core';
import { WebServicesService } from '../web-services.service'

@Component({
    selector: 'app-vender',
    templateUrl: './vender.component.html',
    styleUrls: ['./vender.component.css']
})
export class VenderComponent implements OnInit {
    constructor(private webservice: WebServicesService) { }
    venderInput = {
        name: '',
        company_name: '',
        contact_number: '',
        address: ''
    };
    searchText = '';
    editFlag = false;
    p: number = 1;
    itemsPage: number = 5;
    venderList = [];
    ngOnInit() {
        this.webservice.getVender('/vendor/getVendor').subscribe((item) => {
            this.venderList = item;
        });
    }
    addVender() {
        console.log(this.venderInput);
        this.webservice.addVender('/vendor/addVendor', this.venderInput).subscribe((item) => {
            if (item.success) {
                this.webservice.customSaveAlert('successfully Vender Detail added.')
            } else {
                this.webservice.customErrorAlert(item.message);
            }
        })
        this.resetForm();
    }
    updateVender() {
        console.log(this.venderInput);
        this.editFlag = false;
        this.resetForm();
    }
    editVender(vender) {
        console.log(vender);
        this.venderInput = vender;
        this.editFlag = true;
        // alert('edit');
    }
    resetForm() {
        this.venderInput = {
            name: '',
            company_name: '',
            contact_number: '',
            address: ''
        };
    }

    deleteVender(vender) {
        console.log(vender);
    }

}
