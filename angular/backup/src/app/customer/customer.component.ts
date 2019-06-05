import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-customer',
	templateUrl: './customer.component.html',
	styleUrls: [ './customer.component.css' ]
})
export class CustomerComponent implements OnInit {
	constructor() {}

	p: number = 1;
	itemsPage: number = 5;
	customerInput = {
		name: '',
		contact: '',
		address: ''
	};
	editFlag = false;
	customerList = [
		{ name: 'Ashu', contact: '9937549612', address: 'Ghansoli Sector 1' },
		{ name: 'Ashu', contact: '9937549612', address: 'Ghansoli Sector 1' },
		{ name: 'Ashu', contact: '9937549612', address: 'Ghansoli Sector 1' },
		{ name: 'Ashu', contact: '9937549612', address: 'Ghansoli Sector 1' },
		{ name: 'Ashu', contact: '9937549612', address: 'Ghansoli Sector 1' },
		{ name: 'Ashu', contact: '9937549612', address: 'Ghansoli Sector 1' },
		{ name: 'Ashu', contact: '9937549612', address: 'Ghansoli Sector 1' },
		{ name: 'Ashu', contact: '9937549612', address: 'Ghansoli Sector 1' },
		{ name: 'Ashu', contact: '9937549612', address: 'Ghansoli Sector 1' },
		{ name: 'Ashu', contact: '9937549612', address: 'Ghansoli Sector 1' },
		{ name: 'Ashu', contact: '9937549612', address: 'Ghansoli Sector 1' },
		{ name: 'Ashu', contact: '9937549612', address: 'Ghansoli Sector 1' },
		{ name: 'Ashu', contact: '9937549612', address: 'Ghansoli Sector 1' },
		{ name: 'Ashu', contact: '9937549612', address: 'Ghansoli Sector 1' },
		{ name: 'Ashu', contact: '9937549612', address: 'Ghansoli Sector 1' },
		{ name: 'Ashu', contact: '9937549612', address: 'Ghansoli Sector 1' },
		{ name: 'Ashu', contact: '9937549612', address: 'Ghansoli Sector 1' },
		{ name: 'Ashu', contact: '9937549612', address: 'Ghansoli Sector 1' },
		{ name: 'Ashu', contact: '9937549612', address: 'Ghansoli Sector 1' },
		{ name: 'Ashu', contact: '9937549612', address: 'Ghansoli Sector 1' }
	];
	ngOnInit() {}
	addCustomer() {
		console.log(this.customerInput);
		this.resetForm();
	}
	updateCustomer() {
		console.log(this.customerInput);
		this.editFlag = false;
		this.resetForm();
	}
	editCustomer(customer) {
		console.log(customer);
		this.customerInput = customer;
		this.editFlag = true;
	}

	deleteCustomer(customer) {
		console.log(customer);
	}
	resetForm() {
		this.customerInput = {
			name: '',
			contact: '',
			address: ''
		};
	}
}
