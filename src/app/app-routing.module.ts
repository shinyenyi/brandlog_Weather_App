import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherTableComponent } from './weather-table/weather-table.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'weatherTable', pathMatch: 'full'
  },
  {
    path: 'weatherTable',
    component: WeatherTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
