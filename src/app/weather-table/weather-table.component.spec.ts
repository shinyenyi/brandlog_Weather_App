import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherTableComponent } from './weather-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeatherTableService } from './weather-table.service';
import { of } from 'rxjs';
import { WeatherInitialData } from './weather-table-request-response';

describe('WeatherTableComponent', () => {
  let component: WeatherTableComponent;
  let fixture: ComponentFixture<WeatherTableComponent>;
  let mockWeatherTableService: any;

  beforeEach(async () => {
    mockWeatherTableService = {
      getWeatherInitialData: jest.fn()
    };
    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        HttpClientTestingModule,
        BrowserModule,
        MatToolbarModule,
        BrowserAnimationsModule,
      ],
      declarations: [WeatherTableComponent],
      providers: [
        {
          provide: WeatherTableService, useValue: mockWeatherTableService
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherTableComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
