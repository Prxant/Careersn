import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Job type is required'],
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote']
  },
  level: {
    type: String,
    required: [true, 'Experience level is required'],
    enum: ['Entry', 'Mid', 'Senior', 'Lead', 'Executive']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Technology', 'Design', 'Marketing', 'Sales', 'Data Science', 'Product', 'Finance', 'HR', 'Operations', 'Other']
  },
  salary: {
    min: {
      type: Number,
      required: [true, 'Minimum salary is required']
    },
    max: {
      type: Number,
      required: [true, 'Maximum salary is required']
    },
    currency: {
      type: String,
      default: 'USD'
    },
    period: {
      type: String,
      enum: ['hourly', 'monthly', 'yearly'],
      default: 'yearly'
    }
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  requirements: [{
    type: String,
    required: true
  }],
  responsibilities: [{
    type: String,
    required: true
  }],
  skills: [{
    type: String,
    required: true
  }],
  benefits: [{
    type: String
  }],
  applicationDeadline: {
    type: Date,
    required: [true, 'Application deadline is required']
  },
  image: {
    type: String,
    default: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  companyInfo: {
    website: String,
    size: {
      type: String,
      enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']
    },
    industry: String,
    founded: Number,
    description: String
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'paused', 'closed', 'draft'],
    default: 'active'
  },
  featured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  applications: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    appliedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'],
      default: 'pending'
    },
    coverLetter: String,
    resume: String
  }]
}, {
  timestamps: true
});

// Indexes for better query performance
careerSchema.index({ title: 'text', company: 'text', description: 'text' });
careerSchema.index({ category: 1 });
careerSchema.index({ type: 1 });
careerSchema.index({ level: 1 });
careerSchema.index({ location: 1 });
careerSchema.index({ status: 1 });
careerSchema.index({ featured: 1 });
careerSchema.index({ createdAt: -1 });

// Virtual for formatted salary
careerSchema.virtual('formattedSalary').get(function() {
  const { min, max, currency } = this.salary;
  return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
});

// Virtual for days since posted
careerSchema.virtual('postedDaysAgo').get(function() {
  const now = new Date();
  const posted = this.createdAt;
  const diffTime = Math.abs(now - posted);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
  return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
});

// Ensure virtual fields are serialized
careerSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Career', careerSchema);