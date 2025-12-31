import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { en: 'Home', ta: 'முகப்பு' },
  'nav.planner': { en: 'Trip Planner', ta: 'பயண திட்டமிடல்' },
  'nav.destinations': { en: 'Destinations', ta: 'இடங்கள்' },
  'nav.booking': { en: 'Booking', ta: 'முன்பதிவு' },
  'nav.dashboard': { en: 'Dashboard', ta: 'டாஷ்போர்டு' },
  
  // Hero
  'hero.title': { en: 'Discover Tamil Nadu', ta: 'தமிழ்நாட்டை கண்டறியுங்கள்' },
  'hero.subtitle': { en: 'AI-Powered Smart Tourism Platform', ta: 'செயற்கை நுண்ணறிவு சுற்றுலா தளம்' },
  'hero.description': { en: 'Experience the land of temples, heritage, and vibrant culture with intelligent trip planning', ta: 'கோயில்கள், பாரம்பரியம், கலாச்சாரம் நிறைந்த நிலத்தை அனுபவியுங்கள்' },
  'hero.cta': { en: 'Plan Your Trip', ta: 'பயணத்தை திட்டமிடுங்கள்' },
  'hero.explore': { en: 'Explore Destinations', ta: 'இடங்களை ஆராயுங்கள்' },
  
  // Trip Planner
  'planner.title': { en: 'AI Trip Planner', ta: 'AI பயண திட்டமிடல்' },
  'planner.subtitle': { en: 'Let our smart system create your perfect Tamil Nadu itinerary', ta: 'சரியான பயணத்திட்டத்தை உருவாக்குங்கள்' },
  'planner.dates': { en: 'Travel Dates', ta: 'பயண தேதிகள்' },
  'planner.interests': { en: 'Your Interests', ta: 'உங்கள் ஆர்வங்கள்' },
  'planner.budget': { en: 'Budget Range', ta: 'பட்ஜெட்' },
  'planner.crowd': { en: 'Crowd Preference', ta: 'கூட்ட விருப்பம்' },
  'planner.generate': { en: 'Generate Itinerary', ta: 'திட்டத்தை உருவாக்கு' },
  'planner.avoidCrowd': { en: 'Avoid Crowds', ta: 'கூட்டத்தை தவிர்' },
  'planner.normalCrowd': { en: 'Normal', ta: 'சாதாரண' },
  
  // Budget
  'budget.low': { en: 'Budget (₹)', ta: 'சிக்கனம் (₹)' },
  'budget.medium': { en: 'Comfort (₹₹)', ta: 'வசதி (₹₹)' },
  'budget.high': { en: 'Luxury (₹₹₹)', ta: 'ஆடம்பரம் (₹₹₹)' },
  
  // Destinations
  'dest.temples': { en: 'Temples', ta: 'கோயில்கள்' },
  'dest.heritage': { en: 'Heritage', ta: 'பாரம்பரியம்' },
  'dest.nature': { en: 'Nature', ta: 'இயற்கை' },
  'dest.beaches': { en: 'Beaches', ta: 'கடற்கரைகள்' },
  'dest.hills': { en: 'Hill Stations', ta: 'மலை நிலையங்கள்' },
  'dest.food': { en: 'Food', ta: 'உணவு' },
  
  // Crowd levels
  'crowd.low': { en: 'Low Crowd', ta: 'குறைந்த கூட்டம்' },
  'crowd.medium': { en: 'Moderate', ta: 'மிதமான' },
  'crowd.high': { en: 'High Crowd', ta: 'அதிக கூட்டம்' },
  
  // Booking
  'booking.title': { en: 'Smart Entry Booking', ta: 'நுழைவு முன்பதிவு' },
  'booking.selectSlot': { en: 'Select Time Slot', ta: 'நேர இடைவெளியை தேர்ந்தெடு' },
  'booking.morning': { en: 'Morning (6AM-12PM)', ta: 'காலை (6AM-12PM)' },
  'booking.afternoon': { en: 'Afternoon (12PM-4PM)', ta: 'மதியம் (12PM-4PM)' },
  'booking.evening': { en: 'Evening (4PM-8PM)', ta: 'மாலை (4PM-8PM)' },
  'booking.confirm': { en: 'Confirm Booking', ta: 'முன்பதிவை உறுதிப்படுத்து' },
  'booking.success': { en: 'Booking Confirmed!', ta: 'முன்பதிவு உறுதியானது!' },
  'booking.qr': { en: 'Your Entry QR Code', ta: 'உங்கள் நுழைவு QR குறியீடு' },
  
  // Dashboard
  'dashboard.title': { en: 'Tourism Analytics Dashboard', ta: 'சுற்றுலா பகுப்பாய்வு' },
  'dashboard.visitors': { en: 'Total Visitors', ta: 'மொத்த பார்வையாளர்கள்' },
  'dashboard.bookings': { en: 'Bookings Today', ta: 'இன்றைய முன்பதிவுகள்' },
  'dashboard.revenue': { en: 'Revenue', ta: 'வருவாய்' },
  'dashboard.popular': { en: 'Popular Destinations', ta: 'பிரபலமான இடங்கள்' },
  
  // General
  'general.loading': { en: 'Loading...', ta: 'ஏற்றுகிறது...' },
  'general.error': { en: 'Something went wrong', ta: 'பிழை ஏற்பட்டது' },
  'general.viewMore': { en: 'View More', ta: 'மேலும் காண' },
  'general.bookNow': { en: 'Book Now', ta: 'இப்போது முன்பதிவு' },
  'general.learnMore': { en: 'Learn More', ta: 'மேலும் அறிய' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
