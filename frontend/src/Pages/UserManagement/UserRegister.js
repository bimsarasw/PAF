import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Container, Paper, Typography, Button, TextField, InputAdornment, IconButton, Divider, Stack, Chip, Avatar } from '@mui/material';
import { Person, Email, Lock, Description, Phone, Visibility, VisibilityOff, Add } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { FaUserCircle } from 'react-icons/fa';
import GlassLayout from '../../Components/Layout/GlassLayout';
import GlassCard from '../../Components/Layout/GlassCard';
import theme from '../../theme/Theme';
import GoogalLogo from './img/glogo.png';
import './UserRegister.css';

function UserRegister() {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        phone: '',
        skills: [],
        bio: '',
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
    const [userEnteredCode, setUserEnteredCode] = useState('');
    const [skillInput, setSkillInput] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddSkill = () => {
        if (skillInput.trim()) {
            setFormData({ ...formData, skills: [...formData.skills, skillInput] });
            setSkillInput('');
        }
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setPreviewImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        document.getElementById('profilePictureInput').click();
    };

    const sendVerificationCode = async (email) => {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        localStorage.setItem('verificationCode', code);
        try {
            await fetch('http://localhost:8080/sendVerificationCode', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code }),
            });
        } catch (error) {
            console.error('Error sending verification code:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;

        if (!formData.email) {
            alert("Email is required");
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            alert("Email is invalid");
            isValid = false;
        }

        if (!profilePicture) {
            alert("Profile picture is required");
            isValid = false;
        }
        if (formData.skills.length < 2) {
            alert("Please add at least two skills.");
            isValid = false;
        }
        if (!isValid) {
            return; // Stop execution if validation fails
        }

        try {
            const response = await fetch('http://localhost:8080/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullname: formData.fullname,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone,
                    skills: formData.skills,
                    bio: formData.bio,
                }),
            });

            if (response.ok) {
                const userId = (await response.json()).id;

                if (profilePicture) {
                    const profileFormData = new FormData();
                    profileFormData.append('file', profilePicture);
                    await fetch(`http://localhost:8080/user/${userId}/uploadProfilePicture`, {
                        method: 'PUT',
                        body: profileFormData,
                    });
                }

                sendVerificationCode(formData.email);
                setIsVerificationModalOpen(true);
            } else if (response.status === 409) {
                alert('Email already exists!');
            } else {
                alert('Failed to register user.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleVerifyCode = () => {
        const savedCode = localStorage.getItem('verificationCode');
        if (userEnteredCode === savedCode) {
            alert('Verification successful!');
            localStorage.removeItem('verificationCode');
            window.location.href = '/';
        } else {
            alert('Invalid verification code. Please try again.');
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
      <GlassLayout maxWidth="md" hideNavbar={true}>
        <GlassCard>
          <Box sx={{ position: 'relative', zIndex: 3 }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
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
                  Create Your Account
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
                  Join the community and start your photography journey
                </Typography>
              </Box>
            </motion.div>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Box 
                  onClick={triggerFileInput}
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(108, 99, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: `2px dashed ${theme.palette.primary.main}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(108, 99, 255, 0.2)',
                      transform: 'scale(1.05)',
                    },
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Profile Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <FaUserCircle size={64} color={theme.palette.primary.main} />
                  )}
                </Box>
                <Typography 
                  variant="caption" 
                  display="block" 
                  textAlign="center" 
                  sx={{ mt: 1, color: 'text.secondary' }}
                >
                  Click to upload profile picture
                </Typography>
                <input
                  id="profilePictureInput"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  style={{ display: 'none' }}
                />
              </motion.div>
            </Box>

            <Box 
              component="form" 
              onSubmit={handleSubmit} 
            >
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <TextField
                    fullWidth
                    required
                    id="fullname"
                    label="Full Name"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: theme.palette.primary.main }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <TextField
                    fullWidth
                    required
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: theme.palette.primary.main }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <TextField
                    fullWidth
                    required
                    id="password"
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: theme.palette.primary.main }} />
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
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <TextField
                    fullWidth
                    required
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => {
                      const re = /^[0-9\b]{0,10}$/;
                      if (re.test(e.target.value)) {
                          handleInputChange(e);
                      }
                    }}
                    inputProps={{ maxLength: 10, pattern: "[0-9]{10}" }}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone sx={{ color: theme.palette.primary.main }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                </motion.div>
              </Box>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                    Skills
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1.5 }}>
                    {formData.skills.map((skill, index) => (
                      <Chip 
                        key={index}
                        label={skill}
                        sx={{ 
                          my: 0.5,
                          background: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          borderRadius: '16px',
                          fontWeight: 500
                        }}
                        onDelete={() => {
                          setFormData({
                            ...formData,
                            skills: formData.skills.filter((_, i) => i !== index)
                          });
                        }}
                      />
                    ))}
                  </Stack>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      fullWidth
                      placeholder="Add a skill"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && skillInput.trim()) {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                      variant="outlined"
                      size="small"
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                    <Button
                      onClick={handleAddSkill}
                      variant="contained"
                      color="primary"
                      sx={{ 
                        minWidth: 'auto',
                        borderRadius: 2,
                        px: 2
                      }}
                    >
                      <Add />
                    </Button>
                  </Box>
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <TextField
                  fullWidth
                  required
                  id="bio"
                  label="Bio"
                  name="bio"
                  multiline
                  rows={4}
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={handleInputChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                        <Description sx={{ color: theme.palette.primary.main }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ 
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ 
                    py: 1.5, 
                    fontSize: '1rem',
                    background: 'linear-gradient(45deg, #6C63FF 30%, #5A52D9 90%)',
                    boxShadow: '0 6px 20px rgba(108, 99, 255, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #5A52D9 30%, #4A42C9 90%)',
                      boxShadow: '0 8px 25px rgba(108, 99, 255, 0.4)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                    mb: 2
                  }}
                >
                  Create Account
                </Button>
              </motion.div>

              <Divider sx={{ 
                my: 2.5, 
                '&::before, &::after': {
                  borderColor: 'rgba(0, 0, 0, 0.1)',
                },
                color: 'text.secondary',
                fontWeight: 500
              }}>
                or continue with
              </Divider>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
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
                      sx={{ 
                        width: 20, 
                        height: 20,
                        backgroundColor: 'transparent' 
                      }} 
                    />
                  }
                  sx={{ 
                    py: 1.5,
                    color: '#5F6368',
                    borderColor: 'rgba(0, 0, 0, 0.12)',
                    background: 'white',
                    '&:hover': {
                      background: '#F8F9FA',
                      borderColor: 'rgba(0, 0, 0, 0.2)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Sign in with Google
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <Box sx={{ mt: 3.5, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Already have an account?{' '}
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ 
                        color: theme.palette.secondary.main,
                        cursor: 'pointer', 
                        fontWeight: 600,
                        '&:hover': {
                          textDecoration: 'underline',
                        }
                      }}
                      onClick={() => navigate('/')}
                    >
                      Sign in
                    </Typography>
                  </Typography>
                </Box>
              </motion.div>
            </Box>
          </Box>
          
          {isVerificationModalOpen && (
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(5px)',
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 9999,
              }}
            >
              <Paper
                component={motion.div}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  maxWidth: 400,
                  width: '90%',
                  textAlign: 'center',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.95)',
                }}
              >
                <Typography variant="h5" fontWeight="bold" mb={1}>
                  Verify Your Email
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={3}>
                  Please enter the verification code sent to your email.
                </Typography>
                <TextField
                  fullWidth
                  value={userEnteredCode}
                  onChange={(e) => setUserEnteredCode(e.target.value)}
                  placeholder="Enter verification code"
                  variant="outlined"
                  sx={{ mb: 3 }}
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                      fontSize: '1.2rem',
                      letterSpacing: '0.2em',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      '& input': {
                        textAlign: 'center',
                      },
                    }
                  }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleVerifyCode}
                  sx={{
                    py: 1.5,
                    background: 'linear-gradient(45deg, #6C63FF 30%, #5A52D9 90%)',
                    borderRadius: 2,
                    boxShadow: '0 6px 20px rgba(108, 99, 255, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #5A52D9 30%, #4A42C9 90%)',
                      boxShadow: '0 8px 25px rgba(108, 99, 255, 0.4)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Verify
                </Button>
              </Paper>
            </Box>
          )}
        </GlassCard>
      </GlassLayout>
    );
}

export default UserRegister;
