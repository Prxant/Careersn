import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, IndianRupee, Users, Calendar, Briefcase, CheckCircle } from 'lucide-react';

const CareerCard = ({ career }) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <figure className="h-48 overflow-hidden">
        <img 
          src={career.image} 
          alt={career.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </figure>
      
      <div className="card-body">
        <div className="flex items-center gap-2 mb-2">
          <div className={`badge ${career.type === 'Full-time' ? 'badge-primary' : 'badge-secondary'}`}>
            {career.type}
          </div>
          <div className="badge badge-outline">{career.level}</div>
        </div>
        
        <h2 className="card-title text-lg mb-2">{career.title}</h2>
        <p className="text-base-content/70 text-sm mb-4 line-clamp-3">{career.description}</p>
        
        <div className="flex flex-col gap-2 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{career.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <IndianRupee className="h-4 w-4 text-success" />
            <span>{career.salary}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-warning" />
            <span>Posted {career.postedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-info" />
            <span>{career.company}</span>
          </div>
        </div>
        
        <div className="card-actions justify-between items-center">
          <div className="flex flex-wrap gap-1">
            {career.skills.slice(0, 3).map((skill, index) => (
              <div key={index} className="badge badge-ghost badge-sm">
                {skill}
              </div>
            ))}
            {career.skills.length > 3 && (
              <div className="badge badge-ghost badge-sm">+{career.skills.length - 3}</div>
            )}
          </div>
          <Link to={`/career/${career.id}`} className="btn btn-primary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CareerCard;