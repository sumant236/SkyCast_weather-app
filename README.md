# SkyCast

SkyCast is a modern, responsive weather dashboard that provides real-time meteorological data with a focus on user experience and precision. Built with **React** and powered by the **Open-Meteo** and **Google Geocoding APIs**, SkyCast offers detailed insights from current conditions to 7-day forecasts.

## Introduction
SkyCast goes beyond basic weather reporting. It features a dynamic "Hourly Forecast" with smart auto-scrolling to the current hour, a global unit conversion system for temperature, wind, and precipitation, and a robust search engine to find weather data for any city worldwide. Whether you're checking for rain or planning your week, SkyCast delivers data with clarity and speed.

## Deployed App
[https://skycast-weatherapplication.netlify.app](https://skycast-weatherapplication.netlify.app)

## Features

### 1. Geo-Location Sensing
Automatically detects your current location on startup using the Browser Geolocation API to provide local weather instantly.

### 2. Global Search functionality
Search for any city or region globally. Uses Open-Meteo Geocoding to provide accurate location suggestions including City, State, and Country.

### 3. Smart Hourly Forecast
Provides a detailed 24-hour breakdown for the next 7 days.
* **Auto-Scroll Logic:** Automatically scrolls to and highlights the current hour's card, so you don't have to hunt for the present time.

### 4. Custom Unit Management
Seamlessly toggle between **Celsius/Fahrenheit**, **km/h / mph**, and **mm/inches**. Global state management ensures all components update instantly when units are changed.

### 5. Detailed Weather Metrics
Displays "Feels Like" temperature, humidity levels, wind speeds, and precipitation chances alongside high/low daily temperatures.

### 6. Responsive Design
Fully optimized for Desktop, Tablet, and Mobile views with custom CSS Grid and Flexbox layouts.

### 7. Graceful Error Handling
* Built-in error boundaries for **Location Denials** and **API Failures**.
* Custom **Error Page** with a "Retry" mechanism that allows users to re-sync their data without refreshing the page.


## Technology Stack
React.js · Context API · Axios · Open-Meteo API · Google Geocoding API · CSS Modules · 

---

## Installation & Getting Started
Detailed instructions on how to install, configure, and get the project running.

```bash
# Clone the repository
git clone https://github.com/sumant236/SkyCast_weather-app.git

# Navigate into the project directory
cd SkyCast

# Install dependencies
npm install 

# Start the development server
npm start
```

## Usage

1. **Homepage & Local Weather:**
   Upon arrival, allow location access to see your local sky conditions instantly.
   ![Landing Page](https://github.com/user-attachments/assets/7c788dbd-7fe8-4805-b216-92cc3b897a39)


2. **Searching for a Location:**
   Use the search bar at the top to type a city name. Select the correct location from the dropdown results.
   ![Search Page](https://github.com/user-attachments/assets/486ed487-ff23-46ee-be10-2b2ea2fac194)


3. **Hourly Breakdown:**
   Check the hourly forecast on the right. Notice how it automatically centers on the current time for "Today."
   ![Hourly Forecast](https://github.com/user-attachments/assets/1ad84499-eb95-4ae7-8ee3-f36b275ec1d4)

4. **Changing Units:**
   Click the "Units" button in the Navbar to switch between Metric and Imperial systems globally.
   ![Changing Units](https://github.com/user-attachments/assets/697a82bb-6657-4aa3-baaf-5a37a3c712bd)


5. **Daily Planning:**
   View the 7-day forecast at the bottom to see temperature trends and weather icons for the week ahead.
   ![Daily Forecast](https://github.com/user-attachments/assets/3f1598a7-858c-4ddf-a53b-79a8e2e3c84f)
