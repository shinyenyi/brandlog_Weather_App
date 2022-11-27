import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WeatherTableService } from './weather-table.service';
import { Subscription } from 'rxjs';
import { WeatherInitialData } from './weather-table-request-response';
import { WeatherData } from './weather-table-request-response';

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.scss']
})
export class WeatherTableComponent implements OnInit, AfterViewInit, OnDestroy {
  longitude: number = 0;
  latitude: number = 0;
  weatherDataAPIUrl: string = '';
  subscription: Subscription = new Subscription();
  weatherInitialData!: WeatherInitialData;
  weatherDataArray: WeatherData[] = [];
  errorMessage: any;

  displayedColumns: string[] = ['time', 'temperature', 'humidity', 'windspeed'];
  dataSource = new MatTableDataSource<WeatherData>(this.weatherDataArray);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private weatherTableService: WeatherTableService) { }

  ngOnInit(): void {
    this.getLocation();
  }

  async getLocation() {
    await this.weatherTableService.getCurrentLocation().then(response => {
      this.latitude = response.latitude;
      this.longitude = response.longitude;
    })
    this.getWeatherData();
  }

  getWeatherData() {
    this.weatherDataAPIUrl = 'https://api.open-meteo.com/v1/forecast?latitude='
      + this.latitude + '&longitude=' + this.longitude +
      '&hourly=temperature_2m,relativehumidity_2m,windspeed_10m';
    this.subscription = this.weatherTableService.getWeatherInitialData(this.weatherDataAPIUrl).subscribe(
      (data) => { this.weatherInitialData = data },
      (error) => { this.errorMessage = error.statusText; },
      () => { this.craeteWaetherDataArray(); }
    );
  }

  refreshData() {
    this.getLocation();
  }

  craeteWaetherDataArray() {
    const relativehumidity_2m = this.weatherInitialData?.hourly.relativehumidity_2m === undefined
      ? [] : this.weatherInitialData?.hourly.relativehumidity_2m;
    const time = this.weatherInitialData?.hourly.time === undefined
      ? [] : this.weatherInitialData?.hourly.time;
    const temperature_2m = this.weatherInitialData?.hourly.temperature_2m === undefined
      ? [] : this.weatherInitialData?.hourly.temperature_2m;
    const windspeed_10m = this.weatherInitialData?.hourly.windspeed_10m === undefined
      ? [] : this.weatherInitialData?.hourly.windspeed_10m;

    for (let i = 0; i < relativehumidity_2m.length; i++) {
      const theTime = time[i];
      const theTemperature = temperature_2m[i];
      const theHumidity = relativehumidity_2m[i];
      const theWindSpeed = windspeed_10m[i];

      this.weatherDataArray.push(Object.create({ theTime, theTemperature, theHumidity, theWindSpeed }));
    }
    this.dataSource = new MatTableDataSource<WeatherData>(this.weatherDataArray);
    this.ngAfterViewInit();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
