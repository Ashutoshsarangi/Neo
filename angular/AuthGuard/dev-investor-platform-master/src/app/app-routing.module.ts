import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { FULL_ROUTES } from './shared/routes/full-layout.routes';
import { CONTENT_ROUTES } from './shared/routes/content-layout.routes';
import { AuthGuard } from './shared/auth/auth.guard';

const appRoutes: Routes = [
    { path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: FULL_ROUTES, canActivate: [AuthGuard] },
    { path: '', component: ContentLayoutComponent, data: { title: 'full Views' }, children: CONTENT_ROUTES, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { 'useHash': true, enableTracing: false })],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
