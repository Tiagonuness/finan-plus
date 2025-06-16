import { Component, OnInit } from '@angular/core';
import { NotificationsWidget } from './components/notificationswidget';
import { StatsDashboard } from './components/statsdashboard';
import { Transactions } from './components/transactions';
import { BestSellingWidget } from './components/bestsellingwidget';
import { GraficoTipoGasto } from './components/graficotipogasto';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PrimeNG } from 'primeng/config';
import { FloatLabelModule } from 'primeng/floatlabel';
import { GraficoGastoMensalComponent } from './components/graphicMonthlyExpense';

interface Meses {
    name: string;
    code: string;
}
@Component({
    selector: 'app-dashboard',
    imports: [StatsDashboard, Transactions, BestSellingWidget, 
        GraficoTipoGasto, NotificationsWidget, FormsModule, 
        SelectModule, SelectButtonModule, DatePickerModule,
        FloatLabelModule, GraficoGastoMensalComponent],
    templateUrl: './dashboard.html',
    standalone: true,
})
export class Dashboard implements OnInit {
    selectedMes: Meses | undefined;
    date: Date | [Date, Date] | null = null;
    selectedOption: string = 'Mês';

    constructor(private PrimeNG: PrimeNG) {}

    ngOnInit() {
        this.PrimeNG.setTranslation({
            dayNames: ["domingo","segunda","terça","quarta","quinta","sexta","sábado"],
            dayNamesShort: ["dom","seg","ter","qua","qui","sex","sab"],
            dayNamesMin: ["D","S","T","Q","Q","S","S"],
            monthNames: [
                "janeiro","fevereiro","março","abril","maio","junho",
                "julho","agosto","setembro","outubro","novembro","dezembro"
            ],
            monthNamesShort: [
                "jan","fev","mar","abr","mai","jun",
                "jul","ago","set","out","nov","dez"
            ],
            today: 'Hoje',
            clear: 'Limpar',
            weekHeader: 'Sm',
            dateFormat: 'dd/mm/yy',
            firstDayOfWeek: 0
            });
    };
}