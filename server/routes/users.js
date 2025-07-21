import express from 'express';
import User from '../models/User.js';
import Career from '../models/Career.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('savedJobs')
      .populate('appliedJobs.job');

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
      error: error.message
    });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const allowedUpdates = ['name', 'profile'];
    const updates = {};

    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      updates,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
});

// Save/Unsave job
router.post('/save-job/:jobId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const jobId = req.params.jobId;

    const isJobSaved = user.savedJobs.includes(jobId);

    if (isJobSaved) {
      // Remove from saved jobs
      user.savedJobs = user.savedJobs.filter(id => id.toString() !== jobId);
    } else {
      // Add to saved jobs
      user.savedJobs.push(jobId);
    }

    await user.save();

    res.json({
      success: true,
      message: isJobSaved ? 'Job removed from saved list' : 'Job saved successfully',
      saved: !isJobSaved
    });
  } catch (error) {
    console.error('Save job error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save/unsave job',
      error: error.message
    });
  }
});

// Get saved jobs
router.get('/saved-jobs', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('savedJobs');

    res.json({
      success: true,
      data: user.savedJobs
    });
  } catch (error) {
    console.error('Get saved jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch saved jobs',
      error: error.message
    });
  }
});

// Get applied jobs
router.get('/applied-jobs', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('appliedJobs.job');

    res.json({
      success: true,
      data: user.appliedJobs
    });
  } catch (error) {
    console.error('Get applied jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applied jobs',
      error: error.message
    });
  }
});

// Get all users (Admin only)
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;

    const filter = {};
    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') }
      ];
    }

    const users = await User.find(filter)
      .select('-password')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(filter);

    res.json({
      success: true,
      data: users,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
});

// Update user role (Admin only)
router.put('/:userId/role', auth, adminAuth, async (req, res) => {
  try {
    const { role } = req.body;
    const { userId } = req.params;

    if (!['user', 'admin', 'recruiter'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role'
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User role updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user role',
      error: error.message
    });
  }
});

export default router;