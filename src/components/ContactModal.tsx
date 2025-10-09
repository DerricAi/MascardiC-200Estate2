import React, { useState, useEffect } from 'react';
import { X, Users } from 'lucide-react';

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
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleWhatsAppSubmit: (e: React.FormEvent) => void;
}

const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  formData,
  handleInputChange,
  handleWhatsAppSubmit,
}) => {
  const [viewerCount, setViewerCount] = useState<number | null>(null);
  const [showViewers, setShowViewers] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setShowViewers(false);
      setViewerCount(null);
      return;
    }

    const initialDelay = setTimeout(() => {
      const randomCount = Math.floor(Math.random() * 11) + 10;
      setViewerCount(randomCount);
      setShowViewers(true);
    }, 3000);

    const updateInterval = setInterval(() => {
      setViewerCount(prev => {
        if (prev === null) return null;
        const change = Math.random() > 0.5 ? 1 : -1;
        const newCount = prev + change;
        return Math.max(10, Math.min(20, newCount));
      });
    }, 15000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(updateInterval);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getAvailableHours = (day: string): string[] => {
    if (!day) return [];

    const date = new Date(day);
    const dayOfWeek = date.getDay();

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      return ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];
    } else if (dayOfWeek === 6) {
      return ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
    } else if (dayOfWeek === 0) {
      return ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'];
    }

    return [];
  };

  const availableHours = getAvailableHours(formData.preferredDay);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-bold text-gray-900">Book Your Test Drive</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              aria-label="Close modal"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {showViewers && viewerCount !== null && (
            <div className="flex items-center gap-2 text-sm text-gray-600 animate-fade-in">
              <Users className="h-4 w-4 text-cyan-600" />
              <span className="font-medium text-cyan-600">{viewerCount}</span>
              <span>people viewing this form right now</span>
            </div>
          )}
        </div>

        <form onSubmit={handleWhatsAppSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
              placeholder="+254 712 345 678"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="preferredDay" className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Day
              </label>
              <input
                type="date"
                id="preferredDay"
                name="preferredDay"
                value={formData.preferredDay}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="preferredTime" className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Time
              </label>
              <select
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleInputChange}
                disabled={!formData.preferredDay}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Select a time</option>
                {availableHours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              {!formData.preferredDay && (
                <p className="text-xs text-gray-500 mt-1">Please select a day first</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="timeline" className="block text-sm font-semibold text-gray-700 mb-2">
              Purchase Timeline
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
            >
              <option value="this-month">This Month</option>
              <option value="within-3-months">Within 3 months</option>
              <option value="this-year">This Year</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Book My Test Drive
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
