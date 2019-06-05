import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
    constructor() { }
    p: number = 1;
    itemsPage: number = 5;
    productInput = {
        name: '',
        price: '',
        category: '',
        discount: '',
        unit: '',
        CGST: '',
        SGST: '',
        description: '',
        category_name: ''
    };
    editFlag = false;
    CategoryList = [{ name: 'Biscut', id: '1' }, { name: 'Cake', id: '2' }];
    ProductList = [
        {
            name: 'Sampoo',
            price: '12',
            category_name: 'Sampoo',
            category: '1',
            discount: '100',
            unit: 'price',
            CGST: '12',
            SGST: '12.3',
            description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd'
        },
        {
            name: 'Sampoo',
            price: '12',
            category_name: 'Sampoo',
            category: '1',
            discount: '100',
            unit: 'price',
            CGST: '12',
            SGST: '12.3',
            description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd'
        },
        {
            name: 'Sampoo',
            price: '12',
            category_name: 'Sampoo',
            category: '1',
            discount: '100',
            unit: 'price',
            CGST: '12',
            SGST: '12.3',
            description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd'
        },
        {
            name: 'Sampoo',
            price: '12',
            category_name: 'Sampoo',
            category: '1',
            discount: '100',
            unit: 'price',
            CGST: '12',
            SGST: '12.3',
            description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd'
        },
        {
            name: 'Sampoo',
            price: '12',
            category_name: 'Sampoo',
            category: '1',
            discount: '100',
            unit: 'price',
            CGST: '12',
            SGST: '12.3',
            description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd'
        },
        {
            name: 'Sampoo',
            price: '12',
            category_name: 'Sampoo',
            category: '1',
            discount: '100',
            unit: 'price',
            CGST: '12',
            SGST: '12.3',
            description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd'
        },
        {
            name: 'Sampoo',
            price: '12',
            category_name: 'Sampoo',
            category: '1',
            discount: '100',
            unit: 'price',
            CGST: '12',
            SGST: '12.3',
            description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd'
        },
        {
            name: 'Sampoo',
            price: '12',
            category_name: 'Sampoo',
            category: '1',
            discount: '100',
            unit: 'price',
            CGST: '12',
            SGST: '12.3',
            description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd'
        },
        {
            name: 'Sampoo',
            price: '12',
            category_name: 'Sampoo',
            category: '1',
            discount: '100',
            unit: 'price',
            CGST: '12',
            SGST: '12.3',
            description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd'
        },
        {
            name: 'Sampoo',
            price: '12',
            category_name: 'Sampoo',
            category: '1',
            discount: '100',
            unit: 'price',
            CGST: '12',
            SGST: '12.3',
            description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd'
        },
        {
            name: 'Sampoo',
            price: '12',
            category_name: 'Sampoo',
            category: '1',
            discount: '100',
            unit: 'price',
            CGST: '12',
            SGST: '12.3',
            description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd'
        },
        {
            name: 'Sampoo',
            price: '12',
            category_name: 'Sampoo',
            category: '1',
            discount: '100',
            unit: 'price',
            CGST: '12',
            SGST: '12.3',
            description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd'
        },
        {
            name: 'Sampoo',
            price: '12',
            category_name: 'Sampoo',
            category: '1',
            discount: '100',
            unit: 'price',
            CGST: '12',
            SGST: '12.3',
            description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd'
        },
        {
            name: 'Sampoo',
            price: '12',
            category_name: 'Sampoo',
            category: '1',
            discount: '100',
            unit: 'price',
            CGST: '12',
            SGST: '12.3',
            description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd'
        },
        {
            name: 'Sampoo',
            price: '12',
            category_name: 'Sampoo',
            category: '1',
            discount: '100',
            unit: 'price',
            CGST: '12',
            SGST: '12.3',
            description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd'
        },
        {
            name: 'Sampoo',
            price: '12',
            category_name: 'Sampoo',
            category: '1',
            discount: '100',
            unit: 'price',
            CGST: '12',
            SGST: '12.3',
            description: 'saadjsagdjsajdg d sajhdgjas djgsdj sdj dsagdjasdas das das dasd'
        }
    ];
    ngOnInit() { }
    addProduct() {
        console.log(this.productInput);
        this.resetForm();
    }
    updateProduct() {
        console.log(this.productInput);
        this.editFlag = false;
        this.resetForm();
    }
    resetForm() {
        this.productInput = {
            name: '',
            price: '',
            category: '',
            discount: '',
            unit: '',
            CGST: '',
            SGST: '',
            description: '',
            category_name: ''
        };
    }
    editProduct(product) {
        console.log(product);
        this.productInput = product;
        this.editFlag = true;
    }
    onSelect(categoryId) {
        for (var i = 0; i < this.CategoryList.length; i++) {
            if (this.CategoryList[i].id == categoryId) {
                this.productInput.category_name = this.CategoryList[i].name;
            }
        }
    }

    deleteProduct(product) {
        console.log(product);
    }

}
