import { Component, NgZone, OnInit, OnDestroy, effect } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_AnimatedDark from "@amcharts/amcharts5/themes/Dark";
import { LayoutService } from '../../../layout/service/layout.service';

@Component({
  selector: 'app-grafico-gasto-mensal',
  standalone: true,
  template: ` <div class="flex flex-col gap-4 p-4 bg-white border rounded-xl border-transparent drop-shadow-lg backgroundColorGraph">
  <div id="chartdiv" style="width: 100%; height: 500px;"></div>
  </div>`,
})
export class GraficoGastoMensalComponent implements OnInit, OnDestroy {
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
      const root = am5.Root.new("chartdiv");
      this.root = root;

      if (document.body.classList.contains('app-dark')) {
        root.setThemes([am5themes_AnimatedDark.new(root)]);
      } else {
        root.setThemes([am5themes_Animated.new(root)]);
      }
      root.dateFormatter.setAll({
        dateFormat: "dd/MM"
      });

      // Gera dados de exemplo
      const now = new Date();
      const year = now.getFullYear();
      const currentMonth = now.getMonth();
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const yearLastMonth = currentMonth === 0 ? year - 1 : year;

      const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();

      const generateData = (y: number, m: number) => {
        const days = getDaysInMonth(y, m);
        return Array.from({ length: days }, (_, i) => {
          const date = new Date(y, m, i + 1);
          return {
            date: date.getTime(),
            value: Math.floor(Math.random() * 100)
          };
        });
      };

      const currentMonthData = generateData(year, currentMonth);
      const lastMonthValues = generateData(yearLastMonth, lastMonth).map((d) => d.value);
      const lastMonthData = currentMonthData.map((d, i) => ({
        date: d.date,
        value: lastMonthValues[i] ?? 0
      }));

      const startOfMonth = new Date(year, currentMonth, 1).getTime();
      const endOfMonth = new Date(year, currentMonth + 1, 0, 23, 59, 59, 999).getTime();

      // Cria o gráfico
      const chart = root.container.children.push(am5xy.XYChart.new(root, {
        focusable: true,
        pinchZoomX: true,
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: 0
      }));

      chart.set("background", am5.Rectangle.new(root, {
        fill: am5.color('#00bc7d'), // ou 0x000000 para preto
        fillOpacity: 0
      }));

      // Eixos
      const xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
        maxDeviation: 0,
        groupData: false,
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          minGridDistance: 30
        }),
        tooltip: am5.Tooltip.new(root, {}),
        startLocation: 0,
        endLocation: 1,
      }));
      xAxis.set("dateFormats", {
        day: "d"
      });
      xAxis.set("min", startOfMonth);
      xAxis.set("max", endOfMonth);
      xAxis.get("renderer").labels.template.setAll({
        fill: am5.color('#00bc7d'),
        fontSize: 12,
        fontWeight: "500",
      });

      const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 1,
        renderer: am5xy.AxisRendererY.new(root, {})
      }));
      yAxis.get("renderer").labels.template.setAll({
        fill: am5.color('#00bc7d'),
        fontSize: 12,
        fontWeight: "500",
      });

      // 🟦 Série mês atual
      const seriesAtual = chart.series.push(am5xy.LineSeries.new(root, {
        name: "Este mês",
        xAxis,
        yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "" // inicializa vazio, será sobrescrito pelo adapter
        }),
        stroke: am5.color('#00bc7d')
      }));
      seriesAtual.get("tooltip")?.label.adapters.add("text", function(text, target) {
        const dataItem = target.dataItem;
        if (!dataItem) return text;

        // Use dataContext to access your custom data fields
        const valueY = (dataItem.dataContext as any)?.value;
        const valueX = (dataItem.dataContext as any)?.date;

        const formattedValueY = valueY?.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }) ?? "";

        const dateFormatter = am5.DateFormatter.new(root, {
          dateFormat: "dd/MM/yyyy"
        });
        
        const formattedDate = valueX ? dateFormatter.format(new Date(valueX), "dd/MM/yyyy") : "";

        return `${formattedValueY}\n${formattedDate}`;
      });
      seriesAtual.fills.template.setAll({
        fillOpacity: 0.5,
        visible: true,
        fill: am5.color('#00bc7d'),
      }); 
      seriesAtual.data.setAll(currentMonthData);
      // 🟥 Série mês anterior
      const seriesAnterior = chart.series.push(am5xy.LineSeries.new(root, {
        name: "Mês anterior",
        xAxis,
        yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: ""
        }),
        stroke: am5.color('#00bc7d')
      }));
      seriesAnterior.get("tooltip")?.label.adapters.add("text", function(text, target) {
        const dataItem = target.dataItem;
        if (!dataItem) return text;

        // Use dataContext to access your custom data fields
        const valueY = (dataItem.dataContext as any)?.value;
        const valueX = (dataItem.dataContext as any)?.date;

        const formattedValueY = valueY?.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }) ?? "";

        const dateFormatter = am5.DateFormatter.new(root, {
          dateFormat: "dd/MM/yyyy"
        });
        
        const formattedDate = valueX ? dateFormatter.format(new Date(valueX), "dd/MM/yyyy") : "";

        return `${formattedValueY}\n${formattedDate}`;
      });
      seriesAtual.data.setAll(currentMonthData);
      seriesAtual.fills.template.setAll({
        fillOpacity: 0.5,
        visible: true,
        fill: am5.color('#00bc7d'),
      }); 
      seriesAnterior.data.setAll(lastMonthData);
      seriesAnterior.fills.template.setAll({
        fillOpacity: 0.1,
        visible: true,
        fill: am5.color('#00bc7d'),
      });

      // ✅ Configura o estilo tracejado corretamente
      seriesAnterior.strokes.template.setAll({
        strokeDasharray: [4, 4]
      });

      // Bullets
      // 🎯 Legenda
      const legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
      }));
      const corLegenda = am5.color(0x6b7280); // cinza-600
      legend.data.setAll(chart.series.values);
      legend.labels.template.setAll({
        fontSize: 14,
        fontWeight: "500",
        fill: corLegenda
      });

      // Cursor
      const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        behavior: "none"
      }));
      cursor.lineY.set("visible", false);

      root._logo?.dispose();

      chart.appear(1000, 100);
    });
  }

  ngOnDestroy(): void {
    this.zone.runOutsideAngular(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }
}