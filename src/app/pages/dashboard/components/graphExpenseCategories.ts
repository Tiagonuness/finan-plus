import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { LayoutService } from '../../../layout/service/layout.service';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'app-graph-expense-categories',
    standalone: true,
    imports: [ChartModule],
    templateUrl: './html/expenseCategories.html'
})
export class GraphExpenseCategories {
  chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    constructor(public layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$.pipe(debounceTime(25)).subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.initChart();
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const borderColor = documentStyle.getPropertyValue('--surface-border');
        const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');

        this.chartData = {
            labels: ['Mercado', 'Shopping', 'Restaurante', 'Livraria', 'Posto de Gasolina', 'Outros'],
            datasets: [
                {
                    type: 'bar',
                    label: 'Dinheiro',
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-800'),
                    data: [4000, 10000, 15000, 4000, 4000, 6000],
                    barThickness: 32
                },
                {
                    type: 'bar',
                    label: 'Cartão',
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
                    data: [2100, 8400, 2400, 7500, 5200, 3200],
                    barThickness: 32
                },
                {
                    type: 'bar',
                    label: 'Outros',
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
                    data: [4100, 5200, 3400, 7400, 6200, 3200],
                    borderRadius: {
                        topLeft: 8,
                        topRight: 8,
                        bottomLeft: 0,
                        bottomRight: 0
                    },
                    borderSkipped: false,
                    barThickness: 32
                }
            ]
        };

        this.chartOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    display: false,
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textMutedColor
                    },
                    grid: {
                        color: 'transparent',
                        borderColor: 'transparent'
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textMutedColor
                    },
                    grid: {
                        color: borderColor,
                        borderColor: 'transparent',
                        drawTicks: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}