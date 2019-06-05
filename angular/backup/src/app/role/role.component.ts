import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-role',
	templateUrl: './role.component.html',
	styleUrls: [ './role.component.css' ]
})
export class RoleComponent implements OnInit {
	constructor() {}

	p: number = 1;
	itemsPage: number = 5;
	roleInput = {
		name: '',
		description: ''
	};
	editFlag = false;
	roleList = [
		{ name: 'Admin', description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd' },
		{ name: 'Sales', description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd' },
		{ name: 'Accountant', description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd' }
	];
	ngOnInit() {}
	addRole() {
		console.log(this.roleInput);
		this.resetForm();
	}
	updateRole() {
		console.log(this.roleInput);
		this.editFlag = false;
		this.resetForm();
	}
	editRole(role) {
		console.log(role);
		this.roleInput = role;
		this.editFlag = true;
	}

	deleteRole(role) {
		console.log(role);
	}
	resetForm() {
		this.roleInput = {
			name: '',
			description: ''
		};
	}
}
