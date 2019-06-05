import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: [ './category.component.css' ]
})
export class CategoryComponent implements OnInit {
	p: number = 1;
	itemsPage: number = 5;
	categoryInput = {
		name: '',
		description: ''
	};
	editFlag = false;

	CategoryList = [
		{ name: 'Sampoo', description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd' },
		{ name: 'Sampoo', description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd' },
		{ name: 'Sampoo', description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd' },
		{ name: 'Sampoo', description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd' },
		{ name: 'Sampoo', description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd' },
		{ name: 'Sampoo', description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd' },
		{ name: 'Sampoo', description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd' },
		{ name: 'Sampoo', description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd' },
		{ name: 'Sampoo', description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd' },
		{ name: 'Sampoo', description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd' },
		{ name: 'Sampoo', description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd' },
		{ name: 'Sampoo', description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd' },
		{ name: 'Sampoo', description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd' },
		{ name: 'Sampoo', description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd' },
		{ name: 'Sampoo', description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd' },
		{ name: 'Sampoo', description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd' },
		{ name: 'Sampoo', description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd' },
		{ name: 'Sampoo', description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd' },
		{ name: 'Sampoo', description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd' },
		{ name: 'Biscut', description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd' }
	];
	ngOnInit() {}
	addCategory() {
		console.log(this.categoryInput);
		this.resetForm();
	}
	updateCategory() {
		console.log(this.categoryInput);
		this.editFlag = false;
		this.resetForm();
	}
	editCategory(category) {
		console.log(category);
		this.categoryInput = category;
		this.editFlag = true;
	}

	deleteCategory(category) {
		// alert('Delete');
		console.log(category);
	}
	resetForm() {
		this.categoryInput = {
			name: '',
			description: ''
		};
	}
}
