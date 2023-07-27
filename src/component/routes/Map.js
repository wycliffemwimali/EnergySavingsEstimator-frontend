import React from 'react';
import GoogleMapWithMarker from './GoogleMapWithMarker';

const App = () => {
  // Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual API key
  const apiKey = 'AIzaSyAaTKwwRKo37A7N7b3f-Ft12Jz8MzVHRqI';

  return (
    <div>
      <GoogleMapWithMarker apiKey={apiKey} />
    </div>
  );
};

export default App;
