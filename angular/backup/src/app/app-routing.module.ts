import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'
import { ProductComponent } from './product/product.component';
import { VenderComponent } from '../app/vender/vender.component';
import { CategoryComponent } from './category/category.component'
import { PurchaseComponent } from './purchase/purchase.component';
import { CustomerComponent } from './customer/customer.component'
import { OrderComponent } from './order/order.component'; 
import { LoginComponent } from './login/login.component';
import { ModuleComponent } from './module/module.component';
import { CouponComponent } from './coupon/coupon.component';
import { RoleComponent } from './role/role.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'product', component: ProductComponent },
  { path: 'vender', component: VenderComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'purchase', component: PurchaseComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'order', component: OrderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'role', component: RoleComponent },
  { path: 'module', component: ModuleComponent },
  { path: 'coupon', component: CouponComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
