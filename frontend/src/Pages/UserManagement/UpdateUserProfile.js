import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateUserProfile.css';
import GlassLayout from '../../Components/Layout/GlassLayout';
import theme from '../../theme/Theme';
// Material UI imports
import { 
  Box, 
  Button, 
  Paper, 
  TextField, 
  Typography, 
  Avatar,
  InputAdornment,
  IconButton,
  Chip,
  Stack
} from '@mui/material';
import { Email, Lock, Phone, Person, Add, Description } from '@mui/icons-material';
import { motion } from 'framer-motion';

function UpdateUserProfile() {
  const { id } = useParams();
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
  const navigate = useNavigate();
  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput] });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  useEffect(() => {
    fetch(`http://localhost:8080/user/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then((data) => setFormData(data))
      .catch((error) => console.error('Error:', error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/user/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        if (profilePicture) {
          const formData = new FormData();
          formData.append('file', profilePicture);
          await fetch(`http://localhost:8080/user/${id}/uploadProfilePicture`, {
            method: 'PUT',
            body: formData,
          });
        }
        alert('Profile updated successfully!');
        navigate('/userProfile');
      } else {
        alert('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <GlassLayout topMargin='6rem'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Paper 
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            backdropFilter: 'blur(20px) saturate(180%)',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            boxShadow: `
              0 10px 40px 0 rgba(31, 38, 135, 0.15),
              inset 0 0 0 2px rgba(255, 255, 255, 0.5),
              0 0 0 1px rgba(255, 255, 255, 0.2)
            `,
            border: '1px solid rgba(255, 255, 255, 0.5)',
            overflow: 'hidden',
            position: 'relative',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: `
                0 15px 50px 0 rgba(31, 38, 135, 0.18),
                inset 0 0 0 2px rgba(255, 255, 255, 0.6),
                0 0 0 1px rgba(255, 255, 255, 0.3)
              `,
            },
          }}
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
              Update Your Profile
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
              Customize your profile information and enhance your presence
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Box 
              onClick={() => document.getElementById('profile-upload').click()}
              sx={{
                width: 120,
                height: 120,
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
              ) : formData.profilePicturePath ? (
                <img 
                  src={`http://localhost:8080/uploads/profile/${formData.profilePicturePath}`}
                  alt="Current Profile"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <Person sx={{ fontSize: 64, color: theme.palette.primary.main }} />
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
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              style={{ display: 'none' }}
            />
          </Box>

          <Box 
            component="form" 
            onSubmit={handleSubmit} 
          >
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
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

              <TextField
                fullWidth
                required
                id="password"
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: theme.palette.primary.main }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />

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
            </Box>

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
                      bgcolor: 'rgba(108, 99, 255, 0.1)',
                      color: theme.palette.primary.main,
                      borderRadius: '16px',
                      fontWeight: 500
                    }}
                    onDelete={() => handleRemoveSkill(skill)}
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              size="large"
              sx={{ 
                py: 1.5, 
                fontSize: '1rem',
                mb: 2
              }}
            >
              Update Profile
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </GlassLayout>
  );
}

export default UpdateUserProfile;
