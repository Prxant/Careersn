import jwt from 'jsonwebtoken';
import User from '../models/User.js';


export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. User not found.'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated.'
      });
    }

    req.user = {
      userId: user._id,
      role: user.role,
      email: user.email
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token.'
    });
  }
};

// Admin/Recruiter authorization middleware
export const adminAuth = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'recruiter') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin or recruiter role required.'
    });
  }
  next();
};

// Admin only authorization middleware
export const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin role required.'
    });
  }
  next();
};