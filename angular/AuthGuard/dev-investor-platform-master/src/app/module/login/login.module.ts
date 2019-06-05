import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgProgressModule } from 'ngx-progressbar';

import { LoginRoutingModule } from './login-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { ForgetComponent } from './forget/forget.component';
import { LoginService } from './login.service';
import { TranslateModule } from '@ngx-translate/core';
import { ResetpassComponent } from './resetpass/resetpass.component';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgProgressModule,
        TranslateModule
    ],
    declarations: [
        WelcomeComponent,
        ForgetComponent,
        ResetpassComponent
    ],
    providers: [
        LoginService
    ]
})
export class LoginModule { }
