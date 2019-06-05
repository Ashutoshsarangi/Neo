import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { UppercasefirstPipe } from './pipes/uppercasefirst.pipe';

@NgModule({
    exports: [
        NavbarComponent,
        SidebarComponent,
        FooterComponent,
        TranslateModule,
        UppercasefirstPipe
    ],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule
    ],
    declarations: [
        NavbarComponent,
        SidebarComponent,
        FooterComponent,
        UppercasefirstPipe
    ]
})
export class SharedModule { }
