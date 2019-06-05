import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AdminRoutingModule } from './admin-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { NgbModule, NgbModalModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgbDateFormatterFactory } from '../../shared/data/ngbDateFormatterFactory';
import { NgProgressModule } from 'ngx-progressbar';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AdminRoutingModule,
        ReactiveFormsModule,
        AngularMultiSelectModule,
        NgbModalModule,
        NgProgressModule,
        NgbModule.forRoot(),
        ImageCropperModule,
        SharedModule
    ],
    declarations: [
        SettingsComponent,
        DashboardComponent,
        ProjectComponent,
    ],
    providers: [
        NgbModalStack,
        {
            provide: NgbDateParserFormatter,
            useFactory: () => new NgbDateFormatterFactory()
        }
    ]
})
export class AdminModule { }
