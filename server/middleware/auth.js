const jwt = require('jsonwebtoken');

/**
 * Middleware to verify JWT token and attach user to request
 */
const authenticate = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token') || req.header('Authorization')?.replace('Bearer ', '');
  
  // Check if no token
  if (!token) {
    return res.status(401).json({ 
      message: 'No token, authorization denied',
      code: 'NO_TOKEN'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user to request object
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: 'Token expired',
        code: 'TOKEN_EXPIRED'
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        message: 'Invalid token',
        code: 'INVALID_TOKEN'
      });
    }
    
    console.error('Auth middleware error:', error);
    return res.status(500).json({ 
      message: 'Server error during authentication',
      code: 'AUTH_ERROR'
    });
  }
};

/**
 * Middleware to check if user has required role
 * @param {string|string[]} roles - Required role(s)
 */
const authorize = (roles) => {
  return (req, res, next) => {
    // Ensure user exists (should be set by authenticate middleware)
    if (!req.user) {
      return res.status(401).json({ 
        message: 'Authentication required',
        code: 'AUTH_REQUIRED'
      });
    }

    // Convert single role to array
    const requiredRoles = Array.isArray(roles) ? roles : [roles];
    
    // Check if user's role is in required roles
    if (!requiredRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Access denied. Required role: ${requiredRoles.join(' or ')}`,
        code: 'FORBIDDEN',
        userRole: req.user.role,
        requiredRoles
      });
    }

    next();
  };
};

/**
 * Middleware to check if user is admin
 * (Convenience wrapper around authorize)
 */
const isAdmin = authorize('admin');

/**
 * Middleware to check if user is caregiver or admin
 */
const isCaregiverOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      message: 'Authentication required',
      code: 'AUTH_REQUIRED'
    });
  }

  if (req.user.role === 'admin' || req.user.role === 'caregiver') {
    next();
  } else {
    return res.status(403).json({ 
      message: 'Access denied. Caregiver or admin role required',
      code: 'FORBIDDEN',
      userRole: req.user.role,
      requiredRoles: ['admin', 'caregiver']
    });
  }
};

/**
 * Middleware to check if user is accessing their own resource
 * @param {Function} getResourceOwnerId - Function to extract owner ID from request
 */
const isOwner = (getResourceOwnerId) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ 
          message: 'Authentication required',
          code: 'AUTH_REQUIRED'
        });
      }

      // Admin can access any resource
      if (req.user.role === 'admin') {
        return next();
      }

      // Get the owner ID of the resource
      const ownerId = await getResourceOwnerId(req);
      
      // Check if user is the owner
      if (req.user.id === ownerId) {
        next();
      } else {
        return res.status(403).json({ 
          message: 'Access denied. You do not own this resource',
          code: 'FORBIDDEN'
        });
      }
    } catch (error) {
      console.error('Owner check error:', error);
      return res.status(500).json({ 
        message: 'Error checking resource ownership',
        code: 'SERVER_ERROR'
      });
    }
  };
};

/**
 * Middleware to check if caregiver can access patient data
 * @param {Function} getPatientId - Function to extract patient ID from request
 */
const canAccessPatient = (getPatientId) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ 
          message: 'Authentication required',
          code: 'AUTH_REQUIRED'
        });
      }

      // Admin can access any patient
      if (req.user.role === 'admin') {
        return next();
      }

      // Users can access their own data
      if (req.user.role === 'user') {
        const patientId = await getPatientId(req);
        if (req.user.id === patientId) {
          return next();
        }
      }

      // Caregivers can access assigned patients
      if (req.user.role === 'caregiver') {
        const patientId = await getPatientId(req);
        const db = require('../db'); // Import your db connection
        
        // Check if caregiver is assigned to this patient
        const result = await db.query(
          'SELECT 1 FROM patient_caregiver WHERE caregiver_id = $1 AND patient_id = $2',
          [req.user.id, patientId]
        );
        
        if (result.rows.length > 0) {
          return next();
        }
      }

      // If none of the above conditions met, deny access
      return res.status(403).json({ 
        message: 'Access denied. You do not have permission to access this patient data',
        code: 'FORBIDDEN'
      });

    } catch (error) {
      console.error('Patient access check error:', error);
      return res.status(500).json({ 
        message: 'Error checking patient access',
        code: 'SERVER_ERROR'
      });
    }
  };
};

/**
 * Middleware to check if user is authenticated (simple check)
 * Use this when you just need to know if user is logged in
 */
const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      message: 'Authentication required',
      code: 'AUTH_REQUIRED'
    });
  }
  next();
};

/**
 * Middleware to optionally authenticate (doesn't require token)
 * Attaches user if token exists, but continues even if no token
 */
const optionalAuthenticate = (req, res, next) => {
  const token = req.header('x-auth-token') || req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    // Token invalid but we continue anyway
    console.log('Optional auth: Invalid token, continuing without user');
  }
  
  next();
};

/**
 * Generate JWT token for user
 * @param {Object} user - User object with id, email, role
 * @returns {string} JWT token
 */
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email,
      role: user.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

/**
 * Refresh token middleware
 * Generates a new token if current token is about to expire
 */
const refreshTokenIfNeeded = (req, res, next) => {
  if (!req.user) {
    return next();
  }

  // Check if token is about to expire (less than 1 hour remaining)
  const token = req.header('x-auth-token') || req.header('Authorization')?.replace('Bearer ', '');
  
  if (token) {
    try {
      const decoded = jwt.decode(token);
      const expirationTime = decoded.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      const timeUntilExpiry = expirationTime - currentTime;
      const oneHour = 60 * 60 * 1000;

      // If token expires in less than 1 hour, generate new token
      if (timeUntilExpiry < oneHour && timeUntilExpiry > 0) {
        const newToken = generateToken(req.user);
        res.setHeader('x-new-token', newToken);
      }
    } catch (error) {
      // Ignore errors in token refresh
      console.log('Token refresh check failed:', error.message);
    }
  }

  next();
};

module.exports = {
  authenticate,
  authorize,
  isAdmin,
  isCaregiverOrAdmin,
  isOwner,
  canAccessPatient,
  isAuthenticated,
  optionalAuthenticate,
  generateToken,
  refreshTokenIfNeeded
};