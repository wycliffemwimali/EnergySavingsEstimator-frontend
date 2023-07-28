// Inbox.js
import React from 'react';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Image4 from '../energy0.jpg';
import Image1 from '../energy1.jpg';
import Image2 from '../energy2.jpg';
import Image3 from '../energy3.jpg';
import Image5 from '../energy4.jpg';
import Image6 from '../energy5.jpg';
import Image7 from '../energy6.jpg';
import Image8 from '../energy7.jpg';
import Image9 from '../energy8.jpg';

const ImageCarousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <img
        src={images[currentImageIndex]}
        alt={`Image ${currentImageIndex + 1}`}
        style={{ width: '100%', height: '680px', objectFit: 'fill' }}
      />
    </div>
  );
};

const SloganTypography = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  position: 'relative',
  textAlign: 'center',
  fontWeight: 'bold',
  fontStyle: 'italic',
  [theme.breakpoints.up('sm')]: {
    fontSize: '2rem',
  },
}));

export default function Home() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
          <SloganTypography variant="subtitle1" gutterBottom>
            "Empowering Tomorrow with Sustainable Energy Solutions"
          </SloganTypography>
          <ImageCarousel images={[Image5, Image4, Image1, Image2, Image3, Image8, Image6, Image7, Image9]} />
    </Router>
  );
}
