// Inbox.js
import React from 'react';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Image1 from '../energy1.jpeg';
import Image2 from '../energy2.jpeg';
import Image3 from '../energy3.jpeg';

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
        style={{ width: '100%', height: '700px', objectFit: 'cover' }}
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
      {/* <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Energy Savings Estimator
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {[
              { text: 'Home', icon: <HomeIcon />, link: '/' },
              { text: 'Map Integration', icon: <GpsFixedTwoToneIcon />, link: '/Map' },
              { text: 'Temperature Data', icon: <DeviceThermostatTwoToneIcon />, link: '/Temperature' },
              { text: 'Energy Savings', icon: <EnergySavingsLeafTwoToneIcon />, link: '/Energy' },
              { text: 'Data Trends', icon: <TimelineTwoToneIcon />, link: '/Trends' },
              { text: 'Data Visualization', icon: <LeaderboardIcon />, link: '/Visualize' },
            ].map((item, index) => (
              <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  component={Link}
                  to={item.link}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, paddingTop: '30px' }}>
          <DrawerHeader /> */}

          <SloganTypography variant="subtitle1" gutterBottom>
            "Empowering Tomorrow with Sustainable Energy Solutions"
          </SloganTypography>

          <ImageCarousel images={[Image1, Image2, Image3]} />

          {/* <Switch>
            <Route path="/Temperature">
              <Temperature />
            </Route>
            <Route path="/Energy">
              <Energy />
            </Route>
            <Route path="/Map">
              <Map />
            </Route>
            <Route path="/Trends">
              <Trends />
            </Route>
            <Route path="/Visualize">
              <Visualize />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch> */}
        {/* </Box> */}
      {/* </Box> */}
    </Router>
  );
}
