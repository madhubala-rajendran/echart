import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
// import echarts core
import * as echarts from 'echarts/core';
// import necessary echarts components
import { BarChart,LineChart,PieChart ,ScatterChart} from 'echarts/charts';
import { GridComponent,TitleComponent, TooltipComponent ,LegendComponent} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { CommonModule } from '@angular/common';
import { color } from 'echarts';
echarts.use([BarChart, GridComponent, CanvasRenderer,LineChart,PieChart,ScatterChart, TitleComponent, TooltipComponent,LegendComponent]);

export interface resposeModel
{
  date : string;
  price : number;
}

@Component({
  selector: 'app-dynamic',
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css'],
  providers: [
    provideEchartsCore({ echarts }),
  ]
})
export class dynamicComponent implements OnInit {
  chartOptions: any;
  chartDataPoints : resposeModel[]=[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<resposeModel[]>('https://localhost:7052/api/GoldRate/april')
      .subscribe(res => {
        if(res.length!=0)
        {
          this.chartDataPoints = res;
          console.log("check datapoints", this.chartDataPoints)
          this.populateChart();
        }
      });
  }


populateChart()
{
  this.chartOptions = {
    title: {
      text: 'Daily Gold Rate - April 2025',
      left: 'center',
     
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Gold Rate Change'], // Name must match the `name` field in your series
      top: '10%', // Optional: position the legend
      textStyle: {
        color: '#ffffff' // Change to match your theme (white in dark mode, etc.)
      }
    },
    xAxis: {
      type: 'category',
      name: 'Date',
      nameLocation: 'middle',
      nameGap: 30,
      nameTextStyle: { fontSize: 14, fontWeight: 'bold' },
      data: this.chartDataPoints.map(item => item.date)
    },
    yAxis: {
      type: 'value',
      name: 'Gold Price (INR/gram)',
      nameLocation: 'middle',
      nameGap: 60,
      nameTextStyle: { fontSize: 14, fontWeight: 'bold' }
    },
    grid: {
      left: 80,
      right: 30,
      bottom: 60,
      top: 60
    },
    series: [
      {
      name: 'Gold Rate',
      data: this.chartDataPoints.map(item => item.price),
      type: 'bar',
      smooth: false,
      itemStyle: {
        color: '#FFD700'
      },
      lineStyle: {
        width: 3
      }
    },
    {
      name: 'Gold Rate Change',
      data: this.chartDataPoints.map((item, index, arr) => {
        if (index === 0) return 0; // No previous value for the first entry
        return item.price - arr[index - 1].price;
      }),
      type: 'line',
      smooth: false,
      itemStyle: {
        color: 'green'
      },
      lineStyle: {
        width: 3
      }
    }
  ]
  };

}
}