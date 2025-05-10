import React from 'react';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import { motion } from 'framer-motion';
import theme from '../../theme/Theme';
// Remove NavBar import to break the circular dependency
// and import it dynamically inside the component

const GlassLayout = ({ children, maxWidth = 'md', backgroundGradient = '135deg, #667eea 0%, #764ba2 100%',hideNavbar ,topMargin='0'}) => {
  // Lazy import NavBar using React.lazy to break the circular dependency
  const [NavBarComponent, setNavBarComponent] = React.useState(null);
  
  React.useEffect(() => {
    // Dynamically import the NavBar component
    import('../../Components/NavBar/NavBar').then(module => {
      if (hideNavbar) return; // Don't set NavBar if hideNavbar is true
      setNavBarComponent(() => module.default);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: `linear-gradient(${backgroundGradient})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'smallGrid\' width=\'40\' height=\'40\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M 40 0 L 0 0 0 40\' fill=\'none\' stroke=\'rgba(255, 255, 255, 0.1)\' stroke-width=\'1\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23smallGrid)\'/%3E%3C/svg%3E")',
            zIndex: 1,
            opacity: 0.3,
          }
        }}
      >
        {/* Conditionally render NavBar once it's loaded */}
        {NavBarComponent && <NavBarComponent />}
        
        {/* Floating Decorative Elements */}
        <Box sx={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' ,marginTop: '16rem'}}>
          {[...Array(6)].map((_, i) => (
            <Box
              key={i}
              component={motion.div}
              sx={{
                position: 'absolute',
                width: Math.random() * 120 + 40,
                height: Math.random() * 120 + 40,
                borderRadius: '50%',
                background: i % 2 === 0 ? 
                  'radial-gradient(circle, rgba(108,99,255,0.4) 0%, rgba(108,99,255,0) 70%)' : 
                  'radial-gradient(circle, rgba(255,101,132,0.3) 0%, rgba(255,101,132,0) 70%)',
                filter: 'blur(8px)',
                zIndex: 1
              }}
              animate={{
                x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              }}
              transition={{
                duration: Math.random() * 60 + 40,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            />
          ))}
        </Box>
        
        <Container maxWidth={maxWidth} sx={{ position: 'relative', zIndex: 2, py: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: topMargin }}>
          {children}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default GlassLayout;
