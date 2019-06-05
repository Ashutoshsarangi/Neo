import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-module',
	templateUrl: './module.component.html',
	styleUrls: [ './module.component.css' ]
})
export class ModuleComponent implements OnInit {
	constructor() {}

	p: number = 1;
	itemsPage: number = 5;
	moduleInput = {
		role: '',
		roleId: '',
		moduleId: '',
		module: '',
		description: ''
	};
	editFlag = false;
	roleList = [
		{ name: 'Admin', id: '1' },
		{ name: 'Sale', id: '2' },
		{ name: 'Accountact', id: '3' },
		{ name: 'User', id: '4' }
	];
	moduleList = [ { name: 'order', id: '1' }, { name: 'Purchase', id: '2' }, { name: 'vender', id: '3' } ];

	assignList = [
		{ role: 'Admin', module: 'order, Purchase, vender', moduleId: [ 1, 2, 3 ], roleId: 1, description: 'ashutosh' },
		{ role: 'Sales', module: 'order', moduleId: '1', roleId: 2, description: 'ashutosh' },
		{ role: 'Account', module: 'order, vender', moduleId: [ 1, 3 ], roleId: 3, description: 'ashutosh' }
	];

	ngOnInit() {}
	editModule(module) {
		console.log(module);
		this.moduleInput = module;
		this.editFlag = true;
	}
	onRoleSelect(id) {
		for (var i = 0; i < this.roleList.length; i++) {
			if (this.roleList[i].id == id) {
				this.moduleInput.role = this.roleList[i].name;
			}
		}
	}
	onModuleSelect() {
		console.log(this.moduleInput.moduleId);
		// for (var i = 0; i < this.productList.length; i++) {
		// 	if (this.productList[i].id == productId) {
		// 		this.purchaseInput.product = this.productList[i].name;
		// 	}
		// }
	}
	addModule() {
		console.log(this.moduleInput);
		this.resetForm();
	}
	updateModule() {
		console.log(this.moduleInput);
		this.editFlag = false;
		this.resetForm();
	}
	deleteModule(module) {
		console.log(module);
	}
	resetForm() {
		this.moduleInput = {
			role: '',
			roleId: '',
			moduleId: '',
			module: '',
			description: ''
		};
	}
}
