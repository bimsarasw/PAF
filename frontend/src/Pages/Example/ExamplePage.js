import React from 'react';
import { Typography, Button, TextField, Box, InputAdornment } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import { motion } from 'framer-motion';
import GlassLayout from '../../components/Layout/GlassLayout';
import GlassCard from '../../components/Layout/GlassCard';

function ExamplePage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <GlassLayout maxWidth="sm">
      <GlassCard>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{
              background: 'linear-gradient(45deg, #6C63FF 30%, #FF6584 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.5px',
              mb: 1
            }}
          >
            Example Page
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ 
              maxWidth: '80%', 
              mx: 'auto',
              opacity: 0.8
            }}
          >
            This is an example of using our global theme and layout
          </Typography>
        </Box>

        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ mt: 2 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ py: 1.5 }}
            >
              Submit
            </Button>
          </motion.div>
        </Box>
      </GlassCard>
    </GlassLayout>
  );
}

export default ExamplePage;
