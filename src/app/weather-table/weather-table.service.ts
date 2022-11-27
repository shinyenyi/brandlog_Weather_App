import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherInitialData } from './weather-table-request-response'

@Injectable({
  providedIn: 'root'
})
export class WeatherTableService {

  constructor(private http: HttpClient) { }

  getCurrentLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(response => {
        resolve(
          {
            longitude: response.coords.longitude,
            latitude: response.coords.latitude
          }
        );
      });
    });
  }

  getWeatherInitialData(weatherDataAPIUrl: string): Observable<WeatherInitialData> {
    return this.http.get<WeatherInitialData>(weatherDataAPIUrl);
  }
}
