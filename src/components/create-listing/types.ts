export type Category = 
  | 'cars' 
  | 'motorcycles' 
  | 'furniture' 
  | 'appliances' 
  | 'boxes' 
  | 'pallets' 
  | 'machinery' 
  | 'boats' 
  | 'other';



export type TimeframeType = 
  | 'within-week' 
  | 'within-2-weeks' 
  | 'specific-date' 
  | 'between-dates' 
  | 'flexible' 
  | 'no-date';

export interface ListingFormData {
  // Step 1: Category
  category: Category | null;
  
  // Step 2: Item Description
  title?: string;
  make?: string;
  model?: string;
  year?: string;
  petType?: string;
  petWeight?: string;
  description?: string;
  hasPurchaseLink: boolean;
  purchaseLink?: string;
  
  // Step 3: Photos
  photos: File[];
  
  // Step 4: Pickup Location
  pickupCountry: string;
  pickupCity: string;
  
  // Step 5: Delivery Location
  deliveryCountry: string;
  deliveryCity: string;
  
  // Step 6: Timeframe
  timeframe: TimeframeType | null;
  specificDate?: string;
  dateRangeStart?: string;
  dateRangeEnd?: string;
  
  // Step 7: Contact
  email: string;
  phone: string;
  phoneCountryCode: string;
  agreedToTerms: boolean;
}

export const initialFormData: ListingFormData = {
  category: null,
  hasPurchaseLink: false,
  photos: [],
  pickupCountry: '',
  pickupCity: '',
  deliveryCountry: '',
  deliveryCity: '',
  timeframe: null,
  email: '',
  phone: '',
  phoneCountryCode: '+44',
  agreedToTerms: false,
};

export const CATEGORIES: { id: Category; icon: string; labelKey: string }[] = [
  { id: 'cars', icon: 'Car', labelKey: 'wizard.categories.cars' },
  { id: 'motorcycles', icon: 'Bike', labelKey: 'wizard.categories.motorcycles' },
  { id: 'furniture', icon: 'Armchair', labelKey: 'wizard.categories.furniture' },
  { id: 'appliances', icon: 'Refrigerator', labelKey: 'wizard.categories.appliances' },
  { id: 'boxes', icon: 'Package', labelKey: 'wizard.categories.boxes' },
  { id: 'pallets', icon: 'Container', labelKey: 'wizard.categories.pallets' },
  { id: 'machinery', icon: 'Cog', labelKey: 'wizard.categories.machinery' },
  { id: 'boats', icon: 'Ship', labelKey: 'wizard.categories.boats' },
  { id: 'other', icon: 'MoreHorizontal', labelKey: 'wizard.categories.other' },
];

export const COUNTRIES = [
  { code: 'GB', name: 'United Kingdom' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'BE', name: 'Belgium' },
  { code: 'AT', name: 'Austria' },
  { code: 'PL', name: 'Poland' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'HR', name: 'Croatia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'RS', name: 'Serbia' },
  { code: 'BA', name: 'Bosnia and Herzegovina' },
  { code: 'ME', name: 'Montenegro' },
  { code: 'MK', name: 'North Macedonia' },
  { code: 'AL', name: 'Albania' },
  { code: 'RO', name: 'Romania' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'HU', name: 'Hungary' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'CH', name: 'Switzerland' },
];

export const PHONE_CODES = [
  { code: '+44', country: 'UK' },
  { code: '+49', country: 'DE' },
  { code: '+33', country: 'FR' },
  { code: '+39', country: 'IT' },
  { code: '+34', country: 'ES' },
  { code: '+31', country: 'NL' },
  { code: '+32', country: 'BE' },
  { code: '+43', country: 'AT' },
  { code: '+48', country: 'PL' },
  { code: '+420', country: 'CZ' },
  { code: '+385', country: 'HR' },
  { code: '+386', country: 'SI' },
  { code: '+381', country: 'RS' },
  { code: '+387', country: 'BA' },
  { code: '+382', country: 'ME' },
  { code: '+389', country: 'MK' },
  { code: '+355', country: 'AL' },
  { code: '+40', country: 'RO' },
  { code: '+359', country: 'BG' },
  { code: '+36', country: 'HU' },
  { code: '+421', country: 'SK' },
  { code: '+41', country: 'CH' },
];
