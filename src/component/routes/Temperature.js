import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import WeatherIcon from './WeatherIcon'; // Custom component to display weather icons

const API_KEY = '6eb9b4e26cfb2dfd8e6e9f9b4f7edfe4'; // Replace with your actual API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const Temperature = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} p={3} component={Paper}>
        <Typography variant="h4" gutterBottom>
          Weather Forecast App
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter city name"
            variant="outlined"
            fullWidth
            value={city}
            onChange={handleCityChange}
            InputProps={{
              endAdornment: (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                >
                  Get Weather
                </Button>
              ),
            }}
          />
        </form>
        {weatherData && (
          <Box mt={3}>
            <Typography variant="h5">
              {weatherData.name}, {weatherData.sys.country}
            </Typography>
            <Box display="flex" alignItems="center">
              <WeatherIcon iconCode={weatherData.weather[0].icon} />
              <Typography variant="h4">
                {Math.round(weatherData.main.temp)}°C
              </Typography>
            </Box>
            <Typography variant="body1" gutterBottom>
              {weatherData.weather[0].description}
            </Typography>
            <Typography variant="body1">
              Feels like: {Math.round(weatherData.main.feels_like)}°C
            </Typography>
            <Typography variant="body1">
              Min Temperature: {Math.round(weatherData.main.temp_min)}°C
            </Typography>
            <Typography variant="body1">
              Max Temperature: {Math.round(weatherData.main.temp_max)}°C
            </Typography>
            <Typography variant="body1">
              Humidity: {weatherData.main.humidity}%
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Temperature;
