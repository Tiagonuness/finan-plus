import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '../../service/layout.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule],
    templateUrl: './appTopbar.html',
})
export class AppTopbar {
    sectionTitle: string = '';
    items!: MenuItem[];

    private getCurrentRoute(route: ActivatedRoute): ActivatedRoute {
        while (route.firstChild) {
            route = route.firstChild;
        }
        return route;
    }

    private formatSectionTitle(path: string | undefined): string {
        if (!path) return '';
        return path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ');
    }

    constructor(public layoutService: LayoutService, private router: Router, private route: ActivatedRoute) {
        this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
            const currentRoute = this.getCurrentRoute(this.route);
            this.sectionTitle = currentRoute.snapshot.data['title'] || '';
        });
    }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
}
