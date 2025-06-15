import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule, PanelMenuModule],
    templateUrl: './app.menu.html',
    providers: [MessageService],
})
export class AppMenu implements OnInit {
    items!: MenuItem[];
    
    constructor(private router: Router) {}

    isActive(route: string | string[]): boolean {
        const current = this.router.url;
        return Array.isArray(route)
            ? current.startsWith(route[0])
            : current.startsWith(route);
    }
    
    ngOnInit() {
        this.items = [
            {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-home',
                route: ['/dashboard'],
                routerLinkActiveOptions: { exact: true }
            },
            {
                label: 'Perfil Financeiro',
                icon: 'pi pi-fw pi-id-card',
                items: [
                    {
                        label: 'Perfil Financeiro',
                        icon: 'pi pi-fw pi-chart-bar',
                        route: '/perfil-financeiro'
                    },
                    {
                        label: 'Tabela de gastos',
                        icon: 'pi pi-fw pi-list',
                        route: '/financial-table'
                    },
                    {
                        label: 'Planejamento Financeiro',
                        icon: 'pi pi-fw pi-book',
                        route: '/financial-planning'
                    },
                    {
                        label: 'Configuração',
                        icon: 'pi pi-fw pi-cog',
                        route: '/financial-settings'
                    }
                ]
            },
        ];
    }

}
