import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-purchase',
	templateUrl: './purchase.component.html',
	styleUrls: [ './purchase.component.css' ]
})
export class PurchaseComponent implements OnInit {
	constructor() {}
	p: number = 1;
	itemsPage: number = 5;
	purchaseInput = {
		vendername: '',
		venderId: '',
		productId: '',
		product: '',
		amount: '',
		quantity: '',
		totalprice: '',
		CGST: '',
		SGST: ''
	};
	editFlag = false;

	venderList = [
		{ name: 'Ashu', id: '1' },
		{ name: 'Bashu', id: '2' },
		{ name: 'Bharat', id: '3' },
		{ name: 'Avinash', id: '4' }
	];
	productList = [
		{ name: 'Soap', id: '1' },
		{ name: 'Biscut', id: '2' },
		{ name: 'Rice', id: '3' },
		{ name: 'Dal', id: '4' },
		{ name: 'Egg', id: '5' }
	];
	purchaseList = [
		{
			vendername: 'Ashu',
			product: 'Soap',
			amount: '12',
			quantity: '100',
			totalprice: '1000',
			CGST: '12',
			SGST: '12.3',
			venderId: '1',
			productId: '1'
		},
		{
			vendername: 'Ashu',
			product: 'Soap',
			amount: '12',
			quantity: '100',
			totalprice: '1000',
			CGST: '12',
			SGST: '12.3',
			venderId: '1',
			productId: '1'
		},
		{
			vendername: 'Ashu',
			product: 'Soap',
			amount: '12',
			quantity: '100',
			totalprice: '1000',
			CGST: '12',
			SGST: '12.3',
			venderId: '1',
			productId: '1'
		},
		{
			vendername: 'Ashu',
			product: 'Soap',
			amount: '12',
			quantity: '100',
			totalprice: '1000',
			CGST: '12',
			SGST: '12.3',
			venderId: '1',
			productId: '1'
		},
		{
			vendername: 'Ashu',
			product: 'Soap',
			amount: '12',
			quantity: '100',
			totalprice: '1000',
			CGST: '12',
			SGST: '12.3',
			venderId: '1',
			productId: '1'
		},
		{
			vendername: 'Ashu',
			product: 'Soap',
			amount: '12',
			quantity: '100',
			totalprice: '1000',
			CGST: '12',
			SGST: '12.3',
			venderId: '1',
			productId: '1'
		},
		{
			vendername: 'Ashu',
			product: 'Soap',
			amount: '12',
			quantity: '100',
			totalprice: '1000',
			CGST: '12',
			SGST: '12.3',
			venderId: '1',
			productId: '1'
		},
		{
			vendername: 'Ashu',
			product: 'Soap',
			amount: '12',
			quantity: '100',
			totalprice: '1000',
			CGST: '12',
			SGST: '12.3'
		},
		{
			vendername: 'Ashu',
			product: 'Soap',
			amount: '12',
			quantity: '100',
			totalprice: '1000',
			CGST: '12',
			SGST: '12.3'
		},
		{
			vendername: 'Ashu',
			product: 'Soap',
			amount: '12',
			quantity: '100',
			totalprice: '1000',
			CGST: '12',
			SGST: '12.3'
		},
		{
			vendername: 'Ashu',
			product: 'Soap',
			amount: '12',
			quantity: '100',
			totalprice: '1000',
			CGST: '12',
			SGST: '12.3'
		},
		{
			vendername: 'Ashu',
			product: 'Soap',
			amount: '12',
			quantity: '100',
			totalprice: '1000',
			CGST: '12',
			SGST: '12.3'
		},
		{
			vendername: 'Ashu',
			product: 'Soap',
			amount: '12',
			quantity: '100',
			totalprice: '1000',
			CGST: '12',
			SGST: '12.3'
		},
		{
			vendername: 'Ashu',
			product: 'Soap',
			amount: '12',
			quantity: '100',
			totalprice: '1000',
			CGST: '12',
			SGST: '12.3'
		},
		{
			vendername: 'Ashu',
			product: 'Soap',
			amount: '12',
			quantity: '100',
			totalprice: '1000',
			CGST: '12',
			SGST: '12.3'
		},
		{
			vendername: 'Ashu',
			product: 'Soap',
			amount: '12',
			quantity: '100',
			totalprice: '1000',
			CGST: '12',
			SGST: '12.3'
		},
		{
			vendername: 'Ashu',
			product: 'Soap',
			amount: '12',
			quantity: '100',
			totalprice: '1000',
			CGST: '12',
			SGST: '12.3'
		},
		{
			vendername: 'Ashu',
			product: 'Soap',
			amount: '12',
			quantity: '100',
			totalprice: '1000',
			CGST: '12',
			SGST: '12.3'
		},
		{
			vendername: 'Ashu',
			product: 'Soap',
			amount: '12',
			quantity: '100',
			totalprice: '1000',
			CGST: '12',
			SGST: '12.3'
		},
		{
			vendername: 'Ashu',
			product: 'Soap',
			amount: '12',
			quantity: '100',
			totalprice: '1000',
			CGST: '12',
			SGST: '12.3'
		},
		{
			vendername: 'Ashu',
			product: 'Soap',
			amount: '12',
			quantity: '100',
			totalprice: '1000',
			CGST: '12',
			SGST: '12.3'
		},
		{
			vendername: 'Ashu',
			product: 'Soap',
			amount: '12',
			quantity: '100',
			totalprice: '1000',
			CGST: '12',
			SGST: '12.3'
		},
		{
			vendername: 'Ashu',
			product: 'Soap',
			amount: '12',
			quantity: '100',
			totalprice: '1000',
			CGST: '12',
			SGST: '12.3'
		}
	];
	ngOnInit() {}
	addPurchase() {
		console.log(this.purchaseInput);
		this.resetForm();
	}
	updatePurchase() {
		console.log(this.purchaseInput);
		this.editFlag = false;
		this.resetForm();
	}
	resetForm() {
		this.purchaseInput = {
			vendername: '',
			venderId: '',
			productId: '',
			product: '',
			amount: '',
			quantity: '',
			totalprice: '',
			CGST: '',
			SGST: ''
		};
	}
	onVenderSelect(venderId) {
		for (var i = 0; i < this.venderList.length; i++) {
			if (this.venderList[i].id == venderId) {
				this.purchaseInput.vendername = this.venderList[i].name;
			}
		}
	}
	onProductSelect(productId) {
		for (var i = 0; i < this.productList.length; i++) {
			if (this.productList[i].id == productId) {
				this.purchaseInput.product = this.productList[i].name;
			}
		}
	}
	editPurchase(purchase) {
		console.log(purchase);
		this.purchaseInput = purchase;
		this.editFlag = true;
	}

	deletePurchase(purchase) {
		console.log(purchase);
		alert('Delete');
	}
}
