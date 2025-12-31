// Tamil Nadu Destinations Database
// This serves as our mock database for the demo

export type CrowdLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type PlaceType = 'temple' | 'heritage' | 'nature' | 'beach' | 'hill_station' | 'food';
export type BestSeason = 'summer' | 'monsoon' | 'winter' | 'all';
export type TimeSlot = 'morning' | 'afternoon' | 'evening';

export interface Destination {
  id: string;
  name: string;
  nameTamil: string;
  type: PlaceType;
  district: string;
  description: string;
  descriptionTamil: string;
  image: string;
  baseCrowdLevel: CrowdLevel;
  isIndoor: boolean;
  bestSeason: BestSeason;
  entryFee: number;
  rating: number;
  visitDuration: number; // in hours
  coordinates: { lat: number; lng: number };
  timings: { open: string; close: string };
  popularTimeSlots: TimeSlot[];
  festivalDates?: string[]; // Dates when crowd is exceptionally high
  amenities: string[];
}

export const destinations: Destination[] = [
  {
    id: 'meenakshi-temple',
    name: 'Meenakshi Amman Temple',
    nameTamil: 'மீனாட்சி அம்மன் கோயில்',
    type: 'temple',
    district: 'Madurai',
    description: 'An ancient and iconic Dravidian temple dedicated to Goddess Meenakshi and Lord Sundareswarar. Known for its stunning gopurams with thousands of colorful sculptures.',
    descriptionTamil: 'மீனாட்சி அம்மனுக்கும் சுந்தரேஸ்வரருக்கும் அர்ப்பணிக்கப்பட்ட பழமையான திராவிட கோயில். ஆயிரக்கணக்கான வண்ணமயமான சிற்பங்களைக் கொண்ட கோபுரங்களுக்கு பிரசித்தம்.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
    baseCrowdLevel: 'HIGH',
    isIndoor: true,
    bestSeason: 'all',
    entryFee: 0,
    rating: 4.8,
    visitDuration: 3,
    coordinates: { lat: 9.9195, lng: 78.1193 },
    timings: { open: '05:00', close: '21:30' },
    popularTimeSlots: ['morning', 'evening'],
    festivalDates: ['2024-04-14', '2024-04-15'], // Chithirai Festival
    amenities: ['Parking', 'Shoe Storage', 'Guide Available', 'Wheelchair Access'],
  },
  {
    id: 'brihadeeswarar-temple',
    name: 'Brihadeeswarar Temple',
    nameTamil: 'பிரகதீஸ்வரர் கோயில்',
    type: 'temple',
    district: 'Thanjavur',
    description: 'A UNESCO World Heritage Site and one of the largest South Indian temples. Built by Raja Raja Chola I, it showcases remarkable Chola architecture.',
    descriptionTamil: 'யுனெஸ்கோ உலக பாரம்பரிய தளமும் தென்னிந்தியாவின் மிகப்பெரிய கோயில்களில் ஒன்றும். ராஜராஜ சோழன் கட்டிய அற்புதமான சோழ கட்டிடக்கலை.',
    image: 'https://images.unsplash.com/photo-1621427637225-56e774f24e0c?w=800',
    baseCrowdLevel: 'MEDIUM',
    isIndoor: false,
    bestSeason: 'winter',
    entryFee: 0,
    rating: 4.9,
    visitDuration: 2.5,
    coordinates: { lat: 10.7825, lng: 79.1314 },
    timings: { open: '06:00', close: '20:30' },
    popularTimeSlots: ['morning', 'afternoon'],
    amenities: ['Parking', 'Museum', 'Guide Available', 'Photography Allowed'],
  },
  {
    id: 'mahabalipuram',
    name: 'Mahabalipuram Shore Temple',
    nameTamil: 'மாமல்லபுரம் கடற்கரை கோயில்',
    type: 'heritage',
    district: 'Chengalpattu',
    description: 'A UNESCO World Heritage Site featuring stunning rock-cut temples and sculptures from the Pallava dynasty, overlooking the Bay of Bengal.',
    descriptionTamil: 'வங்காள விரிகுடாவை நோக்கி அமைந்த பல்லவ வம்சத்தின் பாறை வெட்டு கோயில்களும் சிற்பங்களும் கொண்ட யுனெஸ்கோ தளம்.',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800',
    baseCrowdLevel: 'MEDIUM',
    isIndoor: false,
    bestSeason: 'winter',
    entryFee: 40,
    rating: 4.7,
    visitDuration: 3,
    coordinates: { lat: 12.6172, lng: 80.1993 },
    timings: { open: '06:00', close: '18:00' },
    popularTimeSlots: ['morning', 'afternoon'],
    amenities: ['Parking', 'Beach Access', 'Restaurants Nearby', 'Guide Available'],
  },
  {
    id: 'ooty',
    name: 'Ooty Botanical Gardens',
    nameTamil: 'ஊட்டி தாவரவியல் பூங்கா',
    type: 'hill_station',
    district: 'Nilgiris',
    description: 'A sprawling 55-acre garden in the Queen of Hill Stations, featuring rare plants, a fossil tree, and stunning Nilgiri mountain views.',
    descriptionTamil: '55 ஏக்கர் பரப்பளவில் அரிய தாவரங்கள், படிம மரம், நீலகிரி மலைக் காட்சிகள் கொண்ட அழகிய பூங்கா.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    baseCrowdLevel: 'MEDIUM',
    isIndoor: false,
    bestSeason: 'summer',
    entryFee: 50,
    rating: 4.5,
    visitDuration: 2,
    coordinates: { lat: 11.4118, lng: 76.6956 },
    timings: { open: '07:00', close: '18:30' },
    popularTimeSlots: ['morning', 'afternoon'],
    amenities: ['Parking', 'Cafeteria', 'Toy Train Nearby', 'Photography Allowed'],
  },
  {
    id: 'kodaikanal',
    name: 'Kodaikanal Lake',
    nameTamil: 'கொடைக்கானல் ஏரி',
    type: 'hill_station',
    district: 'Dindigul',
    description: 'A star-shaped man-made lake surrounded by lush forests, offering boating, cycling, and stunning sunset views.',
    descriptionTamil: 'நட்சத்திர வடிவ செயற்கை ஏரி, படகு சவாரி, சைக்கிளிங், அழகான சூரிய அஸ்தமன காட்சிகள்.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
    baseCrowdLevel: 'MEDIUM',
    isIndoor: false,
    bestSeason: 'summer',
    entryFee: 0,
    rating: 4.6,
    visitDuration: 2.5,
    coordinates: { lat: 10.2381, lng: 77.4892 },
    timings: { open: '06:00', close: '17:30' },
    popularTimeSlots: ['morning', 'afternoon'],
    amenities: ['Boating', 'Cycling', 'Restaurants', 'Photography Allowed'],
  },
  {
    id: 'rameswaram',
    name: 'Ramanathaswamy Temple',
    nameTamil: 'ராமநாதசுவாமி கோயில்',
    type: 'temple',
    district: 'Ramanathapuram',
    description: 'One of the twelve Jyotirlingas, famous for its longest corridor among Hindu temples with magnificently carved pillars.',
    descriptionTamil: 'பன்னிரண்டு ஜோதிர்லிங்கங்களில் ஒன்று, இந்து கோயில்களில் மிக நீளமான தூண்களால் அலங்கரிக்கப்பட்ட நடைபாதை.',
    image: 'https://images.unsplash.com/photo-1591620774488-720e2f13e5e8?w=800',
    baseCrowdLevel: 'HIGH',
    isIndoor: true,
    bestSeason: 'winter',
    entryFee: 0,
    rating: 4.8,
    visitDuration: 3,
    coordinates: { lat: 9.2885, lng: 79.3129 },
    timings: { open: '05:00', close: '21:00' },
    popularTimeSlots: ['morning', 'evening'],
    amenities: ['Parking', 'Dharamshala', 'Prasadam', 'Guide Available'],
  },
  {
    id: 'marina-beach',
    name: 'Marina Beach',
    nameTamil: 'மெரினா கடற்கரை',
    type: 'beach',
    district: 'Chennai',
    description: 'The longest natural urban beach in India and second longest in the world. A iconic Chennai landmark with stunning sunrise views.',
    descriptionTamil: 'இந்தியாவின் மிக நீளமான நகர்ப்புற கடற்கரை. அற்புதமான சூரிய உதய காட்சிகள் கொண்ட சென்னையின் அடையாளம்.',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800',
    baseCrowdLevel: 'HIGH',
    isIndoor: false,
    bestSeason: 'winter',
    entryFee: 0,
    rating: 4.4,
    visitDuration: 2,
    coordinates: { lat: 13.0500, lng: 80.2824 },
    timings: { open: '00:00', close: '23:59' },
    popularTimeSlots: ['morning', 'evening'],
    amenities: ['Parking', 'Street Food', 'Aquarium Nearby', 'Lighthouse'],
  },
  {
    id: 'kanyakumari',
    name: 'Kanyakumari',
    nameTamil: 'கன்னியாகுமரி',
    type: 'beach',
    district: 'Kanyakumari',
    description: 'The southernmost tip of India where three seas meet. Famous for spectacular sunrise and sunset views at the same spot.',
    descriptionTamil: 'இந்தியாவின் தென்கோடி முனை, மூன்று கடல்கள் சந்திக்கும் இடம். ஒரே இடத்தில் சூரிய உதயமும் அஸ்தமனமும் காணலாம்.',
    image: 'https://images.unsplash.com/photo-1580892375929-4c42d685e876?w=800',
    baseCrowdLevel: 'MEDIUM',
    isIndoor: false,
    bestSeason: 'winter',
    entryFee: 0,
    rating: 4.7,
    visitDuration: 4,
    coordinates: { lat: 8.0883, lng: 77.5385 },
    timings: { open: '00:00', close: '23:59' },
    popularTimeSlots: ['morning', 'evening'],
    amenities: ['Vivekananda Memorial', 'Thiruvalluvar Statue', 'Ferries', 'Hotels'],
  },
  {
    id: 'chettinad',
    name: 'Chettinad Palace',
    nameTamil: 'செட்டிநாடு அரண்மனை',
    type: 'heritage',
    district: 'Sivaganga',
    description: 'Magnificent mansions showcasing unique Chettinad architecture with intricate carvings, antique collections, and cultural heritage.',
    descriptionTamil: 'நுட்பமான சிற்பங்கள், பழங்கால சேகரிப்புகள், கலாச்சார பாரம்பரியம் கொண்ட செட்டிநாடு கட்டிடக்கலை.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    baseCrowdLevel: 'LOW',
    isIndoor: true,
    bestSeason: 'all',
    entryFee: 100,
    rating: 4.5,
    visitDuration: 2,
    coordinates: { lat: 10.0710, lng: 78.7970 },
    timings: { open: '09:00', close: '17:00' },
    popularTimeSlots: ['morning', 'afternoon'],
    amenities: ['Guided Tours', 'Museum', 'Traditional Cuisine', 'Photography'],
  },
  {
    id: 'yelagiri',
    name: 'Yelagiri Hills',
    nameTamil: 'ஏலகிரி மலை',
    type: 'nature',
    district: 'Tirupattur',
    description: 'A tranquil hill station with serene lakes, rose gardens, and adventure activities like paragliding and trekking.',
    descriptionTamil: 'அமைதியான ஏரிகள், ரோஜா தோட்டங்கள், பாரகிளைடிங், மலையேற்றம் போன்ற சாகச செயல்பாடுகள்.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
    baseCrowdLevel: 'LOW',
    isIndoor: false,
    bestSeason: 'all',
    entryFee: 0,
    rating: 4.3,
    visitDuration: 5,
    coordinates: { lat: 12.5812, lng: 78.6382 },
    timings: { open: '00:00', close: '23:59' },
    popularTimeSlots: ['morning', 'afternoon'],
    amenities: ['Paragliding', 'Boating', 'Trekking', 'Resorts'],
  },
  {
    id: 'mudumalai',
    name: 'Mudumalai National Park',
    nameTamil: 'முதுமலை தேசிய பூங்கா',
    type: 'nature',
    district: 'Nilgiris',
    description: 'A tiger reserve and wildlife sanctuary home to elephants, tigers, leopards, and diverse bird species in the Nilgiri Biosphere.',
    descriptionTamil: 'புலிகள் சரணாலயம், யானைகள், சிறுத்தைகள், பல்வேறு பறவை இனங்கள் வாழும் நீலகிரி உயிர்க்கோளம்.',
    image: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=800',
    baseCrowdLevel: 'LOW',
    isIndoor: false,
    bestSeason: 'winter',
    entryFee: 150,
    rating: 4.6,
    visitDuration: 4,
    coordinates: { lat: 11.5692, lng: 76.5556 },
    timings: { open: '06:00', close: '18:00' },
    popularTimeSlots: ['morning', 'afternoon'],
    amenities: ['Safari', 'Elephant Camp', 'Nature Trails', 'Accommodation'],
  },
  {
    id: 'saravana-bhavan',
    name: 'Saravana Bhavan - Original',
    nameTamil: 'சரவணா பவன்',
    type: 'food',
    district: 'Chennai',
    description: 'The birthplace of the world-famous vegetarian restaurant chain. Experience authentic South Indian cuisine at its origin.',
    descriptionTamil: 'உலகப் புகழ்பெற்ற சைவ உணவக சங்கிலியின் பிறப்பிடம். அசல் தென்னிந்திய உணவு அனுபவம்.',
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=800',
    baseCrowdLevel: 'MEDIUM',
    isIndoor: true,
    bestSeason: 'all',
    entryFee: 0,
    rating: 4.4,
    visitDuration: 1.5,
    coordinates: { lat: 13.0569, lng: 80.2425 },
    timings: { open: '07:00', close: '22:00' },
    popularTimeSlots: ['morning', 'afternoon', 'evening'],
    amenities: ['AC Dining', 'Takeaway', 'Parking', 'Vegetarian'],
  },
];

