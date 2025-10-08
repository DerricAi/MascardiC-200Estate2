import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Users } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    name: string;
    email: string;
    phone: string;
    contactPreference: string;
    timeline: string;
    preferredDay: string;
    preferredTime: string;
    privacyAccepted: boolean;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleWhatsAppSubmit: (e: React.FormEvent) => void;
}

const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  formData,
  handleInputChange,
  handleWhatsAppSubmit
}) => {
  const [viewers, setViewers] = useState(() => {
    const baseViewers = 10;
    const sessionStart = Date.now();
    const increment = Math.floor((sessionStart / 1000) % 5);
    return baseViewers + increment;
  });

  useEffect(() => {
    const sessionStart = Date.now();

    const updateViewers = () => {
      const timeElapsed = Date.now() - sessionStart;
      const minutesElapsed = Math.floor(timeElapsed / (60 * 1000));
      const baseIncrement = Math.min(Math.floor(minutesElapsed / 5), 3);
      const randomVariation = Math.floor(Math.random() * 3);
      const newViewers = 10 + baseIncrement + randomVariation;
      setViewers(newViewers);
    };

    const interval = setInterval(updateViewers, 45000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
          aria-label="Close modal"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-br from-blue-50 to-gray-50 px-8 pt-8 pb-6 rounded-t-2xl">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Book Your Test Drive
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll contact you via WhatsApp
            </p>

            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-sm">
              <div className="flex items-center gap-1.5">
                <div className="relative flex items-center">
                  <Users className="w-3.5 h-3.5 text-gray-500" />
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                </div>
                <span className="text-xs text-gray-600 font-medium">
                  {viewers} people viewing now
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <form onSubmit={handleWhatsAppSubmit}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+254 700 000 000"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your.email@gmail.com"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="preferredDay" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Day *
                </label>
                <select
                  id="preferredDay"
                  name="preferredDay"
                  value={formData.preferredDay}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a day</option>
                  <option value="Monday">Monday (9 AM - 6:30 PM)</option>
                  <option value="Tuesday">Tuesday (9 AM - 6:30 PM)</option>
                  <option value="Wednesday">Wednesday (9 AM - 6:30 PM)</option>
                  <option value="Thursday">Thursday (9 AM - 6:30 PM)</option>
                  <option value="Friday">Friday (9 AM - 6:30 PM)</option>
                  <option value="Saturday">Saturday (9 AM - 5 PM)</option>
                  <option value="Sunday">Sunday (10 AM - 4 PM)</option>
                </select>
              </div>

              <div>
                <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time *
                </label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a time</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                  <option value="5:00 PM">5:00 PM</option>
                  <option value="6:00 PM">6:00 PM</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                When would you like to buy?
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="this-month">This Month</option>
                <option value="3-months">Within 3 Months</option>
                <option value="this-year">This Year</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="privacyAccepted"
                  checked={formData.privacyAccepted}
                  onChange={handleInputChange}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  required
                />
                <span className="text-sm text-gray-700">
                  I accept the privacy policy and agree to be contacted regarding this vehicle
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;