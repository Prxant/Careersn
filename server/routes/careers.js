import express from 'express';
import Career from '../models/Career.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all careers with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      type,
      level,
      location,
      minSalary,
      maxSalary,
      featured,
      sort = '-createdAt'
    } = req.query;

    // Build filter object
    const filter = { status: 'active' };

    if (search) {
      filter.$text = { $search: search };
    }

    if (category) filter.category = category;
    if (type) filter.type = type;
    if (level) filter.level = level;
    if (location) filter.location = new RegExp(location, 'i');
    if (featured) filter.featured = featured === 'true';

    if (minSalary || maxSalary) {
      filter['salary.min'] = {};
      if (minSalary) filter['salary.min'].$gte = parseInt(minSalary);
      if (maxSalary) filter['salary.max'] = { $lte: parseInt(maxSalary) };
    }

    // Execute query with pagination
    const careers = await Career.find(filter)
      .populate('postedBy', 'name email')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Get total count for pagination
    const total = await Career.countDocuments(filter);

    res.json({
      success: true,
      data: careers,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get careers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch careers',
      error: error.message
    });
  }
});

// Get single career by ID
router.get('/:id', async (req, res) => {
  try {
    const career = await Career.findById(req.params.id)
      .populate('postedBy', 'name email')
      .populate('applications.user', 'name email');

    if (!career) {
      return res.status(404).json({
        success: false,
        message: 'Career not found'
      });
    }

    // Increment view count
    career.views += 1;
    await career.save();

    res.json({
      success: true,
      data: career
    });
  } catch (error) {
    console.error('Get career error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch career',
      error: error.message
    });
  }
});

// Create new career (Admin/Recruiter only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const careerData = {
      ...req.body,
      postedBy: req.user.userId
    };

    const career = new Career(careerData);
    await career.save();

    const populatedCareer = await Career.findById(career._id)
      .populate('postedBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Career created successfully',
      data: populatedCareer
    });
  } catch (error) {
    console.error('Create career error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create career',
      error: error.message
    });
  }
});

// Update career (Admin/Recruiter only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: 'Career not found'
      });
    }

    // Check if user owns this career or is admin
    if (career.postedBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this career'
      });
    }

    const updatedCareer = await Career.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('postedBy', 'name email');

    res.json({
      success: true,
      message: 'Career updated successfully',
      data: updatedCareer
    });
  } catch (error) {
    console.error('Update career error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update career',
      error: error.message
    });
  }
});

// Delete career (Admin/Recruiter only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: 'Career not found'
      });
    }

    // Check if user owns this career or is admin
    if (career.postedBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this career'
      });
    }

    await Career.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Career deleted successfully'
    });
  } catch (error) {
    console.error('Delete career error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete career',
      error: error.message
    });
  }
});

// Apply to a job
router.post('/:id/apply', auth, async (req, res) => {
  try {
    const { coverLetter } = req.body;
    const career = await Career.findById(req.params.id);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: 'Career not found'
      });
    }

    // Check if user already applied
    const existingApplication = career.applications.find(
      app => app.user.toString() === req.user.userId
    );

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied to this job'
      });
    }

    // Add application
    career.applications.push({
      user: req.user.userId,
      coverLetter,
      appliedAt: new Date()
    });

    await career.save();

    res.json({
      success: true,
      message: 'Application submitted successfully'
    });
  } catch (error) {
    console.error('Apply to job error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application',
      error: error.message
    });
  }
});

// Get career statistics (Admin only)
router.get('/admin/stats', auth, adminAuth, async (req, res) => {
  try {
    const totalJobs = await Career.countDocuments();
    const activeJobs = await Career.countDocuments({ status: 'active' });
    const totalApplications = await Career.aggregate([
      { $unwind: '$applications' },
      { $count: 'total' }
    ]);

    const jobsByCategory = await Career.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        totalJobs,
        activeJobs,
        totalApplications: totalApplications[0]?.total || 0,
        jobsByCategory
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message
    });
  }
});

export default router;