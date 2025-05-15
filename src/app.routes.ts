import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/appLayout/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';

export const routes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard }
        ]
    },
    // { path: 'landing', component: Landing },
    // { path: 'notfound', component: Notfound },
    // { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    // { path: '**', redirectTo: '/notfound' }
];
