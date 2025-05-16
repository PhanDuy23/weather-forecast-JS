"use client"

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Search, Sun } from 'lucide-react';
import WeatherForecast from "./forecast";
function WeatherApp() {
  const [city, setCity] = useState("hanoi");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const API_KEY = "3aa069c12609852ef55a78bd94930820";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=vi&appid=${API_KEY}&units=metric`
        );
        const weatherData = await weatherResponse.json();
        setWeather(weatherData);

        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );
        const forecastData = await forecastResponse.json();
        setForecast(forecastData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thời tiết:", error);
        setWeather("404")
      }
    };

    fetchWeather();
  }, [city]);

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("vi-VN", {
      weekday: "short",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };

  const getForecastData = () => {
    if (!forecast) return [];
    return forecast.list.slice(0, 8).map((item) => ({
      time: formatTime(item.dt),
      temp: Math.round(item.main.temp),
    }));
  };

  if (!weather || !forecast) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="max-h-screen min-h-screen bg-[#78b5c2] p-4">
      <div className="relative mb-8">
        <Input
          className="w-[50%] rounded-full pl-12 pr-4 text-lg"
          placeholder="Thành phố"
          // value={" "}
          defaultValue={city || ""}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setCity(e.target.value) // Hàm xử lý khi nhấn Enter
            }
          }}
        // onChange={(e) => log()}
        />
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
      </div>
      {(weather.main)?
      <div className="flex mx-auto max-w-7xl">
        <Card className="bg-transparent p-7 shadow-none w-[70%]">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center">           
              <div className="mr-4 rounded-full bg-[#f17f51] p-4">
                <Sun className="h-16 w-16 text-white" />
              </div>
              <div>
                <div className="text-6xl font-bold">{Math.round(weather.main.temp)}°C</div>
                <div className="text-xl">{Math.round(weather.main.feels_like)}°C</div>
              </div>
            </div>
            <div className="grid gap-2 text-lg">
              <div>Mưa: {weather.rain ? Math.round(weather.rain["1h"]) : 0}%</div>
              <div>Mây che: {weather.clouds.all}%</div>
              <div>Độ ẩm: {weather.main.humidity}%</div>
              <div>Gió: {Math.round(weather.wind.speed * 3.6)} km/h</div>
              <div>{weather.weather[0].description}</div>
            </div>
            <div className="mb-4 justify-between">
            <div className="text-lg font-bold">
              Thời tiết {weather.name}
              <div className="text-sm">
                {formatDate(Date.now() / 1000)}, {formatTime(Date.now() / 1000)}
              </div>
            </div>  
            <br/>
            <div className="text-right">
              <div>Mặt trời mọc: {formatTime(weather.sys.sunrise)}</div>
              <div>Mặt trời lặn: {formatTime(weather.sys.sunset)}</div>
            </div>
          </div>
          </div>

          <div className="mt-8 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getForecastData()}>
                <XAxis dataKey="time" />
                <YAxis domain={["dataMin - 5", "dataMax + 5"]} />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#ffd700"
                  strokeWidth={2}
                  dot={{ fill: "#ffd700" }}
                  label={{ fill: "white", fontSize: 12, position: "top" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <WeatherForecast />
      </div> : <div>không tìm thấy</div>}
      
    </div>
  );
}
export default WeatherApp;