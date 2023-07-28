import React from 'react';
import { Icon } from '@mui/material';

const WeatherIcon = ({ iconCode }) => {
  const iconMap = {
    '01d': 'wb_sunny',
    '01n': 'nights_stay',
    '02d': 'day_sunny_overcast',
    '02n': 'nights_stay',
    '03d': 'cloud',
    '03n': 'cloud',
    '04d': 'cloudy',
    '04n': 'cloudy',
    '09d': 'showers',
    '09n': 'showers',
    '10d': 'day_rain',
    '10n': 'night_rain',
    '11d': 'thunderstorm',
    '11n': 'thunderstorm',
    '13d': 'snow',
    '13n': 'snow',
    '50d': 'fog',
    '50n': 'fog',
  };

  const iconName = iconMap[iconCode] || 'wb_sunny';

  return <Icon>{iconName}</Icon>;
};

export default WeatherIcon;
