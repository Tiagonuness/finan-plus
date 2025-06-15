import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/appLayout/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { profileFinancial } from './app/pages/profileFinancial/profileFinancial';

export const routes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: 'dashboard', component: Dashboard, data: { title: 'Dashboard' } },
            { path: 'perfil-financeiro', component: profileFinancial, data: { title: 'Perfil Financeiro' } },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ]
    },
    // { path: 'landing', component: Landing },
    // { path: 'notfound', component: Notfound },
    // { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    // { path: '**', redirectTo: '/notfound' }
];
