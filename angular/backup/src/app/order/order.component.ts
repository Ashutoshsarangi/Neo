import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: [ './order.component.css' ]
})
export class OrderComponent implements OnInit {
	constructor() {}
	//Assign order json shen onchange og the product select Box
	p: number = 1;
	itemsPage: number = 5;
	orderInput = {
		productid: '',
		quantity: 1,
		totalamount: '',
		customerid: '',
		amount: '',
		CGST: '',
		SGST: '',
		discount: ''
	};
	productList = [
		{ name: 'Soap', id: '1', amount: '13', cgst: '13', sgst: '18', discount: '50', unit: 'percent' },
		{ name: 'Biscut', id: '2', amount: '13', cgst: '13', sgst: '18', discount: '50', unit: 'price' },
		{ name: 'Soap', id: '3', amount: '13', cgst: '13', sgst: '18', discount: '50', unit: 'percent' },
		{ name: 'Biscut', id: '4', amount: '13', cgst: '13', sgst: '18', discount: '50', unit: 'price' },
		{ name: 'Soap', id: '5', amount: '13', cgst: '13', sgst: '18', discount: '50', unit: 'percent' },
		{ name: 'Biscut', id: '6', amount: '13', cgst: '13', sgst: '18', discount: '50', unit: 'price' },
		{ name: 'Soap', id: '7', amount: '13', cgst: '13', sgst: '18', discount: '50', unit: 'percent' },
		{ name: 'Biscut', id: '8', amount: '13', cgst: '13', sgst: '18', discount: '50', unit: 'price' }
	];

	customerList = [
		{ name: 'Ashu', id: '1' },
		{ name: 'BAsu', id: '2' },
		{ name: 'Gudu', id: '3' },
		{ name: 'Sonu', id: '4' },
		{ name: 'Bhart', id: '5' }
	];

	orderList = [
		{
			orderNumber: 'OR1234',
			customerName: 'Ashu',
			contactNumber: '9937549612',
			productName: 'Soap',
			quantity: '2',
			totalAmount: '1000'
		},
		{
			orderNumber: 'OR1234',
			customerName: 'Ashu',
			contactNumber: '9937549612',
			productName: 'Soap',
			quantity: '2',
			totalAmount: '1000'
		},
		{
			orderNumber: 'OR1234',
			customerName: 'Ashu',
			contactNumber: '9937549612',
			productName: 'Soap',
			quantity: '2',
			totalAmount: '1000'
		},
		{
			orderNumber: 'OR1234',
			customerName: 'Ashu',
			contactNumber: '9937549612',
			productName: 'Soap',
			quantity: '2',
			totalAmount: '1000'
		},
		{
			orderNumber: 'OR1234',
			customerName: 'Ashu',
			contactNumber: '9937549612',
			productName: 'Soap',
			quantity: '2',
			totalAmount: '1000'
		},
		{
			orderNumber: 'OR1234',
			customerName: 'Ashu',
			contactNumber: '9937549612',
			productName: 'Soap',
			quantity: '2',
			totalAmount: '1000'
		},
		{
			orderNumber: 'OR1234',
			customerName: 'Ashu',
			contactNumber: '9937549612',
			productName: 'Soap',
			quantity: '2',
			totalAmount: '1000'
		},
		{
			orderNumber: 'OR1234',
			customerName: 'Ashu',
			contactNumber: '9937549612',
			productName: 'Soap',
			quantity: '2',
			totalAmount: '1000'
		},
		{
			orderNumber: 'OR1234',
			customerName: 'Ashu',
			contactNumber: '9937549612',
			productName: 'Soap',
			quantity: '2',
			totalAmount: '1000'
		},
		{
			orderNumber: 'OR1234',
			customerName: 'Ashu',
			contactNumber: '9937549612',
			productName: 'Soap',
			quantity: '2',
			totalAmount: '1000'
		},
		{
			orderNumber: 'OR1234',
			customerName: 'Ashu',
			contactNumber: '9937549612',
			productName: 'Soap',
			quantity: '2',
			totalAmount: '1000'
		},
		{
			orderNumber: 'OR1234',
			customerName: 'Ashu',
			contactNumber: '9937549612',
			productName: 'Soap',
			quantity: '2',
			totalAmount: '1000'
		},
		{
			orderNumber: 'OR1234',
			customerName: 'Ashu',
			contactNumber: '9937549612',
			productName: 'Soap',
			quantity: '2',
			totalAmount: '1000'
		},
		{
			orderNumber: 'OR1234',
			customerName: 'Ashu',
			contactNumber: '9937549612',
			productName: 'Soap',
			quantity: '2',
			totalAmount: '1000'
		},
		{
			orderNumber: 'OR1234',
			customerName: 'Ashu',
			contactNumber: '9937549612',
			productName: 'Soap',
			quantity: '2',
			totalAmount: '1000'
		},
		{
			orderNumber: 'OR1234',
			customerName: 'Ashu',
			contactNumber: '9937549612',
			productName: 'Soap',
			quantity: '2',
			totalAmount: '1000'
		},
		{
			orderNumber: 'OR1234',
			customerName: 'Ashu',
			contactNumber: '9937549612',
			productName: 'Soap',
			quantity: '2',
			totalAmount: '1000'
		},
		{
			orderNumber: 'OR1234',
			customerName: 'Ashu',
			contactNumber: '9937549612',
			productName: 'Soap',
			quantity: '2',
			totalAmount: '1000'
		}
	];

	ngOnInit() {}
	onBlue() {
		console.log(this.orderInput);
		for (var i = 0; i < this.productList.length; i++) {
			if (this.productList[i].id == this.orderInput.productid) {
				this.orderInput.amount = (this.orderInput.quantity * parseInt(this.productList[i].amount)).toString();
				this.orderInput.CGST = this.productList[i].cgst;
				this.orderInput.SGST = this.productList[i].sgst;
				this.orderInput.discount = this.productList[i].discount + ' in ' + this.productList[i].unit;
				let tempAmount = this.orderInput.quantity * parseInt(this.productList[i].amount);
				let cgstValue = tempAmount * parseInt(this.productList[i].cgst) / 100;
				let sgstValue = tempAmount * parseInt(this.productList[i].sgst) / 100;
				let totalAmount = tempAmount + cgstValue + sgstValue;
				if (this.productList[i].unit == 'percent') {
					let temp = totalAmount * (parseInt(this.productList[i].discount) / 100);
					this.orderInput.totalamount = (totalAmount + temp).toString();
				} else if (this.productList[i].unit == 'price') {
					this.orderInput.totalamount = (totalAmount + parseInt(this.productList[i].discount)).toString();
				}
			}
		}
	}
	placeOrder() {
		console.log(this.orderInput);
		this.resetForm();
	}
	resetForm() {
		this.orderInput = {
			productid: '',
			quantity: 1,
			totalamount: '',
			customerid: '',
			amount: '',
			CGST: '',
			SGST: '',
			discount: ''
		};
	}

	editOrder(order) {}
	deleteOrder(order) {
		console.log(order);
	}
}
