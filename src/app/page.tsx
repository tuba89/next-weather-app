"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Droplets, Search, Thermometer, Wind, Heart } from "lucide-react";
import React, { useState } from "react";
import { getWeatherData } from "./actions";
import { WeatherData } from "@/types/weather";
import { WeatherIcon } from "@/components/WeatherIcon";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useFormStatus } from "react-dom";

// Backgrounds for each weather
const weatherBackgrounds: Record<string, string> = {
  Clear: "/clear.jpg",
  Clouds: "/cloudy.jpg",
  Rain: "/rain.jpg",
  Thunderstorm: "/lightning.jpg",
  Snow: "/snowfall.jpg",
  Mist: "/mist.jpg",
  Fog: "/fog.jpg",
  Haze: "/haze.jpg",
};

function SearchButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="hover:border-2 w-11 h-11 bg-white/20
       hover:bg-white/30 backdrop-blur-sm
        border-white/50 transition-all 
        duration-300 hover:scale-105"
    >
      <Search
        className={`w-5 h-5 text-white ${pending ? "animate-spin" : ""}`}
      />
    </Button>
  );
}

const Home = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");
  const [bgImage, setBgImage] = useState<string>("/background1.jpg");

  const handleSearch = async (formData: FormData) => {
    setError("");
    const city = formData.get("city") as string;
    const { data, error: weatherError } = await getWeatherData(city);

    if (weatherError) {
      setError(weatherError);
      setWeather(null);
      setBgImage("/background2.jpg");
    }

    if (data) {
      setWeather(data);

      // Switch to weather-specific background if available
      const condition = data.weather[0].main;
      if (weatherBackgrounds[condition]) {
        setBgImage(weatherBackgrounds[condition]);
      } else {
        setBgImage("/background1.jpg"); // fallback
      }
    }
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden flex flex-col">
      {/* Background with smooth fade */}
      <motion.div
        key={bgImage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-between">
        <div className="w-full max-w-md mx-auto px-4 pt-12 space-y-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-5xl font-bold mb-2 drop-shadow-lg">
              Weather App
            </h1>
            <p className="text-white/80 text-lg">Discover weather worldwide</p>
          </div>

          {/* Search form */}
          <form action={handleSearch} className="flex gap-3">
            <Input
              type="text"
              name="city"
              placeholder="Enter the city name..."
              required
              className="bg-white/15 backdrop-blur-md border-white/20 
                         placeholder:text-white/60 
                         text-white font-medium text-lg h-12 
                         rounded-xl
                         focus:bg-white/20 focus:border-white/40 
                         transition-all duration-300
                         shadow-lg"
            />
            <SearchButton />
          </form>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-red-400 bg-black/40 drop-shadow-lg
                         font-bold rounded-md p-2"
            >
              {error}
            </motion.div>
          )}

          {/* Weather info */}
          {weather && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center space-y-4 mt-7"
            >
              {/* City */}
              <motion.h2
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="text-3xl font-bold drop-shadow-md"
              >
                {weather.name}
              </motion.h2>

              {/* Icon */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center"
              >
                <WeatherIcon condition={weather.weather[0].main} />
              </motion.div>

              {/* Temp */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-6xl font-extrabold drop-shadow-xl"
              >
                {Math.round(weather.main.temp)}°C
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white/90 font-medium text-xl capitalize bg-white/10 
                           rounded-full px-4 py-2 inline-block backdrop-blur-sm"
              >
                {weather.weather[0].description}
              </motion.div>
            </motion.div>
          )}

          {/* Metrics card */}
          {weather && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 mb-8"
            >
              <Card
                className="bg-white/10 backdrop-blur-sm 
                               border-white/20 shadow-2xl rounded-2xl overflow-hidden"
              >
                <CardContent className="p-6">
                  <div className="grid grid-cols-3 gap-6">
                    {/* Feels like */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-center"
                    >
                      <div className="bg-white/10 rounded-full p-3 inline-block mb-3 shadow-lg">
                        <Thermometer className="w-6 h-6 mx-auto text-red-500" />
                      </div>
                      <div className="text-white/70 text-sm font-medium mb-1">
                        Feels like
                      </div>
                      <div className="font-bold text-white text-lg">
                        {Math.round(weather.main.feels_like)}°C
                      </div>
                    </motion.div>

                    {/* Humidity */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="text-center"
                    >
                      <div className="bg-white/10 rounded-full p-3 inline-block mb-3 shadow-lg">
                        <Droplets className="w-6 h-6 mx-auto text-sky-400" />
                      </div>
                      <div className="text-white/70 text-sm font-medium mb-1">
                        Humidity
                      </div>
                      <div className="font-bold text-white text-lg">
                        {Math.round(weather.main.humidity)}%
                      </div>
                    </motion.div>

                    {/* Wind */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="text-center"
                    >
                      <div className="bg-white/10 rounded-full p-3 inline-block mb-3 shadow-lg">
                        <Wind className="w-6 h-6 mx-auto text-teal-400" />
                      </div>
                      <div className="text-white/70 text-sm font-medium mb-1">
                        Wind
                      </div>
                      <div className="font-bold text-white text-lg">
                        {Math.round(weather.wind.speed)} m/s
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Footer Signature */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="relative z-10 pb-6 pt-4"
        >
          <div className="flex items-center justify-center space-x-2">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
              <div className="flex items-center space-x-2 text-white/70">
                <span className="text-sm font-medium">Built with</span>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  <Heart className="w-4 h-4 text-red-400 fill-current hover:text-red-500" />
                </motion.div>
                <span className="text-sm font-medium">by</span>
                <motion.span
                  whileHover={{
                    scale: 1.05,
                    color: "#60a5fa",
                  }}
                  className="font-bold text-white cursor-pointer transition-colors duration-200"
                >
                  Assia
                </motion.span>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default Home;
