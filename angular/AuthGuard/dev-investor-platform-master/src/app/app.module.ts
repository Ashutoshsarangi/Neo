import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClickOutsideModule } from 'ng-click-outside';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { NgProgressModule } from 'ngx-progressbar';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import * as $ from 'jquery';

import { AuthGuard } from './shared/auth/auth.guard';
import { AuthService } from './shared/auth/auth.service';
import { HttpProviderService } from './services/http-provider.service';
import { DashboardService } from './module/dashboard/dashboard.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SessionStorageService } from './services/session-storage.service';
import { AdminService } from './module/admin/admin.service';
import { PaginationService } from './shared/pagination/pagination.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        FullLayoutComponent,
        ContentLayoutComponent,
    ],
    imports: [
        BrowserModule,
        ClickOutsideModule,
        AppRoutingModule,
        SharedModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgProgressModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        AuthGuard,
        AuthService,
        HttpProviderService,
        DashboardService,
        SessionStorageService,
        AdminService,
        PaginationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
