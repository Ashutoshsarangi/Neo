import { Routes } from '@angular/router';

// Route for content layout with sidebar, navbar and footer.

export const FULL_ROUTES: Routes = [
    {
        path: 'dashboard',
        loadChildren: './module/dashboard/dashboard.module#DashboardModule'
    },
    {
        path: 'projects',
        loadChildren: './module/projects/projects.module#ProjectsModule'
    },
    {
        path: 'search',
        loadChildren: './module/search/search.module#SearchModule'
    },
    {
        path: 'admin',
        loadChildren: './module/admin/admin.module#AdminModule'
    },
    {
        path: 'profile',
        loadChildren: './module/account/account.module#AccountModule'
    }
];
