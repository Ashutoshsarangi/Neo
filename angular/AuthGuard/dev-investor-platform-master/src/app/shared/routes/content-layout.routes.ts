import { Routes } from '@angular/router';

// Route for content layout with sidebar, navbar and footer.

export const CONTENT_ROUTES: Routes = [
    {
        path: '',
        loadChildren: './module/login/login.module#LoginModule'
    }
];
