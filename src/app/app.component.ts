import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartComponent} from '../chart/chart.component';
import { dynamicComponent } from '../dynamic/dynamic.component';


@Component({
  selector: 'app-root',
  imports: [CommonModule,ChartComponent,dynamicComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template:'<app-chart/>,<app-dynamic>'
})
export class AppComponent {
  title = 'Echart';
  description='This application visualizes data using the ECharts library.';
  
}
