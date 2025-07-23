import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, DollarSign, Users, Calendar, Briefcase, CheckCircle } from 'lucide-react';
import { mockCareers } from '../data/mockData';

const CareerDetail = () => {
  const { id } = useParams();
  const career = mockCareers.find(c => c.id === id);

  if (!career) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
          <Link to="/jobs" className="btn btn-primary">Back to Jobs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/jobs" className="btn btn-ghost mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Link>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <img 
                src={career.image} 
                alt={career.title}
                className="w-32 h-32 object-cover rounded-lg shadow-lg"
              />
            </div>
            
            <div className="flex-grow">
              <div className="flex flex-wrap gap-2 mb-3">
                <div className={`badge ${career.type === 'Full-time' ? 'badge-primary' : 'badge-secondary'} badge-lg`}>
                  {career.type}
                </div>
                <div className="badge badge-outline badge-lg">{career.level}</div>
                <div className="badge badge-accent badge-lg">{career.category}</div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{career.title}</h1>
              <h2 className="text-xl text-base-content/80 mb-4">{career.company}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{career.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-success" />
                  <span>{career.salary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-warning" />
                  <span>Posted {career.postedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-error" />
                  <span>Apply by {career.applicationDeadline}</span>
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <button className="btn btn-primary btn-lg w-full mb-2">
                Apply Now
              </button>
              <button className="btn btn-outline w-full">
                Save Job
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Briefcase className="h-6 w-6" />
                Job Description
              </h3>
              <div className="prose max-w-none">
                <p className="text-base-content/80 leading-relaxed">{career.description}</p>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4">Key Responsibilities</h3>
              <ul className="space-y-2">
                {career.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4">Requirements</h3>
              <ul className="space-y-2">
                {career.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4">Benefits & Perks</h3>
              <ul className="space-y-2">
                {career.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h4 className="card-title mb-4">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill, index) => (
                    <div key={index} className="badge badge-primary">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h4 className="card-title mb-4">Job Summary</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-semibold">Job Type:</span>
                    <span>{career.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Experience:</span>
                    <span>{career.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Category:</span>
                    <span>{career.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Location:</span>
                    <span>{career.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-primary text-primary-content shadow-lg">
              <div className="card-body text-center">
                <h4 className="card-title justify-center mb-2">Ready to Apply?</h4>
                <p className="mb-4">Join thousands of professionals who found their dream job with us.</p>
                <button className="btn btn-neutral">Apply Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDetail;