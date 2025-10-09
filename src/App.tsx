import React, { useState, useEffect, useRef } from 'react';
import ContactModal from './components/ContactModal';
import {
  Car,
  Phone,
  MessageCircle,
  Shield,
  Star,
  Settings,
  Heart,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Check,
  Award,
  Zap,
  Sun,
  Navigation,
  Lock,
  CircleDot
} from 'lucide-react';

function App() {
  // Scroll animation states
  const [scrollY, setScrollY] = useState(0);
  const [showWhatsAppWidget, setShowWhatsAppWidget] = useState(true);
  const [heroInView, setHeroInView] = useState(false);
  const [powerSectionInView, setPowerSectionInView] = useState(false);
  const [engineSectionInView, setEngineSectionInView] = useState(false);
  const [dimensionsSectionInView, setDimensionsSectionInView] = useState(false);
  const [athleticSectionInView, setAthleticSectionInView] = useState(false);
  
  // Modal state
  const [showContactModal, setShowContactModal] = useState(false);
  
  const heroRef = useRef<HTMLElement>(null);
  const powerSectionRef = useRef<HTMLElement>(null);
  const engineSectionRef = useRef<HTMLElement>(null);
  const dimensionsSectionRef = useRef<HTMLElement>(null);
  const athleticSectionRef = useRef<HTMLElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    contactPreference: 'whatsapp',
    timeline: 'this-month',
    preferredDay: '',
    preferredTime: '',
    privacyAccepted: false
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentHeroImageIndex, setCurrentHeroImageIndex] = useState(0);
  const [currentAthleticImageIndex, setCurrentAthleticImageIndex] = useState(0);
  const [engineCardsOffset, setEngineCardsOffset] = useState(0);
  const [dimensionsCardsOffset, setDimensionsCardsOffset] = useState(0);
  const [isAutoScrollingEngine, setIsAutoScrollingEngine] = useState(true);
  const [isAutoScrollingDimensions, setIsAutoScrollingDimensions] = useState(true);
  const [isEngineAutoScrolling, setIsEngineAutoScrolling] = useState(true);
  const [isDimensionsAutoScrolling, setIsDimensionsAutoScrolling] = useState(true);
  const [finalSectionInView, setFinalSectionInView] = useState(false);

  const finalSectionRef = useRef<HTMLElement>(null);

  // Hero images array
  const heroImages = [
    'https://hxu4soai4e.ufs.sh/f/Xjw32Tl2VSCyflzgUXPelHFRDK7pT3UjLWGJt8NSVwybmEkM',
    'https://hxu4soai4e.ufs.sh/f/Xjw32Tl2VSCyN6PULQkNw9YGlOLgurRIokz8s1pZU4TDbfSj',
    'https://hxu4soai4e.ufs.sh/f/Xjw32Tl2VSCyO7ueM3TsmDv6LdQMo2Pr1xcUyFl0fEegzKWZ',
    'https://hxu4soai4e.ufs.sh/f/Xjw32Tl2VSCyZy3l4ygcPf12FIUSlEgRpQqjYm4nV9CzO5ey'
  ];

  // Athletic section images array
  const athleticImages = [
    'https://hxu4soai4e.ufs.sh/f/Xjw32Tl2VSCyKtWA1mFcE90L2o6TZRsqVmu5p3WFgH4fhjSB',
    'https://hxu4soai4e.ufs.sh/f/Xjw32Tl2VSCyUCf99EcCdA70ufjEJB6ywNKQcWHe83xTi1SV'
  ];

  // Scroll event handler
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleScrollAnimations = () => {
      // Check if hero section is in view
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        setHeroInView(isInView);
      }

      // Check if power section is in view
      if (powerSectionRef.current) {
        const rect = powerSectionRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        setPowerSectionInView(isInView);
      }

      // Check if engine section is in view
      if (engineSectionRef.current) {
        const rect = engineSectionRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        setEngineSectionInView(isInView);
      }

      // Check if dimensions section is in view
      if (dimensionsSectionRef.current) {
        const rect = dimensionsSectionRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        setDimensionsSectionInView(isInView);
      }

      // Check if athletic section is in view
      if (athleticSectionRef.current) {
        const rect = athleticSectionRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        setAthleticSectionInView(isInView);
      }

      // Check if final section is in view
      if (finalSectionRef.current) {
        const rect = finalSectionRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        setFinalSectionInView(isInView);
      }
    };

    const onScroll = () => {
      handleScroll();
      handleScrollAnimations();
    };

    window.addEventListener('scroll', onScroll);
    
    // Initial check
    handleScrollAnimations();
    setHeroInView(true); // Hero should be visible on load

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Hero image autoplay effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Athletic section image autoplay effect
  useEffect(() => {
    if (!athleticSectionInView) return;

    const interval = setInterval(() => {
      setCurrentAthleticImageIndex((prevIndex) =>
        (prevIndex + 1) % athleticImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [athleticImages.length, athleticSectionInView]);

  // Auto-scroll engine cards
  useEffect(() => {
    if (!engineSectionInView || !isEngineAutoScrolling) return;

    const interval = setInterval(() => {
      setEngineCardsOffset((prev) => {
        const newOffset = prev - 312;
        // Reset to start when reaching the end
        if (newOffset <= -2184) {
          return 0;
        }
        return newOffset;
      });
    }, 3000); // Move every 3 seconds

    return () => clearInterval(interval);
  }, [engineSectionInView, isEngineAutoScrolling]);

  // Auto-scroll dimensions cards
  useEffect(() => {
    if (!dimensionsSectionInView || !isDimensionsAutoScrolling) return;

    const interval = setInterval(() => {
      setDimensionsCardsOffset((prev) => {
        const newOffset = prev - 312;
        // Reset to start when reaching the end
        if (newOffset <= -936) {
          return 0;
        }
        return newOffset;
      });
    }, 3000); // Move every 3 seconds

    return () => clearInterval(interval);
  }, [dimensionsSectionInView, isDimensionsAutoScrolling]);

  const highlights = [
    {
      icon: Car,
      title: "Design",
      features: [
        "AMG Styling Package",
        "18-inch AMG Alloy Wheels",
        "LED Headlights"
      ],
      quote: "Athletic yet refined.",
      color: "blue",
      backgroundImage: "https://hxu4soai4e.ufs.sh/f/Xjw32Tl2VSCyZy3l4ygcPf12FIUSlEgRpQqjYm4nV9CzO5ey"
    },
    {
      icon: Heart,
      title: "Comfort",
      features: [
        "Panoramic Sunroof",
        "Cranberry Interior",
        "Automatic Climate Control"
      ],
      quote: "Luxury that feels effortless.",
      color: "blue",
      backgroundImage: "https://hxu4soai4e.ufs.sh/f/Xjw32Tl2VSCyCbAwbse7dinSuvkg6boV4cz1ht8YmwO9FTK0"
    },
    {
      icon: Settings,
      title: "Technology",
      features: [
        "COMAND Infotainment",
        "48V Mild Hybrid System",
        "9-Speed Automatic"
      ],
      quote: "Smart, efficient, connected.",
      color: "blue",
      backgroundImage: "https://hxu4soai4e.ufs.sh/f/Xjw32Tl2VSCySpz3g92Dusoyp2d5ehfAHU9mnkcMKIl3SRBJ"
    },
    {
      icon: Shield,
      title: "Safety",
      features: [
        "Active Brake Assist",
        "Attention Assist",
        "Rear Camera & Sensors"
      ],
      quote: "Confidence for your family.",
      color: "blue",
      backgroundImage: "https://hxu4soai4e.ufs.sh/f/Xjw32Tl2VSCynDP5SFBT3C2GjsZQ5UNiId7bxmAV6tyEHJgv"
    }
  ];

  // Preload ALL images aggressively for instant display
  useEffect(() => {
    // Collect all image URLs from the entire page
    const allImageUrls = [
      ...heroImages,
      ...athleticImages,
      ...highlights.filter(h => h.backgroundImage).map(h => h.backgroundImage!),
      'https://hxu4soai4e.ufs.sh/f/Xjw32Tl2VSCyE4qs7c8hwh8g0tyHzRP9sZaTv2ubB3c1VeAf', // Mascardi logo
      'https://hxu4soai4e.ufs.sh/f/Xjw32Tl2VSCyZy3l4ygcPf12FIUSlEgRpQqjYm4nV9CzO5ey', // Dimensions background
      'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop', // Athletic section background
      'https://hxu4soai4e.ufs.sh/f/Xjw32Tl2VSCyXzEwA1l2VSCy4P90htrQx5LbWRoNMdvYIOJK', // Final section background
      'https://hxu4soai4e.ufs.sh/f/Xjw32Tl2VSCyUCf99EcCdA70ufjEJB6ywNKQcWHe83xTi1SV', // Athletic section second image
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      'https://hxu4soai4e.ufs.sh/f/Xjw32Tl2VSCyZfO4XzVgcPf12FIUSlEgRpQqjYm4nV9CzO5e',
      'https://hxu4soai4e.ufs.sh/f/Xjw32Tl2VSCyH6fniex48Bsix7DaCNpo0j2AyblGzvXOk3n5',
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
    ];

    // Immediately show images
    setImagesLoaded(true);

    // Preload all images in parallel with highest priority
    allImageUrls.forEach((url) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      link.fetchPriority = 'high';
      document.head.appendChild(link);

      // Also use Image() for browser caching
      const img = new Image();
      img.fetchPriority = 'high';
      img.src = url;

      // Force immediate decode
      if ('decode' in img) {
        img.decode().catch(() => {});
      }
    });
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % highlights.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + highlights.length) % highlights.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyAccepted) {
      alert('Please accept the privacy policy to continue.');
      return;
    }

    const message = `Hi! I'm interested in the Mercedes-Benz C200 Estate Wagon (KES 4,050,000).

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Preferred Day: ${formData.preferredDay}
Preferred Time: ${formData.preferredTime}
Timeline: ${formData.timeline.replace('-', ' ')}

Please get in touch to arrange a test drive. Thank you!`;

    const whatsappUrl = `https://wa.me/254722200018?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setShowContactModal(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center bg-black overflow-hidden">
        {/* Background Image Carousel */}
        {heroImages.map((imageUrl, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: 'center 30%',
              transform: `translateY(${scrollY * 0.5}px)`,
              opacity: index === currentHeroImageIndex ? 0.6 : 0,
              willChange: 'opacity, transform',
              imageRendering: 'crisp-edges'
            }}
          />
        ))}

        {/* Mascardi Logo - Top Right */}
        <div className="absolute top-8 right-8 z-20">
          <img
            src="https://hxu4soai4e.ufs.sh/f/Xjw32Tl2VSCyE4qs7c8hwh8g0tyHzRP9sZaTv2ubB3c1VeAf"
            alt="Mascardi Logo"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="h-12 md:h-16 w-auto object-contain"
          />
        </div>

        <div className="relative z-10 text-white w-full px-4 md:px-8 lg:px-16 flex items-center h-full">
          <div className="max-w-2xl text-left">
            <p className={`text-lg font-light mb-2 tracking-wide transition-all duration-1000 ease-out text-left text-cyan-300 ${
              heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '0.2s', textShadow: '0 0 20px rgba(103, 232, 249, 0.5)' }}>
              The 2018
            </p>
            <h1 className={`text-6xl md:text-8xl font-light mb-6 leading-none tracking-tight transition-all duration-1000 ease-out text-left bg-gradient-to-r from-cyan-300 via-white to-cyan-300 bg-clip-text text-transparent ${
              heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`} style={{ transitionDelay: '0.4s' }}>
              C-200 Estate
            </h1>
            <p className={`text-2xl md:text-3xl font-light mb-8 tracking-wide transition-all duration-1000 ease-out text-left text-white ${
              heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ fontFamily: 'Montserrat, sans-serif', transitionDelay: '0.6s', textShadow: '0 0 20px rgba(255, 255, 255, 0.4)' }}>
              Luxury for You. Space for Your Family.
            </p>
            <p className={`text-lg text-gray-300 mb-3 font-light leading-relaxed transition-all duration-1000 ease-out text-left ${
              heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '0.8s', textShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}>
              Certified Ex-Japan. Low Mileage.<br />
              <span className="text-white font-normal" style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.5)' }}>KES 4,050,000</span>
            </p>
            <div className={`mb-8 text-left transition-all duration-1000 ease-out ${
              heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '0.9s' }}>
              <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-semibold rounded-full shadow-lg border border-red-400/30">
                <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-2 animate-pulse"></span>
                4 Bookings Only
              </span>
            </div>

            <div className="text-left">
              <button
                onClick={() => setShowContactModal(true)}
                className={`bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-8 py-3 transition-all duration-1000 ease-out text-sm tracking-wide uppercase hover:scale-105 ${
                  heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '1s' }}
              >
                Book Test Drive Today
              </button>
            </div>
          </div>
        </div>
        
        {/* Animated Scroll Cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white text-opacity-80 animate-bounce-slow">
          <ChevronDown className="h-8 w-8" />
          <ChevronDown className="h-8 w-8 -mt-3 animate-bounce-slow-delay" />
        </div>
      </section>

      {/* Power Your Life Section */}
      <section ref={powerSectionRef} className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 leading-tight transition-all duration-1000 ease-out ${
            powerSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`} style={{ transitionDelay: '0.2s' }}>
            Ready to Power Your Life with Mercedes-Benz?
          </h2>
          
          <p className={`text-xl md:text-2xl text-gray-300 mb-8 font-light transition-all duration-1000 ease-out ${
            powerSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: '0.4s' }}>
            A new era of luxury, comfort, and performance is here.
          </p>
          
          <div className={`max-w-3xl mx-auto mb-12 transition-all duration-1000 ease-out ${
            powerSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: '0.6s' }}>
            <p className="text-lg text-gray-200 leading-relaxed mb-6">
              Get ready to elevate every drive with a car that blends German engineering, timeless style, and everyday practicality. Whether it's school runs, business meetings, or weekend escapes, the Mercedes-Benz C200 Estate is designed to move your life forward.
            </p>
            
            <p className="text-xl font-semibold text-white mb-8">
              One brand. One mission: to give you the prestige you've earned, and the comfort your family deserves.
            </p>
          </div>
        </div>
      </section>

      {/* Engine & Performance Specifications */}
      <section ref={engineSectionRef} className="min-h-screen py-20 bg-white overflow-hidden flex items-center">
        <div className="w-full">
          <div className="max-w-6xl mx-auto px-4 mb-12 text-center">
            <h3 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-3 transition-all duration-1000 ease-out ${
              engineSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`} style={{ transitionDelay: '0.2s' }}>Engine & Performance</h3>
            <p className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-1000 ease-out ${
              engineSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '0.3s' }}>German engineering refined for power, efficiency, and precision</p>
          </div>
          <div>
            <div className={`relative px-16 transition-all duration-1000 ease-out ${
              engineSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
            }`} style={{ transitionDelay: '0.4s' }}>
                {/* Left Navigation Button */}
                <button
                  onClick={() => {
                    setIsEngineAutoScrolling(false);
                    setEngineCardsOffset(prev => Math.min(prev + 312, 0));
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={engineCardsOffset >= 0}
                  aria-label="Previous engine specs"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                {/* Right Navigation Button */}
                <button
                  onClick={() => {
                    setIsEngineAutoScrolling(false);
                    setEngineCardsOffset(prev => prev - 312);
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={engineCardsOffset <= -2184}
                  aria-label="Next engine specs"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                <div className="overflow-hidden">
                  <div
                    className="flex gap-6 transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(${engineCardsOffset}px)` }}
                  >
                    <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 w-72 flex-shrink-0">
                      <Zap className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <h4 className="text-base font-semibold text-gray-900 mb-2">Engine</h4>
                      <p className="text-gray-700 text-sm">1.5L Turbo I4 (M264)</p>
                      <p className="text-gray-600 text-xs mt-1">48V EQ Boost Mild Hybrid</p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 w-72 flex-shrink-0">
                      <Zap className="h-6 w-6 text-red-600 mx-auto mb-2" />
                      <h4 className="text-base font-semibold text-gray-900 mb-2">Power Output</h4>
                      <p className="text-gray-700 text-sm">184 hp (135 kW)</p>
                      <p className="text-gray-600 text-xs mt-1">+ 14 hp (10 kW) electric boost</p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 w-72 flex-shrink-0">
                      <Zap className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                      <h4 className="text-base font-semibold text-gray-900 mb-2">Torque</h4>
                      <p className="text-gray-700 text-sm">280 Nm</p>
                      <p className="text-gray-600 text-xs mt-1">@ 3,000-4,100 rpm</p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 w-72 flex-shrink-0">
                      <Settings className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <h4 className="text-base font-semibold text-gray-900 mb-2">Transmission</h4>
                      <p className="text-gray-700 text-sm">9G-TRONIC 9-speed</p>
                      <p className="text-gray-600 text-xs mt-1">Rear-Wheel Drive (RWD)</p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 w-72 flex-shrink-0">
                      <Zap className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <h4 className="text-base font-semibold text-gray-900 mb-2">Acceleration</h4>
                      <p className="text-gray-700 text-sm">0-100 km/h in ~7.7s</p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 w-72 flex-shrink-0">
                      <Navigation className="h-6 w-6 text-cyan-600 mx-auto mb-2" />
                      <h4 className="text-base font-semibold text-gray-900 mb-2">Top Speed</h4>
                      <p className="text-gray-700 text-sm">~239 km/h</p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 w-72 flex-shrink-0">
                      <Sun className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                      <h4 className="text-base font-semibold text-gray-900 mb-2">Fuel Economy</h4>
                      <p className="text-gray-700 text-sm">6.0-6.5 L/100 km</p>
                      <p className="text-gray-600 text-xs mt-1">City: 7.5-8.5 | Highway: 5.0-6.0</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* Dimensions & Capacity Specifications */}
      <section ref={dimensionsSectionRef} className={`relative py-20 overflow-hidden transition-all duration-1000 ease-out ${
        dimensionsSectionInView ? 'opacity-100' : 'opacity-0'
      }`}>
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://hxu4soai4e.ufs.sh/f/Xjw32Tl2VSCyZy3l4ygcPf12FIUSlEgRpQqjYm4nV9CzO5ey)'
          }}
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/75 to-gray-50/80" />

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Dimensions & Capacity
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Spacious design crafted for comfort and versatility
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3 tracking-tight">Body Style</h4>
              <p className="text-gray-900 text-base font-semibold mb-1">Estate Wagon</p>
              <p className="text-gray-600 text-sm">S205 Series</p>
              <p className="text-blue-600 text-xs font-medium mt-2">Premium Build Quality</p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3 tracking-tight">External Dimensions</h4>
              <p className="text-gray-900 text-sm font-semibold mb-1">L: 4,702 mm × W: 1,810 mm</p>
              <p className="text-gray-900 text-sm font-semibold">H: 1,457 mm</p>
              <p className="text-green-600 text-xs font-medium mt-2">Refined Proportions</p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3 tracking-tight">Wheelbase & Weight</h4>
              <p className="text-gray-900 text-base font-semibold mb-1">2,840 mm</p>
              <p className="text-gray-600 text-sm">Extended Wheelbase</p>
              <p className="text-orange-600 text-xs font-medium mt-2">1,565 kg Kerb Weight</p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3 tracking-tight">Seating & Cargo</h4>
              <p className="text-gray-900 text-base font-semibold mb-1">5 Passengers</p>
              <p className="text-gray-600 text-sm">Full Seating</p>
              <p className="text-purple-600 text-xs font-medium mt-2">490-1,510 L Boot Space</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle Copy Section */}
      <section ref={athleticSectionRef} className="relative py-20 bg-gray-900 text-white overflow-hidden">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
            transform: `translateY(${scrollY * 0.2}px)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-black/60" />
        
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
              <h2 className={`text-3xl md:text-4xl font-bold leading-tight transition-all duration-1000 ease-out ${
                athleticSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}>
                Athletic Performance Meets Spacious Versatility
              </h2>
              <p className={`text-lg text-gray-200 leading-relaxed transition-all duration-1000 ease-out ${
                athleticSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: '0.3s' }}>
                Command the road with athletic precision, then effortlessly accommodate life's demands with generous space. The C200 Estate is engineered for both your professional drive and family getaways.
              </p>
              <button
                onClick={() => setShowContactModal(true)}
                className={`inline-flex items-center px-6 py-3 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-600 transition-all duration-1000 ease-out animate-bounce-slow ${
                  athleticSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '0.6s' }}
              >
                Reserve Your Test Drive Today
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
            <div className={`relative transition-all duration-1000 ease-out ${
              athleticSectionInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`} style={{ transitionDelay: '1s' }}>
              <div className="relative rounded-2xl shadow-2xl w-full h-96 border-4 border-white/20 overflow-hidden">
                {athleticImages.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Mercedes C200 Estate ${index + 1}`}
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                      index === currentAthleticImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ willChange: 'opacity' }}
                  />
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Review Section Title */}
      <section className="py-20 text-white relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0a2e75, #000000)' }}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-16 text-center text-white">
            Hear What People Are Saying!
          </h2>
          
          {/* Central Google Branding & Rating */}
          <div className="text-center mb-16">
            <div className="text-6xl md:text-7xl font-bold mb-8">
              <span className="text-blue-500">G</span>
              <span className="text-red-500">o</span>
              <span className="text-yellow-400">o</span>
              <span className="text-blue-500">g</span>
              <span className="text-green-500">l</span>
              <span className="text-red-500">e</span>
            </div>
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-12 w-12 text-yellow-400 fill-current mx-1" />
              ))}
            </div>
            <p className="text-2xl font-bold uppercase tracking-wider text-yellow-400">
              FIVE STAR CUSTOMER RATING
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-blue-800 bg-opacity-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
                alt="Jasveen Sehmi"
                loading="lazy"
                decoding="async"
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover border-2 border-white/20"
              />
              <p className="text-white mb-4 italic text-lg leading-relaxed">
                "Exceptional experience at Mascardi! The staff were efficient and knowledgeable, making the car buying process smooth and stress-free. Highly recommend for their outstanding service and transparency."
              </p>
              <div>
                <p className="font-semibold text-white">Jasveen Sehmi</p>
                <p className="text-sm text-blue-200">Verified Google Review</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-blue-800 bg-opacity-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
              <img
                src="https://hxu4soai4e.ufs.sh/f/Xjw32Tl2VSCyZfO4XzVgcPf12FIUSlEgRpQqjYm4nV9CzO5e"
                alt="Sam"
                loading="lazy"
                decoding="async"
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover border-2 border-white/20"
              />
              <p className="text-white mb-4 italic text-lg leading-relaxed">
                "Fantastic experience at Mascardi! Great selection of high-quality cars with quick, efficient service. Jesse and the team provided excellent customer care. Highly recommend for top-notch service!"
              </p>
              <div>
                <p className="font-semibold text-white">Sam</p>
                <p className="text-sm text-blue-200">Verified Google Review</p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-blue-800 bg-opacity-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
              <img
                src="https://hxu4soai4e.ufs.sh/f/Xjw32Tl2VSCyH6fniex48Bsix7DaCNpo0j2AyblGzvXOk3n5"
                alt="Jennifer Amolo"
                loading="lazy"
                decoding="async"
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover border-2 border-white/20"
              />
              <p className="text-white mb-4 italic text-lg leading-relaxed">
                "I am very happy with my experience with Mascardi. They really took care of me. I had so many questions which were answered effectively. I definitely recommend them for your next vehicle purchase. Great place, great team and AMAZING luxury cars. Thanks Mascardi :-)"
              </p>
              <div>
                <p className="font-semibold text-white">Jennifer Amolo</p>
                <p className="text-sm text-blue-200">Verified Google Review</p>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-blue-800 bg-opacity-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
              <img
                src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
                alt="Michael Ochieng"
                loading="lazy"
                decoding="async"
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover border-2 border-white/20"
              />
              <p className="text-white mb-4 italic text-lg leading-relaxed">
                "Outstanding service and the car exceeded all expectations. The AMG styling package really makes it stand out on Nairobi roads!"
              </p>
              <div>
                <p className="font-semibold text-white">Michael Ochieng</p>
                <p className="text-sm text-blue-200">Verified Google Review</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover the highlights of the C200 Estate.
            </h2>
          </div>

          {/* Carousel Container */}
          <div className="relative mb-16">
            <div className="flex items-center justify-center">
              {/* Previous Button */}
              <button
                onClick={prevSlide}
                className="absolute left-0 md:left-4 z-10 p-2 md:p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
                aria-label="Previous highlight"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
              </button>

              {/* Current Slide */}
              <div className="w-full max-w-5xl mx-8 md:mx-20">
                <div
                  className="rounded-2xl md:rounded-3xl p-6 md:p-12 hover:shadow-xl transition-all duration-300 relative overflow-hidden min-h-[400px] md:min-h-[500px] flex items-center"
                  style={{
                    backgroundColor: highlights[currentSlide].backgroundImage ? 'transparent' : '#f9fafb',
                    backgroundImage: highlights[currentSlide].backgroundImage ? `url(${highlights[currentSlide].backgroundImage})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    willChange: 'background-image',
                    transform: 'translateZ(0)'
                  }}
                >
                  {/* Overlay for text readability */}
                  {highlights[currentSlide].backgroundImage && (
                    <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/30 rounded-2xl md:rounded-3xl" />
                  )}

                  <div className="relative z-10 w-full">
                    <div className="flex items-start mb-5">
                      {React.createElement(highlights[currentSlide].icon, {
                        className: highlights[currentSlide].backgroundImage ? "h-8 w-8 md:h-10 md:w-10 text-cyan-400 mr-3 flex-shrink-0 mt-1" : "h-8 w-8 md:h-10 md:w-10 text-blue-600 mr-3 flex-shrink-0 mt-1"
                      })}
                      <h3 className={`text-xl md:text-3xl font-bold leading-tight text-left ${
                        highlights[currentSlide].backgroundImage ? 'text-white' : 'text-gray-900'
                      }`}>
                        {highlights[currentSlide].title}
                      </h3>
                    </div>
                    <div className="space-y-2.5 mb-5">
                      {highlights[currentSlide].features.map((feature, index) => (
                        <p key={index} className={`text-sm md:text-base leading-relaxed text-left ${highlights[currentSlide].backgroundImage ? 'text-gray-100' : 'text-gray-700'}`}>
                          • {feature}
                        </p>
                      ))}
                    </div>
                    <p className={`italic text-sm md:text-base leading-relaxed text-left ${
                      highlights[currentSlide].backgroundImage ? 'text-gray-200' : 'text-gray-600'
                    }`}>
                      "{highlights[currentSlide].quote}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="absolute right-0 md:right-4 z-10 p-2 md:p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
                aria-label="Next highlight"
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
              </button>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {highlights.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-blue-600 scale-110'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to highlight ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Assurance */}
      <section className="py-10 md:py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            Assurance
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-12">
            We ensure your peace of mind, every step of the way
          </p>

          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            <div className="bg-gray-800 rounded-2xl p-6 md:p-8 hover:bg-gray-700 transition-all duration-300">
              <Star className="h-10 md:h-12 w-10 md:w-12 text-yellow-400 mx-auto mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-bold mb-2">Best Price Guarantee</h3>
              <p className="text-sm md:text-base text-gray-300">We guarantee you the best deal in Kenya</p>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6 md:p-8 hover:bg-gray-700 transition-all duration-300">
              <Award className="h-10 md:h-12 w-10 md:w-12 text-green-400 mx-auto mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-bold mb-2">Flexible Trade-In</h3>
              <p className="text-sm md:text-base text-gray-300">Upgrade your vehicle anytime with confidence</p>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6 md:p-8 hover:bg-gray-700 transition-all duration-300">
              <Lock className="h-10 md:h-12 w-10 md:w-12 text-blue-400 mx-auto mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-bold mb-2">Authorized Service</h3>
              <p className="text-sm md:text-base text-gray-300">Benefit from professional Mercedes after-sales care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Only One C200 Estate */}
      <section
        ref={finalSectionRef}
        className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{
            backgroundImage: 'url(https://hxu4soai4e.ufs.sh/f/Xjw32Tl2VSCyXzEwA1l2VSCy4P90htrQx5LbWRoNMdvYIOJK)'
          }}
        />

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
            Only One C200 Estate.
          </h2>

          <p className="text-xl sm:text-2xl md:text-3xl text-gray-200 mb-12 font-light">
            When it's gone, it's gone.
          </p>

          <button
            onClick={() => setShowContactModal(true)}
            className="inline-flex items-center px-5 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-sm uppercase tracking-wide"
          >
            <CircleDot className="mr-2 h-5 w-5 text-cyan-500" style={{ fill: 'currentColor', stroke: 'black', strokeWidth: 2 }} />
            Schedule a Drive Today
          </button>
        </div>

        {/* Google Map - Lower Left Corner */}
        <a
          href="https://maps.app.goo.gl/p68Vwajdv1MUhe4t7"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20 rounded-lg overflow-hidden shadow-2xl border-2 border-cyan-400/60 hover:scale-110 hover:border-cyan-400 transition-all duration-300 block group"
        >
          <div className="relative">
            <img
              src="https://hxu4soai4e.ufs.sh/f/Xjw32Tl2VSCycW0jPdVcF9xWCLpR3NATGKZY6OksI4qharBM"
              alt="Map to showroom"
              width="140"
              height="105"
              loading="lazy"
              decoding="async"
              className="object-cover"
              style={{ border: 0 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <Navigation className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-white font-semibold text-xs leading-tight">Visit Showroom</p>
                    <p className="text-gray-300 text-[10px] leading-tight">291 Kabete Ln</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-cyan-400 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
            <div className="absolute top-1.5 right-1.5 bg-cyan-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded shadow-lg pointer-events-none animate-pulse">
              DIRECTIONS
            </div>
          </div>
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Mascardi: Nairobi's Premium Car Dealership
          </p>
        </div>
      </footer>

      {/* Contact Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        formData={formData}
        handleInputChange={handleInputChange}
        handleWhatsAppSubmit={handleWhatsAppSubmit}
      />

      {/* WhatsApp Chat Widget */}
      {showWhatsAppWidget && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setShowContactModal(true)}
            className="group bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
            aria-label="Contact us on WhatsApp"
          >
            <MessageCircle className="h-7 w-7" />
            <span className="absolute right-full mr-3 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Drive Today
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;