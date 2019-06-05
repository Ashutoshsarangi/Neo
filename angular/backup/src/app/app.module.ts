import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { VenderComponent } from './vender/vender.component';
import { CategoryComponent } from './category/category.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { CustomerComponent } from './customer/customer.component';
import { OrderComponent } from './order/order.component';
import { LoginComponent } from './login/login.component';
import { CouponComponent } from './coupon/coupon.component';
import { RoleComponent } from './role/role.component';
import { ModuleComponent } from './module/module.component';

// Services
import { WebServicesService } from './web-services.service';

// Extra Plugins
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        ProductComponent,
        SideBarComponent,
        VenderComponent,
        CategoryComponent,
        PurchaseComponent,
        CustomerComponent,
        OrderComponent,
        LoginComponent,
        CouponComponent,
        RoleComponent,
        ModuleComponent
    ],
    imports: [BrowserModule, AppRoutingModule, NgxPaginationModule, HttpClientModule,
        Ng2SearchPipeModule, FormsModule],
    providers: [WebServicesService],
    bootstrap: [AppComponent]
})
export class AppModule { }
