const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

// Google authentication endpoint
router.post('/google', async (req, res) => {
  try {
    const { email, name, googleId, picture, role } = req.body;
    
    console.log('📧 Google auth request for:', email, 'Role received:', role);

    if (!email || !googleId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if user exists
    let user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rows.length > 0) {
      // User exists
      console.log('✅ User found in database:', email);
      
      // CASE 1: User exists and this is a signup attempt (role provided)
      if (role && (role === 'user' || role === 'caregiver')) {
        console.log('❌ Signup attempt with existing email:', email);
        return res.status(409).json({ message: 'User already exists' });
      }
      
      // CASE 2: User exists and this is a login attempt (no role)
      // Update google_id if not set
      if (!user.rows[0].google_id) {
        console.log('🔄 Linking Google account to existing user:', email);
        
        await db.query(
          'UPDATE users SET google_id = $1, picture = COALESCE($2, picture) WHERE email = $3',
          [googleId, picture, email]
        );
        
        // Refresh user data
        user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      }
      
      // Generate JWT token for existing user
      const token = jwt.sign(
        { 
          id: user.rows[0].id, 
          email: user.rows[0].email,
          role: user.rows[0].role 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      console.log('✅ Google login successful for:', email, 'Role:', user.rows[0].role);

      return res.json({
        success: true,
        token,
        user: {
          id: user.rows[0].id,
          name: user.rows[0].name,
          email: user.rows[0].email,
          role: user.rows[0].role,
          picture: user.rows[0].picture,
          created_at: user.rows[0].created_at
        }
      });
    } else {
      // User doesn't exist
      console.log('❌ User not found in database:', email);
      
      // CASE 3: User doesn't exist and this is a signup attempt (role provided)
      if (role && (role === 'user' || role === 'caregiver')) {
        console.log('🆕 Creating new user from Google account with role:', role);
        
        const newUser = await db.query(
          'INSERT INTO users (name, email, password, role, google_id, picture) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email, role, picture, created_at',
          [name || email.split('@')[0], email, 'GOOGLE_AUTH_' + Date.now(), role, googleId, picture || null]
        );
        
        // Generate JWT token for new user
        const token = jwt.sign(
          { 
            id: newUser.rows[0].id, 
            email: newUser.rows[0].email,
            role: newUser.rows[0].role 
          },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );

        console.log('✅ Google signup successful for:', email, 'Role:', newUser.rows[0].role);

        return res.json({
          success: true,
          token,
          user: {
            id: newUser.rows[0].id,
            name: newUser.rows[0].name,
            email: newUser.rows[0].email,
            role: newUser.rows[0].role,
            picture: newUser.rows[0].picture,
            created_at: newUser.rows[0].created_at
          }
        });
      } else {
        // CASE 4: User doesn't exist and this is a login attempt (no role)
        console.log('❌ Login attempt with non-existent email:', email);
        return res.status(404).json({ message: 'User not found' });
      }
    }
  } catch (error) {
    console.error('❌ Google auth error:', error);
    res.status(500).json({ message: 'Server error during Google authentication' });
  }
});

module.exports = router;