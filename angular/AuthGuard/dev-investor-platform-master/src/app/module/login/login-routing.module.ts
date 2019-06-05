import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ForgetComponent } from './forget/forget.component';
import { ResetpassComponent } from './resetpass/resetpass.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'welcome',
        component: WelcomeComponent
    },
    {
        path: 'welcome',
        component: WelcomeComponent
    },
    {
        path: 'forgot-password',
        component: ForgetComponent
    },
    {
        path: 'reset-password/:id',
        component: ResetpassComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
