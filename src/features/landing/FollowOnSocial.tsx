import React from 'react';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

const SocialFollowStrip = () => {
  return (
    <section className="relative py-12 overflow-hidden">
      {/* Beautiful gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 z-0"></div>
      
      <div className="relative max-w-4xl mx-auto px-4 z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">დაგვიჯერე სოციალურ ქსელებში</h2>
          <p className="text-gray-600">მიიღეთ ექსკლუზივი კონტენტი და განახლებები</p>
        </div>

        <div className="flex justify-center gap-4">
          {/* Facebook */}
          <a 
            href="#" 
            className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors"
            aria-label="Follow us on Facebook"
          >
            <FaFacebook className="text-xl" />
          </a>
          
          {/* Instagram */}
          <a 
            href="#" 
            className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-pink-600 hover:bg-pink-50 transition-colors"
            aria-label="Follow us on Instagram"
          >
            <FaInstagram className="text-xl" />
          </a>
          
          {/* TikTok */}
          <a 
            href="#" 
            className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Follow us on TikTok"
          >
            <FaTiktok className="text-xl text-gray-800" />
          </a>
        </div>

        {/* Decorative hashtag */}
        <div className="text-center mt-8">
          <span className="inline-block px-3 py-1 bg-white/80 text-sm text-gray-700 rounded-full backdrop-blur-sm">
            #ქართულიფეხბურთი
          </span>
        </div>
      </div>
    </section>
  );
};

export default SocialFollowStrip;