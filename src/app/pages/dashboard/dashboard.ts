import { Component, OnInit } from '@angular/core';
import { NotificationsWidget } from './components/notificationswidget';
import { StatsDashboard } from './components/statsdashboard/statsdashboard';
import { Transactions } from './components/transactions';
import { BestSellingWidget } from './components/bestsellingwidget';
import { RevenueStreamWidget } from './components/revenuestreamwidget';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
interface Meses {
    name: string;
    code: string;
}
@Component({
    selector: 'app-dashboard',
    imports: [StatsDashboard, Transactions, BestSellingWidget, RevenueStreamWidget, NotificationsWidget, FormsModule, SelectModule, IftaLabelModule],
    templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
    mes: Meses[] | undefined;

    selectedMes: Meses | undefined;

    ngOnInit() {
        this.mes = [
            { name: 'Todos', code: 'todos' },
            { name: 'Janeiro', code: '01' },
            { name: 'Fevereiro', code: '02' },
            { name: 'Março', code: '03' },
            { name: 'Abril', code: '04' },
            { name: 'Maio', code: '05' },
            { name: 'Junho', code: '06' },
            { name: 'Julho', code: '07' },
            { name: 'Agosto', code: '08' },
            { name: 'Setembro', code: '09' },
            { name: 'Outubro', code: '10' },
            { name: 'Novembro', code: '11' },
            { name: 'Dezembro', code: '12' },
        ];
    }
}