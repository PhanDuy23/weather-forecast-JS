# DỰ ÁN REACT.JS  
## 1. Thông Tin Tổng Quan

**Tên Dự Án:** [WEATHER-FORECAST]

**Link Dự Án:** [GitHub Link](https://github.com/PhanDuy23/weather-forecast-JS)

**Người Thực Hiện:** Phan Văn Duy

## 2. Giới Thiệu Dự Án

**MÔ TẢ:**  
**[WEATHER-FORECAST]** là một ứng dụng web được xây dựng với **REACT.js**, cho phép người dùng tra cứu thông tin thời tiết hiện tại và dự báo thời tiết trong 4 ngày tới tại nhiều thành phố và quốc gia trên thế giới. Giao diện hiện đại, hỗ trợ tiếng Việt, và có khả năng hiển thị biểu tượng thời tiết trực quan.

## 3. Công Nghệ Sử Dụng

- **React:** Thư viện UI phổ biến giúp xây dựng giao diện tương tác.
- **Tailwind CSS:** Framework CSS tiện lợi để tạo giao diện nhanh chóng, linh hoạt.
- **OpenWeatherMap API:** Cung cấp dữ liệu thời tiết chính xác theo vị trí người dùng.
- **Fetch API:** Dùng để gọi dữ liệu thời tiết từ API.

## 4. Dữ Liệu API Sử Dụng

- **Thời tiết hiện tại:**  
  [https://api.openweathermap.org/data/2.5/weather?q=Hanoi&lang=vi&appid=...&units=metric](https://api.openweathermap.org/data/2.5/weather?q=Hanoi&lang=vi&appid=3aa069c12609852ef55a78bd94930820&units=metric)

- **Dự báo thời tiết:**  
  [https://api.openweathermap.org/data/2.5/forecast?q=Hanoi&lang=vi&appid=...&units=metric](https://api.openweathermap.org/data/2.5/forecast?q=Hanoi&lang=vi&appid=3aa069c12609852ef55a78bd94930820&units=metric)

- **Biểu tượng thời tiết:**  
  [http://openweathermap.org/img/wn/{icon_code}@2x.png](http://openweathermap.org/img/wn/{icon_code}@2x.png)

## 5. Ảnh Demo

![page1](https://github.com/PhanDuy23/weather-forecast-JS/blob/main/public/page1.png) 
![page2](https://github.com/PhanDuy23/weather-forecast-JS/blob/main/public/page2.png)


## 6. Cách Cài Đặt Và Chạy Dự Án

```bash
git clone https://github.com/PhanDuy23/weather-forecast-JS
cd weather-forecast-JS
npm install
# Tạo file .env.local và thêm API_KEY:
NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key

npm run dev
