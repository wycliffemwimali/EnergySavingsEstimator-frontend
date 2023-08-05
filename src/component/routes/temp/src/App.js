import './style.css';
import { MainProvider } from './context/MainContext';
import React from 'react';
import Container from './components/Main/Container';

function Temperature() {
  return (
    <MainProvider>
      <Container />
    </MainProvider>
  );
}

export default Temperature;
