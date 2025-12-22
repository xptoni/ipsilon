// Mock data for Ipsilon Transport Marketplace

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  userType: 'shipper' | 'carrier';
  createdAt: string;
}

export interface CarrierProfile {
  userId: string;
  vehicleType: 'car_transporter' | 'flatbed' | 'enclosed' | 'van' | 'truck';
  vehicleRegistration: string;
  routes: string[];
  rating: number;
  completedJobs: number;
}

export interface Listing {
  id: string;
  shipperId: string;
  shipperName: string;
  origin: string;
  destination: string;
  cargoType: 'car' | 'van' | 'truck' | 'other';
  dimensions: string;
  weight: string;
  pickupDate: string;
  notes: string;
  status: 'active' | 'booked' | 'in_transit' | 'completed';
  createdAt: string;
  quotesCount: number;
}

export interface Quote {
  id: string;
  listingId: string;
  carrierId: string;
  carrierName: string;
  carrierRating: number;
  vehicleType: string;
  price: number;
  currency: string;
  notes: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  listingId: string;
  content: string;
  createdAt: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'shipper-1',
    email: 'marko@example.com',
    firstName: 'Marko',
    lastName: 'Petrović',
    phone: '+381 64 123 4567',
    userType: 'shipper',
    createdAt: '2024-01-15',
  },
  {
    id: 'carrier-1',
    email: 'nikola@transport.rs',
    firstName: 'Nikola',
    lastName: 'Jovanović',
    phone: '+381 63 987 6543',
    userType: 'carrier',
    createdAt: '2024-01-10',
  },
];

// Mock Carrier Profiles
export const mockCarrierProfiles: CarrierProfile[] = [
  {
    userId: 'carrier-1',
    vehicleType: 'car_transporter',
    vehicleRegistration: 'BG 123-AB',
    routes: ['Belgrade - Munich', 'Belgrade - Vienna', 'Skopje - Belgrade'],
    rating: 4.8,
    completedJobs: 156,
  },
  {
    userId: 'carrier-2',
    vehicleType: 'enclosed',
    vehicleRegistration: 'ZG 456-CD',
    routes: ['Zagreb - Stuttgart', 'Ljubljana - Munich'],
    rating: 4.5,
    completedJobs: 89,
  },
  {
    userId: 'carrier-3',
    vehicleType: 'flatbed',
    vehicleRegistration: 'SA 789-EF',
    routes: ['Sarajevo - Vienna', 'Sarajevo - Zagreb'],
    rating: 4.9,
    completedJobs: 234,
  },
];

// Mock Listings
export const mockListings: Listing[] = [
  {
    id: 'listing-1',
    shipperId: 'shipper-1',
    shipperName: 'Marko P.',
    origin: 'Belgrade, Serbia',
    destination: 'Munich, Germany',
    cargoType: 'car',
    dimensions: 'Standard sedan (4.5m x 1.8m)',
    weight: '1,500 kg',
    pickupDate: '2024-12-28',
    notes: 'BMW 320d, needs to be transported in enclosed trailer. No scratches acceptable.',
    status: 'active',
    createdAt: '2024-12-20',
    quotesCount: 3,
  },
  {
    id: 'listing-2',
    shipperId: 'shipper-1',
    shipperName: 'Marko P.',
    origin: 'Skopje, North Macedonia',
    destination: 'Vienna, Austria',
    cargoType: 'van',
    dimensions: 'Large van (5.5m x 2.1m)',
    weight: '2,800 kg',
    pickupDate: '2024-12-30',
    notes: 'Mercedes Sprinter, running condition. Keys will be provided at pickup.',
    status: 'active',
    createdAt: '2024-12-19',
    quotesCount: 2,
  },
  {
    id: 'listing-3',
    shipperId: 'shipper-2',
    shipperName: 'Ana M.',
    origin: 'Zagreb, Croatia',
    destination: 'Frankfurt, Germany',
    cargoType: 'car',
    dimensions: 'Compact (4.0m x 1.7m)',
    weight: '1,200 kg',
    pickupDate: '2025-01-05',
    notes: 'VW Golf 7, small dent on rear bumper already present.',
    status: 'active',
    createdAt: '2024-12-21',
    quotesCount: 5,
  },
  {
    id: 'listing-4',
    shipperId: 'shipper-1',
    shipperName: 'Marko P.',
    origin: 'Belgrade, Serbia',
    destination: 'Stuttgart, Germany',
    cargoType: 'car',
    dimensions: 'SUV (4.8m x 2.0m)',
    weight: '2,100 kg',
    pickupDate: '2024-12-15',
    notes: 'Audi Q5, transported successfully.',
    status: 'completed',
    createdAt: '2024-12-05',
    quotesCount: 4,
  },
];

