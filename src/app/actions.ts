"use server";

import { WeatherData } from "@/types/weather";
import { z } from "zod";

// Weather schema with zod
const weatherSchema = z.object({
  name: z.string(),

  main: z.object({
    temp: z.number(),
    humidity: z.number(),
    feels_like: z.number(),
  }),

  weather: z.array(
    z.object({
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    })
  ),

  wind: z.object({
    speed: z.number(),
  }),
});

// Get weather data
export async function getWeatherData(
  city: string
): Promise<{ data?: WeatherData; error?: string }> {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  try {
    if (!apiKey) {
      return { error: "API key is missing. Please set OPENWEATHER_API_KEY." };
    }

    if (!city.trim()) {
      return { error: "City name is required" };
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) throw new Error("City Not Found :(");

    const rawData = await response.json();

    const data = weatherSchema.parse(rawData);
    return { data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: "Invalid weather data received" };
    }
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to get weather data :(",
    };
  }
}
