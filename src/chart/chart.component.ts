import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
// import echarts core
import * as echarts from 'echarts/core';
// import necessary echarts components
import { BarChart,LineChart,PieChart ,ScatterChart,RadarChart,
  FunnelChart} from 'echarts/charts';
import { GridComponent, TitleComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { CommonModule, } from '@angular/common';
import { Component} from '@angular/core';
echarts.use([BarChart, GridComponent, CanvasRenderer,LineChart,PieChart,ScatterChart, TitleComponent,RadarChart,FunnelChart]);
import { EChartsCoreOption } from 'echarts/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective,FormsModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  providers: [
    provideEchartsCore({ echarts }),
  ]
})export class ChartComponent {
  selectedChartType: 'line' | 'bar' | 'scatter' | 'pie' = 'line';

  // Data formatted for pie chart
  pieData = [
    { name: 'Jan', value: 58500 },
    { name: 'Feb', value: 59000 },
    { name: 'Mar', value: 59500 },
    { name: 'Apr', value: 60000 },
    { name: 'May', value: 61000 },
    { name: 'Jun', value: 61500 },
    { name: 'Jul', value: 62000 },
    { name: 'Aug', value: 61800 },
    { name: 'Sep', value: 62500 },
    { name: 'Oct', value: 63000 },
    { name: 'Nov', value: 63500 },
    { name: 'Dec', value: 64000 }
  ];

  // Data for other chart types
  months = this.pieData.map(item => item.name);
  values = this.pieData.map(item => item.value);

  chartOption: EChartsCoreOption = this.getChartOption(this.selectedChartType);

  updateChartType() {
    this.chartOption = this.getChartOption(this.selectedChartType);
  }

  getChartOption(type: 'line' | 'bar' | 'scatter' | 'pie'): EChartsCoreOption {
    if (type === 'pie') {
      return {
        title: {
          text: 'Month-wise Gold Rate Analysis (2024)',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Gold Price',
            type: 'pie',
            radius: '50%',
            data: this.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
    } else {
      return {
        title: {
          text: 'Month-wise Gold Rate Analysis (2024)',
          left: 'center'
        },
        xAxis: {
          name: 'Month',
          nameLocation: 'middle',
          nameGap: 35,
          type: 'category',
          data: this.months
        },
        yAxis: {
          type: 'value',
          name: 'Price (INR/gram)',
          nameGap: 35
        },
        series: [
          {
            data: this.values,
            type: type,
            smooth: type === 'line',
            lineStyle: { width: 3 },
            itemStyle: { color: '#FFD700' }
          }
        ]
      };
    }
  }
}