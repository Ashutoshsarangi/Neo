import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbModalModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { TranslateModule } from '@ngx-translate/core';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectComponent } from './project/project.component';
import { ReportsComponent } from './reports/reports.component';
import { NgbDateFormatterFactory } from '../../shared/data/ngbDateFormatterFactory';

@NgModule({
    imports: [
        CommonModule,
        ProjectsRoutingModule,
        NgbModule,
        NgbModalModule,
        TranslateModule
    ],
    declarations: [
        ProjectComponent,
        ReportsComponent,
    ],
    providers: [
        NgbModalStack,
        {
            provide: NgbDateParserFormatter,
            useFactory: () => new NgbDateFormatterFactory()
        }
    ]
})
export class ProjectsModule { }
