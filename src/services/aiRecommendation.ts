// Rule-Based AI Recommendation Engine for Tamil Nadu Tourism
// This is a simplified, rule-based system suitable for demo purposes

import { destinations, Destination, CrowdLevel, PlaceType, TimeSlot } from '../data/destinations';

export interface TripPreferences {
  startDate: Date;
  endDate: Date;
  interests: PlaceType[];
  budget: 'low' | 'medium' | 'high';
  crowdPreference: 'avoid' | 'normal';
  travelStyle: 'relaxed' | 'packed';
}

export interface ItineraryItem {
  destination: Destination;
  day: number;
  timeSlot: TimeSlot;
  estimatedCrowd: CrowdLevel;
  travelTimeFromPrevious?: number; // in minutes
  tips: string[];
}

export interface GeneratedItinerary {
  items: ItineraryItem[];
  totalDays: number;
  totalBudget: number;
  weatherAdvisory?: string;
  crowdAdvisory?: string;
}

// Rule: Calculate crowd level based on day, time, and base crowd
export const calculateCrowdLevel = (
  destination: Destination,
  date: Date,
  timeSlot: TimeSlot
): CrowdLevel => {
  const dayOfWeek = date.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const month = date.getMonth();
  
  // Festival check (simplified)
  const dateStr = date.toISOString().split('T')[0];
  const isFestival = destination.festivalDates?.includes(dateStr);
  
  // Temple crowd rules
  if (destination.type === 'temple') {
    // Rule: Temples are crowded on weekends and festivals
    if (isFestival) return 'HIGH';
    if (isWeekend && timeSlot === 'morning') return 'HIGH';
    if (isWeekend) return 'MEDIUM';
    if (timeSlot === 'morning') return 'MEDIUM';
  }
  
  // Beach crowd rules
  if (destination.type === 'beach') {
    // Rule: Beaches are crowded in evenings and weekends
    if (isWeekend && timeSlot === 'evening') return 'HIGH';
    if (timeSlot === 'evening') return 'MEDIUM';
  }
  
  // Hill station crowd rules
  if (destination.type === 'hill_station') {
    // Rule: Hill stations are crowded in summer and on weekends
    const isSummer = month >= 3 && month <= 5;
    if (isSummer && isWeekend) return 'HIGH';
    if (isSummer || isWeekend) return 'MEDIUM';
  }
  
  // Nature/Wildlife crowd rules
  if (destination.type === 'nature') {
    // Rule: Wildlife parks have low crowd on weekdays
    if (!isWeekend) return 'LOW';
  }
  
  // Default: use base crowd level
  return destination.baseCrowdLevel;
};

// Rule: Filter destinations based on weather conditions
export const filterByWeather = (
  destination: Destination,
  weather: { isRaining: boolean; temperature: number }
): boolean => {
  if (weather.isRaining && !destination.isIndoor) {
    // Rule: Suggest indoor places during rain
    return false;
  }
  
  if (weather.temperature > 35 && !destination.isIndoor) {
    // Rule: Avoid outdoor places in extreme heat
    return destination.type === 'hill_station' || destination.type === 'nature';
  }
  
  return true;
};

// Rule: Score destination based on preferences
const scoreDestination = (
  destination: Destination,
  preferences: TripPreferences,
  date: Date
): number => {
  let score = 0;
  
  // Interest match (highest weight)
  if (preferences.interests.includes(destination.type)) {
    score += 50;
  }
  
  // Crowd preference
  const expectedCrowd = calculateCrowdLevel(destination, date, 'morning');
  if (preferences.crowdPreference === 'avoid') {
    if (expectedCrowd === 'LOW') score += 30;
    else if (expectedCrowd === 'MEDIUM') score += 15;
    else score -= 10;
  }
  
  // Budget consideration
  if (preferences.budget === 'low' && destination.entryFee <= 50) {
    score += 20;
  } else if (preferences.budget === 'medium' && destination.entryFee <= 150) {
    score += 15;
  } else if (preferences.budget === 'high') {
    score += 10;
  }
  
  // Rating bonus
  score += destination.rating * 5;
  
  // Season match bonus
  const month = date.getMonth();
  const currentSeason = month >= 6 && month <= 9 ? 'monsoon' : 
                       month >= 10 || month <= 1 ? 'winter' : 'summer';
  if (destination.bestSeason === currentSeason || destination.bestSeason === 'all') {
    score += 15;
  }
  
  return score;
};

// Rule: Generate optimal time slot for a destination
const getOptimalTimeSlot = (
  destination: Destination,
  preferences: TripPreferences,
  date: Date
): TimeSlot => {
  const timeSlots: TimeSlot[] = ['morning', 'afternoon', 'evening'];
  
  if (preferences.crowdPreference === 'avoid') {
    // Find least crowded time
    const crowdBySlot = timeSlots.map(slot => ({
      slot,
      crowd: calculateCrowdLevel(destination, date, slot)
    }));
    
    const lowCrowd = crowdBySlot.find(c => c.crowd === 'LOW');
    if (lowCrowd) return lowCrowd.slot;
    
    const medCrowd = crowdBySlot.find(c => c.crowd === 'MEDIUM');
    if (medCrowd) return medCrowd.slot;
  }
  
  // Default to popular time slots
  return destination.popularTimeSlots[0] || 'morning';
};

