import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartComponent } from 'highcharts-angular';
import { LayoutService } from '../../../layout/service/layout.service';

@Component({
  selector: 'app-grafico-gasto-mensal',
  template: `
  <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm h-96 flex flex-col col-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
    <div class="text-base font-semibold text-gray-800 dark:text-white mb-4">
      Total gasto mês
    </div>
    <div class="flex-grow">
      <highcharts-chart
        [Highcharts]="Highcharts"
        [options]="chartOptions"
        class="w-full h-full block"
      ></highcharts-chart>
    </div>
  </div>
  `,
  standalone: true,
  imports: [HighchartsChartComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GraficoGastoMensalComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;  // vai ser inicializado no ngOnInit
  isDark = false;

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    // Pega se <html> tem classe 'dark'
    this.isDark = document.documentElement.classList.contains('dark');

    const textColor = this.isDark ? '#d1d5db' : '#444';
    const gridColor = this.isDark ? '#374151' : '#e5e7eb';

    this.chartOptions = {
      chart: {
        type: 'areaspline',
        backgroundColor: gridColor,
    },
    title: {
        text: ''
    },
    yAxis: {
        title: {
            text: 'Valor Gasto (R$)'
        }
    },
    tooltip: {
        shared: true,
        headerFormat: '<b>Valor gasto em relação {point.x}</b><br>'
    },
    credits: {
        enabled: false
    },
    xAxis: {
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29'],
      crosshair: true,
      labels: {
        style: { color: textColor }
      }
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5
      }
    },
    series: [{
        name: 'Mês anterior',
        data:
            [
                5000,
                6000,
                7000,
                4000,
                4500,
                5000,
                6000,
                7000,
                4000,
                4500,
                5000,
                6000,
                7000,
                4000,
                4500,
                5000,
                6000,
                7000,
                4000,
                4500,
                5000,
                6000,
                7000,
                4000,
                4500,
                5000,
                6000,
                7000,
                4000,
                4500,
                4500
            ]
    }, {
        name: 'Mês atual',
        data:
            [
                1200,
                600,
                3000,
                1500,
                2000,
                1200,
                600,
                3000,
                1500,
                2000,
                1200,
                600,
                3000,
                1500,
                2000,
                1200,
                600,
                3000,
                1500,
                2000,
                1200,
                600,
                3000,
                1500,
                2000,
                1200,
                600,
                3000,
                1500,
                2000,
                1200
            ]
          }] as Highcharts.SeriesOptionsType[]
        };
  }
}
