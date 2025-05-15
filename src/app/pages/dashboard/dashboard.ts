import { Component } from '@angular/core';
import { NotificationsWidget } from './components/notificationswidget';
import { StatsDashboard } from './components/statsdashboard';
import { Transactions } from './components/transactions';
import { BestSellingWidget } from './components/bestsellingwidget';
import { RevenueStreamWidget } from './components/revenuestreamwidget';

@Component({
    selector: 'app-dashboard',
    imports: [StatsDashboard, Transactions, BestSellingWidget, RevenueStreamWidget, NotificationsWidget],
    templateUrl: './dashboard.html',
})
export class Dashboard {}