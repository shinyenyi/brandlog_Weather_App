export class WeatherInitialData {
  constructor(
    public latitude: number,
    public longitude: number,
    public generationtime_ms: number,
    public utc_offset_seconds: number,
    public timezone: string,
    public timezone_abbreviation: string,
    public elevation: number,
    public hourly_units: HourlyUnits,
    public hourly: Hourly,
  ) { }
}

export class Hourly {
  constructor(
    public time: string[],
    public temperature_2m: number[],
    public relativehumidity_2m: number[],
    public windspeed_10m: number[],
  ) { }
}

export class HourlyUnits {
  constructor(
    public time: string,
    public temperature_2m: string,
    public relativehumidity_2m: string,
    public windspeed_10m: string,
  ) { }
}

export class WeatherData {
  constructor(
    public time: string,
    public temperature_2m: number,
    public relativehumidity_2m: number,
    public windspeed_10m: number,
  ) { }
}