// Mock Quotes
export const mockQuotes: Quote[] = [
  {
    id: 'quote-1',
    listingId: 'listing-1',
    carrierId: 'carrier-1',
    carrierName: 'Nikola J.',
    carrierRating: 4.8,
    vehicleType: 'Enclosed car transporter',
    price: 650,
    currency: 'EUR',
    notes: 'Can pick up on the 28th morning. Enclosed trailer available.',
    status: 'pending',
    createdAt: '2024-12-20',
  },
  {
    id: 'quote-2',
    listingId: 'listing-1',
    carrierId: 'carrier-2',
    carrierName: 'Stefan K.',
    carrierRating: 4.5,
    vehicleType: 'Open car transporter',
    price: 520,
    currency: 'EUR',
    notes: 'Available from the 27th. Open trailer but with protective cover.',
    status: 'pending',
    createdAt: '2024-12-20',
  },
  {
    id: 'quote-3',
    listingId: 'listing-1',
    carrierId: 'carrier-3',
    carrierName: 'Dragan M.',
    carrierRating: 4.9,
    vehicleType: 'Enclosed car transporter',
    price: 720,
    currency: 'EUR',
    notes: 'Premium enclosed transport with GPS tracking. Insurance included up to 50,000 EUR.',
    status: 'pending',
    createdAt: '2024-12-21',
  },
  {
    id: 'quote-4',
    listingId: 'listing-2',
    carrierId: 'carrier-1',
    carrierName: 'Nikola J.',
    carrierRating: 4.8,
    vehicleType: 'Flatbed truck',
    price: 890,
    currency: 'EUR',
    notes: 'Can transport the van on my return trip from Skopje.',
    status: 'pending',
    createdAt: '2024-12-20',
  },
  {
    id: 'quote-5',
    listingId: 'listing-2',
    carrierId: 'carrier-4',
    carrierName: 'Ivan P.',
    carrierRating: 4.6,
    vehicleType: 'Car transporter',
    price: 950,
    currency: 'EUR',
    notes: 'Direct transport, no stops.',
    status: 'pending',
    createdAt: '2024-12-21',
  },
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    senderId: 'shipper-1',
    senderName: 'Marko P.',
    receiverId: 'carrier-1',
    listingId: 'listing-1',
    content: 'Hi, is your trailer fully enclosed? I need maximum protection.',
    createdAt: '2024-12-20T10:30:00',
  },
  {
    id: 'msg-2',
    senderId: 'carrier-1',
    senderName: 'Nikola J.',
    receiverId: 'shipper-1',
    listingId: 'listing-1',
    content: 'Yes, fully enclosed with climate control. I transport luxury cars regularly.',
    createdAt: '2024-12-20T10:45:00',
  },
  {
    id: 'msg-3',
    senderId: 'shipper-1',
    senderName: 'Marko P.',
    receiverId: 'carrier-1',
    listingId: 'listing-1',
    content: 'Great! Can you share some photos of your trailer?',
    createdAt: '2024-12-20T11:00:00',
  },
];

// Current logged in user (for demo purposes)
export const currentUser: User & { carrierProfile?: CarrierProfile } = {
  id: 'shipper-1',
  email: 'marko@example.com',
  firstName: 'Marko',
  lastName: 'Petrović',
  phone: '+381 64 123 4567',
  userType: 'shipper',
  createdAt: '2024-01-15',
};

// Helper functions
export const getListingById = (id: string): Listing | undefined => {
  return mockListings.find(l => l.id === id);
};

export const getQuotesForListing = (listingId: string): Quote[] => {
  return mockQuotes.filter(q => q.listingId === listingId);
};

export const getMessagesForListing = (listingId: string): Message[] => {
  return mockMessages.filter(m => m.listingId === listingId);
};

export const getListingsForShipper = (shipperId: string): Listing[] => {
  return mockListings.filter(l => l.shipperId === shipperId);
};

export const getActiveListings = (): Listing[] => {
  return mockListings.filter(l => l.status === 'active');
};
