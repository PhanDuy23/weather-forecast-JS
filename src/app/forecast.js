"use client"
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sun, Cloud, CloudRain, Wind } from 'lucide-react';

function WeatherForecast() {
  const [forecast, setForecast] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const API_KEY = "3aa069c12609852ef55a78bd94930820";
  const city = "Hanoi"; // Có thể thay đổi thành prop hoặc state nếu cần

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=vi`
        );
        const data = await response.json();
        
        // Nhóm dự báo theo ngày
        const dailyData = {};
        var i = 0
        data.list.forEach(item => {
          const date = new Date(item.dt * 1000).toLocaleDateString();
          i++
          if (!dailyData[date]) {
            console.log(i);
            
            dailyData[date] = {
              temps: [],
              weather: item.weather[0],
              details: []
            };
          }
          dailyData[date].temps.push(item.main.temp);
          dailyData[date].details.push(item);
        });

        // Chuyển đổi thành mảng và tính min/max
        const processedData = Object.entries(dailyData).map(([date, data]) => ({
          date,
          minTemp: Math.min(...data.temps),
          maxTemp: Math.max(...data.temps),
          weather: data.weather,
          details: data.details
        }));

        setForecast(processedData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thời tiết:", error);
      }
    };

    fetchWeather();
  }, [city]);

  const getWeatherIcon = (weatherCode) => {
    if (weatherCode?.includes('clear')) return <Sun className="w-20 h-20 text-[#f17f51]" />;
    if (weatherCode?.includes('cloud')) return <Cloud className="w-20 h-20 text-gray-400" />;
    if (weatherCode?.includes('rain')) return <CloudRain className="w-20 h-20 text-gray-400" />;
    return <Sun className="w-20 h-20 text-[#f17f51]" />;
  };

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    const days = ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7'];
    // return days[date.getDay()];
    return dateStr
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setShowDialog(true);
  };

  if (!forecast) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className=" bg-[#78b5c2] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[150px_150px_150px] gap-4">
          {forecast.slice(0, 5).map((day, index) => (
            <Card
              key={index}
              className=" bg-white/20 p-4 flex flex-col items-center cursor-pointer hover:bg-white/30 transition-colors"
              onClick={() => handleDayClick(day)}
            >
              <h2 className="text-xl font-bold mb-4">{getDayName(day.date)}</h2>
              <div>{getWeatherIcon(day.weather.main.toLowerCase())}</div>
              <p className="mt-4 text-lg">
                {Math.round(day.minTemp)}°C - {Math.round(day.maxTemp)}°C
              </p>
            </Card>
          ))}
        </div>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                Chi tiết thời tiết - {selectedDay && getDayName(selectedDay.date)}
              </DialogTitle>
            </DialogHeader>
            {selectedDay && (
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getWeatherIcon(selectedDay.weather.main.toLowerCase())}
                    <div>
                      <p className="text-2xl font-bold">
                        {Math.round(selectedDay.minTemp)}°C - {Math.round(selectedDay.maxTemp)}°C
                      </p>
                      <p className="text-gray-600">{selectedDay.weather.description}</p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-2">
                  {selectedDay.details.map((detail, index) => {
                    const time = new Date(detail.dt * 1000).toLocaleTimeString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit'
                    });
                    return (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded">
                        <span>{time}</span>
                        <div className="flex items-center gap-4">
                          <span>{Math.round(detail.main.temp)}°C</span>
                          <Wind className="w-4 h-4" />
                          <span>{Math.round(detail.wind.speed * 3.6)} km/h</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default WeatherForecast;