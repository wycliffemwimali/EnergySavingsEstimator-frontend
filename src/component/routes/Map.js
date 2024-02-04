import React from 'react';
import GoogleMapWithMarker from './GoogleMapWithMarker';

const App = () => {
  // Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual API key
  const apiKey = 'AIzaSyBbvDUSQ1yBAGEsDJQNg1Hr2WMZd4UD_MY';

  return (
    <div>
      <GoogleMapWithMarker apiKey={apiKey} />
    </div>
  );
};

export default App;
