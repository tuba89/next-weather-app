export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };

  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;

  wind: {
    // deg: number;
    speed: number;
  };
}
