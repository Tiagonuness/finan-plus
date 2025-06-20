import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { debounceTime, Subscription } from 'rxjs';
import { LayoutService } from '../../../layout/service/layout.service';

@Component({
    standalone: true,
    selector: 'app-grafico-tipo-gasto',
    imports: [ChartModule],
    template: `<div class="card !mb-8">
        <div class="font-semibold text-xl mb-4">Formas de agamento</div>
        <p-chart type="bar" [data]="chartData" [options]="chartOptions" class="h-80" />
    </div>`
})
export class GraficoTipoGasto {
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
        const textColor = documentStyle.getPropertyValue('--text-color');
        const borderColor = documentStyle.getPropertyValue('--surface-border');
        const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');

        this.chartData = {
            labels: ['Mercado', 'Lazer', 'Restaurante', 'Shopping', 'Outros'],
            datasets: [
                {
                    type: 'bar',
                    label: 'Pix',
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
                    data: [150, 100, 120, 50, 234],
                    barThickness: 32
                },
                {
                    type: 'bar',
                    label: 'Cartão',
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-300'),
                    data: [200, 60, 25, 400, 457],
                    barThickness: 32
                },
                {
                    type: 'bar',
                    label: 'Boleto',
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
                    data: [0, 0, 0, 10, 12],
                    barThickness: 32
                },
                {
                    type: 'bar',
                    label: 'Outros',
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-700'),
                    data: [54, 356, 12, 89, 234],
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
                    labels: {
                        color: textColor
                    }
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