// Generate tips based on destination and conditions
const generateTips = (
  destination: Destination,
  crowd: CrowdLevel,
  timeSlot: TimeSlot
): string[] => {
  const tips: string[] = [];
  
  if (destination.type === 'temple') {
    tips.push('Dress modestly - cover shoulders and knees');
    tips.push('Remove footwear before entering');
    if (crowd === 'HIGH') {
      tips.push('Expect 30-60 min queue time');
    }
  }
  
  if (destination.type === 'beach') {
    if (timeSlot === 'afternoon') {
      tips.push('Carry sunscreen and stay hydrated');
    }
    tips.push('Swimming advisories may apply - check with lifeguards');
  }
  
  if (destination.type === 'hill_station' || destination.type === 'nature') {
    tips.push('Carry light jacket - temperatures drop in evenings');
    tips.push('Book accommodation in advance during peak season');
  }
  
  if (crowd === 'LOW') {
    tips.push('Great time to visit! Expect minimal queues');
  }
  
  return tips;
};

// Main AI function: Generate personalized itinerary
export const generateItinerary = (
  preferences: TripPreferences,
  weatherData?: { isRaining: boolean; temperature: number }
): GeneratedItinerary => {
  const startDate = new Date(preferences.startDate);
  const endDate = new Date(preferences.endDate);
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  // Filter and score destinations
  let eligibleDestinations = [...destinations];
  
  // Apply weather filter if available
  if (weatherData) {
    eligibleDestinations = eligibleDestinations.filter(d => 
      filterByWeather(d, weatherData)
    );
  }
  
  // Score destinations for the trip
  const scoredDestinations = eligibleDestinations.map(dest => ({
    destination: dest,
    score: scoreDestination(dest, preferences, startDate)
  })).sort((a, b) => b.score - a.score);
  
  // Calculate places per day based on travel style
  const placesPerDay = preferences.travelStyle === 'relaxed' ? 2 : 3;
  const totalPlaces = Math.min(totalDays * placesPerDay, scoredDestinations.length);
  
  // Generate itinerary items
  const items: ItineraryItem[] = [];
  const selectedDestinations = scoredDestinations.slice(0, totalPlaces);
  
  let currentDay = 1;
  const timeSlotOrder: TimeSlot[] = ['morning', 'afternoon', 'evening'];
  let slotIndex = 0;
  
  for (const { destination } of selectedDestinations) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + currentDay - 1);
    
    const timeSlot = preferences.crowdPreference === 'avoid' 
      ? getOptimalTimeSlot(destination, preferences, currentDate)
      : timeSlotOrder[slotIndex % 3];
    
    const crowd = calculateCrowdLevel(destination, currentDate, timeSlot);
    
    items.push({
      destination,
      day: currentDay,
      timeSlot,
      estimatedCrowd: crowd,
      travelTimeFromPrevious: items.length > 0 ? Math.floor(Math.random() * 60) + 30 : undefined,
      tips: generateTips(destination, crowd, timeSlot)
    });
    
    slotIndex++;
    if (slotIndex % placesPerDay === 0) {
      currentDay++;
    }
  }
  
  // Calculate total budget (entry fees + estimated expenses)
  const totalEntryFees = items.reduce((sum, item) => sum + item.destination.entryFee, 0);
  const dailyExpenses = preferences.budget === 'low' ? 1000 : 
                        preferences.budget === 'medium' ? 2500 : 5000;
  const totalBudget = totalEntryFees + (dailyExpenses * totalDays);
  
  // Generate advisories
  let crowdAdvisory: string | undefined;
  const highCrowdDays = items.filter(i => i.estimatedCrowd === 'HIGH').length;
  if (highCrowdDays > totalDays / 2) {
    crowdAdvisory = 'Several destinations may be crowded during your visit. Consider adjusting timing or visiting alternative spots.';
  }
  
  let weatherAdvisory: string | undefined;
  if (weatherData?.isRaining) {
    weatherAdvisory = 'Rain expected. Indoor attractions have been prioritized. Carry umbrellas.';
  }
  
  return {
    items,
    totalDays,
    totalBudget,
    weatherAdvisory,
    crowdAdvisory
  };
};

// Quick recommendation for single destination
export const getQuickRecommendations = (
  interest: PlaceType,
  crowdPreference: 'avoid' | 'normal' = 'normal',
  limit: number = 5
): Destination[] => {
  const today = new Date();
  
  return destinations
    .filter(d => d.type === interest)
    .map(dest => ({
      dest,
      crowd: calculateCrowdLevel(dest, today, 'morning'),
      score: dest.rating
    }))
    .filter(item => crowdPreference === 'avoid' ? item.crowd !== 'HIGH' : true)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.dest);
};
