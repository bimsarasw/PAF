import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './user.css';
import GoogalLogo from './img/glogo.png';
// Material UI imports
import { ThemeProvider, CssBaseline, Box, Container, Paper, Typography, Button, TextField, InputAdornment, IconButton, Divider, Avatar } from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { motion } from 'framer-motion';
import GlassLayout from '../../Components/Layout/GlassLayout';
import GlassCard from '../../Components/Layout/GlassCard';
import theme from '../../theme/Theme';

function UserLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userID', data.id); // Save user ID in local storage
        alert('Login successful!');
        navigate('/allPost');
      } else if (response.status === 401) {
        alert('Invalid credentials!');
      } else {
        alert('Failed to login!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <GlassLayout maxWidth="sm" hideNavbar={true}>
      <GlassCard>
        <Box sx={{ position: 'relative', zIndex: 3 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Box sx={{ textAlign: 'center', mb: 3 }}>
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
                Welcome to SnapWise
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
                Sign in to continue your photography journey
              </Typography>
            </Box>
          </motion.div>

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
                value={formData.email}
                onChange={handleInputChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2.5 }}
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
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleInputChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 1 }}
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
                Sign In
              </Button>
            </motion.div>

            <Divider sx={{ my: 3 }}>
              or continue with
            </Divider>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Button
                type="button"
                fullWidth
                variant="outlined"
                size="large"
                onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'}
                startIcon={
                  <Avatar 
                    src={GoogalLogo} 
                    sx={{ width: 20, height: 20 }} 
                  />
                }
                sx={{ py: 1.5 }}
              >
                Sign in with Google
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Box sx={{ mt: 3.5, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => (window.location.href = '/register')}
                  >
                    Sign up
                  </Typography>
                </Typography>
              </Box>
            </motion.div>
          </Box>
        </Box>
      </GlassCard>
    </GlassLayout>
  );
}

export default UserLogin;
