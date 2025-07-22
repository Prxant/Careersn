import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Career from '../models/Career.js';

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/careersn');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Career.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@careersn.com',
      password: 'admin123',
      role: 'admin'
    });
    await adminUser.save();

    // Create recruiter user
    const recruiterUser = new User({
      name: 'John Recruiter',
      email: 'recruiter@careersn.com',
      password: 'recruiter123',
      role: 'recruiter'
    });
    await recruiterUser.save();

    // Create sample careers
    const careers = [
      {
        title: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        type: 'Full-time',
        level: 'Senior',
        category: 'Technology',
        salary: { min: 120000, max: 150000 },
        description: 'We are looking for a passionate Senior Frontend Developer to join our dynamic team. You will be responsible for developing user-facing web applications using modern technologies like React, TypeScript, and Next.js.',
        requirements: [
          '5+ years of experience in frontend development',
          'Expert knowledge of React, TypeScript, and modern JavaScript',
          'Experience with state management (Redux, Zustand)',
          'Strong understanding of responsive design and cross-browser compatibility',
          'Experience with testing frameworks (Jest, Cypress)',
          'Bachelor\'s degree in Computer Science or equivalent'
        ],
        responsibilities: [
          'Develop and maintain high-quality web applications',
          'Collaborate with design and backend teams',
          'Optimize applications for maximum speed and scalability',
          'Ensure cross-browser compatibility and responsive design',
          'Mentor junior developers and conduct code reviews',
          'Stay up-to-date with the latest frontend technologies'
        ],
        skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL'],
        benefits: [
          'Competitive salary and equity package',
          'Health, dental, and vision insurance',
          'Flexible work arrangements',
          'Professional development budget',
          'Unlimited PTO',
          'State-of-the-art equipment'
        ],
        applicationDeadline: new Date('2024-12-31'),
        image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
        postedBy: adminUser._id,
        featured: true
      },
      {
        title: 'UX/UI Designer',
        company: 'Design Studio Pro',
        location: 'New York, NY',
        type: 'Full-time',
        level: 'Mid',
        category: 'Design',
        salary: { min: 85000, max: 110000 },
        description: 'Join our creative team as a UX/UI Designer where you\'ll design intuitive and beautiful user experiences for our clients\' digital products.',
        requirements: [
          '3+ years of UX/UI design experience',
          'Proficiency in Figma, Sketch, and Adobe Creative Suite',
          'Strong portfolio showcasing design process',
          'Understanding of user-centered design principles',
          'Experience with prototyping and user testing',
          'Knowledge of HTML/CSS is a plus'
        ],
        responsibilities: [
          'Create wireframes, prototypes, and high-fidelity designs',
          'Conduct user research and usability testing',
          'Collaborate with developers and product managers',
          'Maintain and evolve design systems',
          'Present design solutions to stakeholders',
          'Stay current with design trends and best practices'
        ],
        skills: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping', 'User Research'],
        benefits: [
          'Creative and collaborative work environment',
          'Health and wellness programs',
          'Flexible schedule',
          'Design conference attendance',
          'Modern office space',
          'Team building activities'
        ],
        applicationDeadline: new Date('2024-12-25'),
        image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
        postedBy: recruiterUser._id
      },
      {
        title: 'Data Scientist',
        company: 'Analytics Solutions',
        location: 'Remote',
        type: 'Full-time',
        level: 'Mid',
        category: 'Data Science',
        salary: { min: 95000, max: 125000 },
        description: 'We\'re seeking a Data Scientist to help us extract insights from complex datasets and build machine learning models that drive business decisions.',
        requirements: [
          'Master\'s or PhD in Data Science, Statistics, or related field',
          '3+ years of experience in data analysis and machine learning',
          'Proficiency in Python, R, and SQL',
          'Experience with ML frameworks (scikit-learn, TensorFlow, PyTorch)',
          'Strong statistical analysis skills',
          'Experience with cloud platforms (AWS, GCP, Azure)'
        ],
        responsibilities: [
          'Analyze large datasets to identify trends and patterns',
          'Build and deploy machine learning models',
          'Create data visualizations and reports',
          'Collaborate with cross-functional teams',
          'Present findings to stakeholders',
          'Maintain and improve existing models'
        ],
        skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics'],
        benefits: [
          'Remote-first culture',
          'Competitive compensation',
          'Learning and development opportunities',
          'Flexible working hours',
          'Health insurance',
          'Annual team retreats'
        ],
        applicationDeadline: new Date('2024-12-20'),
        image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
        postedBy: adminUser._id
      }
    ];

    await Career.insertMany(careers);
    console.log('✅ Sample data seeded successfully');

    console.log('\n📊 Seeded Data Summary:');
    console.log(`👥 Users: ${await User.countDocuments()}`);
    console.log(`💼 Careers: ${await Career.countDocuments()}`);
    console.log('\n🔑 Login Credentials:');
    console.log('Admin: admin@careersn.com / admin123');
    console.log('Recruiter: recruiter@careersn.com / recruiter123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();