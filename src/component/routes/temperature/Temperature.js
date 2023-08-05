import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  CircularProgress,
} from '@mui/material';
import WeatherIcon from './WeatherIcon'; // Custom component to display weather icons
import { styled } from '@mui/material/styles';

const API_KEY = '6eb9b4e26cfb2dfd8e6e9f9b4f7edfe4'; // Replace with your actual API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const CenteredContainer = styled(Container)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '1600px',
  padding: '20px',
  backgroundColor: '#8cedab',
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 500,
  width: '100%',
  borderRadius: theme.spacing(2),
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
}));

const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '& > *': {
    marginRight: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
    '& > *': {
      marginBottom: theme.spacing(2),
    },
  },
}));

const WeatherContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '& > *': {
    margin: theme.spacing(1),
  },
}));

const Temperature = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      });
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
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
    <CenteredContainer>
      <StyledPaper>
        <Typography variant="h4" gutterBottom>
          Weather Forecast
        </Typography>
        <FormContainer component="form" onSubmit={handleSubmit}>
          <TextField
            label="Enter city name"
            variant="outlined"
            fullWidth
            value={city}
            onChange={handleCityChange}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={!city || loading}
          >
            Get Weather
          </Button>
        </FormContainer>
        {loading && <CircularProgress />}
        {weatherData && (
          <WeatherContainer>
            <Typography variant="h5">
              {weatherData.name}, {weatherData.sys.country}
            </Typography>
            <WeatherIcon iconCode={weatherData.weather[0].icon} />
            <Typography variant="h4">
              {Math.round(weatherData.main.temp)}°C
            </Typography>
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
          </WeatherContainer>
        )}
      </StyledPaper>
    </CenteredContainer>
  );
};

export default Temperature;