// Helper function to get destinations by type
export const getDestinationsByType = (type: PlaceType): Destination[] => {
  return destinations.filter(d => d.type === type);
};

// Helper function to get destinations by district
export const getDestinationsByDistrict = (district: string): Destination[] => {
  return destinations.filter(d => d.district.toLowerCase() === district.toLowerCase());
};

// Get all unique districts
export const getDistricts = (): string[] => {
  return [...new Set(destinations.map(d => d.district))];
};

// Get all place types with labels
export const placeTypes: { value: PlaceType; label: string; labelTamil: string; icon: string }[] = [
  { value: 'temple', label: 'Temples', labelTamil: 'கோயில்கள்', icon: '🛕' },
  { value: 'heritage', label: 'Heritage Sites', labelTamil: 'பாரம்பரிய தளங்கள்', icon: '🏛️' },
  { value: 'nature', label: 'Nature & Wildlife', labelTamil: 'இயற்கை & வனவிலங்கு', icon: '🌿' },
  { value: 'beach', label: 'Beaches', labelTamil: 'கடற்கரைகள்', icon: '🏖️' },
  { value: 'hill_station', label: 'Hill Stations', labelTamil: 'மலைவாசஸ்தலங்கள்', icon: '⛰️' },
  { value: 'food', label: 'Food & Cuisine', labelTamil: 'உணவு', icon: '🍛' },
];
