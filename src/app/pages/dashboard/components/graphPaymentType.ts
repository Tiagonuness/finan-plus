import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_AnimatedDark from "@amcharts/amcharts5/themes/Dark";
import { LayoutService } from '../../../layout/service/layout.service';
import * as am5percent from "@amcharts/amcharts5/percent";

@Component({
  selector: 'app-graph-month-payment-types',
  standalone: true,
  templateUrl: './html/paymentType.html',
})
export class GraphMonthPaymentTypes implements OnInit, OnDestroy {
  private root: am5.Root | undefined;
  // Serviço de layout para detectar mudanças de tema

  constructor(private zone: NgZone, private layoutService: LayoutService) {}

  ngOnInit(): void {
    // Reage ao tema
    const dark = this.layoutService.layoutConfig().darkTheme ?? false;

    if (this.root) {
      this.root.dispose();
    }

    this.zone.runOutsideAngular(() => this.createChart(dark));
  }

    createChart(dark: boolean): void {
        this.zone.runOutsideAngular(() => {
            const root = am5.Root.new("chartdivGraphPaymentType");
            this.root = root;

            if (document.body.classList.contains('app-dark')) {
                root.setThemes([am5themes_AnimatedDark.new(root)]);
            } else {
                root.setThemes([am5themes_Animated.new(root)]);
            }

            let chart = root.container.children.push(am5percent.PieChart.new(root, {
                layout: root.verticalLayout
            }));

            let series = chart.series.push(am5percent.PieSeries.new(root, {
                valueField: "value",
                categoryField: "category"   
            }));

            // Adaptador que pega a cor personalizada de cada data item
            series.slices.template.adapters.add("fill", (fill, target) => {
                const data = target.dataItem?.dataContext as { fill?: am5.Color };
                return data?.fill || fill;
            });

            series.slices.template.setAll({
                strokeOpacity: 0
            });

            // Dados com cores personalizadas
            series.data.setAll([
            { value: 10, category: "Dinheiro", fill: am5.color("#BD2500") },
            { value: 9, category: "Cartão", fill: am5.color("#0080BD") },
            { value: 6, category: "Boleto", fill: am5.color("#00BD7E") },
            { value: 5, category: "Outros", fill: am5.color("#683023") }
            ]);

            let legend = chart.children.push(am5.Legend.new(root, {
                centerX: am5.percent(50),
                x: am5.percent(50),
                marginTop: 15,
                marginBottom: 15
            }));

            legend.data.setAll(series.dataItems);

            // Define a cor das letras (labels e legend) para verde
            series.labels.template.setAll({
                fill: am5.color('#00bc7d'),
                fontSize: 12,
                fontWeight: "500",
            });
            legend.labels.template.setAll({
                fill: am5.color('#00bc7d'),
                fontSize: 12,
                fontWeight: "500",
            });
            legend.valueLabels.template.setAll({
                fill: am5.color('#00bc7d'),
                fontSize: 12,
                fontWeight: "500",
            });

            // Define a cor do traçado (tick) que liga o gráfico ao texto
            series.ticks.template.setAll({
                stroke: am5.color('#00bc7d'),
                strokeWidth: 2
            });

            root._logo?.dispose();
            series.appear(1000, 100);
        });
    };

  ngOnDestroy(): void {
    this.zone.runOutsideAngular(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }
}