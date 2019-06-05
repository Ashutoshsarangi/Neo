import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-coupon',
	templateUrl: './coupon.component.html',
	styleUrls: [ './coupon.component.css' ]
})
export class CouponComponent implements OnInit {
	constructor() {}

	p: number = 1;
	itemsPage: number = 5;
	couponInput = {
		name: '',
		amount: '',
		unit: ''
	};
	editFlag = false;
	couponUnitList = [ { name: 'price', id: 'price' }, { name: 'percent', id: 'percent' } ];
	CouponList = [
		{ name: 'Coupon 1', amount: '10', unit: 'price' },
		{ name: 'Coupon 2', amount: '10', unit: 'price' },
		{ name: 'Coupon 3', amount: '10', unit: 'price' },
		{ name: 'Coupon 4', amount: '10', unit: 'percent' },
		{ name: 'Coupon 5', amount: '10', unit: 'price' },
		{ name: 'Coupon 1', amount: '10', unit: 'percent' },
		{ name: 'Coupon 1', amount: '10', unit: 'percent' },
		{ name: 'Coupon 1', amount: '10', unit: 'price' }
	];
	ngOnInit() {}
	addCoupon() {
		console.log(this.couponInput);
		this.resetForm();
	}
	updateCoupon() {
		console.log(this.couponInput);
		this.editFlag = false;
		this.resetForm();
	}
	editCoupon(coupon) {
		console.log(coupon);
		this.couponInput = coupon;
		this.editFlag = true;
	}

	deleteCoupon(coupon) {
		console.log(coupon);
	}
	resetForm() {
		this.couponInput = {
			name: '',
			amount: '',
			unit: ''
		};
	}
}
