import React from 'react';
import { Paper, Box } from '@mui/material';
import { motion } from 'framer-motion';

const GlassCard = ({ children, elevation = 0, sx = {} }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <Paper 
        elevation={elevation}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 8,
          backdropFilter: 'blur(25px) saturate(200%)',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          boxShadow: `
            0 10px 30px 0 rgba(31, 38, 135, 0.1),
            inset 0 0 0 1px rgba(255, 255, 255, 0.2)
          `,
          border: '1px solid rgba(255, 255, 255, 0.2)',
          overflow: 'hidden',
          position: 'relative',
          transition: 'all 0.4s ease',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: `
              0 15px 40px 0 rgba(31, 38, 135, 0.12),
              inset 0 0 0 1px rgba(255, 255, 255, 0.3)
            `,
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '3px',
            background: 'linear-gradient(90deg, #6C63FF, #3F8CFF, #6C63FF)',
            backgroundSize: '200% 100%',
            animation: 'gradient 8s ease infinite',
            zIndex: 2,
            opacity: 0.8,
          },
          '@keyframes gradient': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          },
          ...sx
        }}
      >
        <Box
          component={motion.div}
          sx={{
            position: 'absolute',
            top: '-100%',
            left: '-100%',
            right: '-100%',
            bottom: '-100%',
            background: 'linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
            transform: 'rotate(30deg)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
          animate={{
            left: ['200%', '-200%'],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
            repeatDelay: 5
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 3 }}>
          {children}
        </Box>
      </Paper>
    </motion.div>
  );
};

export default GlassCard;
