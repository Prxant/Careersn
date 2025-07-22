import React from 'react';
import { Briefcase, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content">
      <div className="footer p-10 max-w-6xl mx-auto">
        <aside>
          <Briefcase className="h-12 w-12 text-primary" />
          <p className="font-bold text-lg">
            CareerSn
            <br />
            <span className="font-normal text-sm">Connecting talent with opportunity since 2024</span>
          </p>
        </aside>
        
        <nav>
          <header className="footer-title">Services</header>
          <a className="link link-hover">Job Search</a>
          <a className="link link-hover">Career Guidance</a>
          <a className="link link-hover">Resume Building</a>
          <a className="link link-hover">Interview Prep</a>
        </nav>
        
        <nav>
          <header className="footer-title">Company</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Terms of Service</a>
        </nav>
        
        <nav>
          <header className="footer-title">Contact</header>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>hello@careersn.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>+91 7658904567</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Lucknow, India</span>
          </div>
        </nav>
      </div>
      
      <div className="footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>Copyright © 2024 CareerSn. All rights reserved.</p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;