// Programmatic SEO configurations for modifiers, countries, and industries

export interface Modifier {
  id: string
  slug: string
  name: string
  description: string
  keyword: string // e.g., "free", "online", "fast"
}

export interface Country {
  id: string
  slug: string
  name: string
  code: string // ISO 3166-1 alpha-2: PK, IN, US, etc.
  currency: string // PKR, INR, USD, etc.
  language: string
  region: string // Asia, Europe, Americas, etc.
}

export interface Industry {
  id: string
  slug: string
  name: string
  description: string
  keywords: string[]
  painPoints: string[]
}

// Modifiers: Benefit/characteristic variants
export const modifiers: Modifier[] = [
  { id: 'free', slug: 'free', name: 'Free', description: 'No cost, completely free', keyword: 'free' },
  { id: 'online', slug: 'online', name: 'Online', description: 'Web-based tool', keyword: 'online' },
  { id: 'fast', slug: 'fast', name: 'Fast', description: 'Quick processing', keyword: 'fast' },
  { id: 'secure', slug: 'secure', name: 'Secure', description: 'Password protected, encrypted', keyword: 'secure' },
  { id: 'easy', slug: 'easy', name: 'Easy', description: 'Simple to use', keyword: 'easy' },
  { id: 'batch', slug: 'batch', name: 'Batch', description: 'Multiple files at once', keyword: 'batch' },
  { id: 'best', slug: 'best', name: 'Best', description: 'Top rated option', keyword: 'best' },
  { id: 'unlimited', slug: 'unlimited', name: 'Unlimited', description: 'No file limits', keyword: 'unlimited' },
  { id: 'no-download', slug: 'no-download', name: 'No Download', description: 'Browser based', keyword: 'no download' },
  { id: 'no-signup', slug: 'no-signup', name: 'No Signup', description: 'Use without account', keyword: 'no signup' },
  { id: 'instant', slug: 'instant', name: 'Instant', description: 'Immediate results', keyword: 'instant' },
  { id: 'mobile', slug: 'mobile', name: 'Mobile', description: 'Works on phones', keyword: 'mobile' },
]

// Countries: Geographic targeting
export const countries: Country[] = [
  { id: 'pk', slug: 'pakistan', name: 'Pakistan', code: 'PK', currency: 'PKR', language: 'Urdu/English', region: 'Asia' },
  { id: 'in', slug: 'india', name: 'India', code: 'IN', currency: 'INR', language: 'Hindi/English', region: 'Asia' },
  { id: 'us', slug: 'usa', name: 'USA', code: 'US', currency: 'USD', language: 'English', region: 'Americas' },
  { id: 'uk', slug: 'uk', name: 'UK', code: 'GB', currency: 'GBP', language: 'English', region: 'Europe' },
  { id: 'ca', slug: 'canada', name: 'Canada', code: 'CA', currency: 'CAD', language: 'English/French', region: 'Americas' },
  { id: 'ae', slug: 'uae', name: 'UAE', code: 'AE', currency: 'AED', language: 'Arabic/English', region: 'Middle East' },
  { id: 'sg', slug: 'singapore', name: 'Singapore', code: 'SG', currency: 'SGD', language: 'English', region: 'Asia' },
  { id: 'au', slug: 'australia', name: 'Australia', code: 'AU', currency: 'AUD', language: 'English', region: 'Oceania' },
  { id: 'de', slug: 'germany', name: 'Germany', code: 'DE', currency: 'EUR', language: 'German/English', region: 'Europe' },
  { id: 'fr', slug: 'france', name: 'France', code: 'FR', currency: 'EUR', language: 'French', region: 'Europe' },
  { id: 'jp', slug: 'japan', name: 'Japan', code: 'JP', currency: 'JPY', language: 'Japanese', region: 'Asia' },
  { id: 'ng', slug: 'nigeria', name: 'Nigeria', code: 'NG', currency: 'NGN', language: 'English', region: 'Africa' },
  { id: 'za', slug: 'south-africa', name: 'South Africa', code: 'ZA', currency: 'ZAR', language: 'English', region: 'Africa' },
  { id: 'br', slug: 'brazil', name: 'Brazil', code: 'BR', currency: 'BRL', language: 'Portuguese', region: 'Americas' },
  { id: 'mx', slug: 'mexico', name: 'Mexico', code: 'MX', currency: 'MXN', language: 'Spanish', region: 'Americas' },
]

// Industries: Vertical targeting
export const industries: Industry[] = [
  { 
    id: 'lawyers', 
    slug: 'lawyers', 
    name: 'Lawyers', 
    description: 'Legal professionals and law firms',
    keywords: ['legal documents', 'contracts', 'agreements', 'law firm'],
    painPoints: ['Contract management', 'Document organization', 'Secure handling'] 
  },
  { 
    id: 'students', 
    slug: 'students', 
    name: 'Students', 
    description: 'Educational institutions and learners',
    keywords: ['study materials', 'assignments', 'research papers', 'notes'],
    painPoints: ['Quick document conversion', 'File organization', 'Easy sharing'] 
  },
  { 
    id: 'teachers', 
    slug: 'teachers', 
    name: 'Teachers', 
    description: 'Educators and academic staff',
    keywords: ['lesson plans', 'grading', 'assignments', 'course materials'],
    painPoints: ['Document management', 'Grade distribution', 'Material sharing'] 
  },
  { 
    id: 'businesses', 
    slug: 'businesses', 
    name: 'Businesses', 
    description: 'Corporate professionals',
    keywords: ['reports', 'presentations', 'invoices', 'contracts'],
    painPoints: ['Workflow efficiency', 'Professional documents', 'Security'] 
  },
  { 
    id: 'accountants', 
    slug: 'accountants', 
    name: 'Accountants', 
    description: 'Finance and accounting professionals',
    keywords: ['financial reports', 'invoices', 'statements', 'records'],
    painPoints: ['Data extraction', 'Document accuracy', 'Compliance'] 
  },
  { 
    id: 'healthcare', 
    slug: 'healthcare', 
    name: 'Healthcare', 
    description: 'Medical professionals and clinics',
    keywords: ['medical records', 'prescriptions', 'patient forms', 'reports'],
    painPoints: ['Privacy compliance', 'Patient records', 'Secure storage'] 
  },
  { 
    id: 'real-estate', 
    slug: 'real-estate', 
    name: 'Real Estate', 
    description: 'Property and real estate professionals',
    keywords: ['property documents', 'contracts', 'listings', 'agreements'],
    painPoints: ['Document management', 'Contract handling', 'Professional presentation'] 
  },
  { 
    id: 'freelancers', 
    slug: 'freelancers', 
    name: 'Freelancers', 
    description: 'Independent contractors',
    keywords: ['invoices', 'proposals', 'contracts', 'portfolios'],
    painPoints: ['Quick invoicing', 'Professional documents', 'Client delivery'] 
  },
  { 
    id: 'journalists', 
    slug: 'journalists', 
    name: 'Journalists', 
    description: 'News and media professionals',
    keywords: ['articles', 'reports', 'archives', 'sources'],
    painPoints: ['Document organization', 'Source management', 'Archive access'] 
  },
  { 
    id: 'researchers', 
    slug: 'researchers', 
    name: 'Researchers', 
    description: 'Academic and scientific researchers',
    keywords: ['research papers', 'citations', 'data', 'studies'],
    painPoints: ['Document organization', 'Data extraction', 'Citation management'] 
  },
  { 
    id: 'hr', 
    slug: 'hr', 
    name: 'HR Professionals', 
    description: 'Human resources staff',
    keywords: ['resumes', 'applications', 'contracts', 'policies'],
    painPoints: ['Resume processing', 'Compliance', 'Document standardization'] 
  },
  { 
    id: 'developers', 
    slug: 'developers', 
    name: 'Developers', 
    description: 'Software developers and engineers',
    keywords: ['documentation', 'specs', 'reports', 'diagrams'],
    painPoints: ['Quick conversion', 'Technical documentation', 'Format compatibility'] 
  },
  { 
    id: 'nonprofits', 
    slug: 'nonprofits', 
    name: 'Nonprofits', 
    description: 'Non-profit organizations',
    keywords: ['reports', 'proposals', 'grants', 'fundraising'],
    painPoints: ['Grant documentation', 'Report generation', 'Fund management'] 
  },
  { 
    id: 'government', 
    slug: 'government', 
    name: 'Government', 
    description: 'Government agencies and officials',
    keywords: ['official documents', 'records', 'compliance', 'archives'],
    painPoints: ['Compliance requirements', 'Document archival', 'Secure access'] 
  },
  { 
    id: 'startups', 
    slug: 'startups', 
    name: 'Startups', 
    description: 'Early-stage companies',
    keywords: ['pitches', 'business plans', 'investor docs', 'proposals'],
    painPoints: ['Quick document creation', 'Professional presentation', 'Cost efficiency'] 
  },
]

// Helper functions
export function getModifier(slug: string): Modifier | undefined {
  return modifiers.find(m => m.slug === slug)
}

export function getCountry(slug: string): Country | undefined {
  return countries.find(c => c.slug === slug)
}

export function getIndustry(slug: string): Industry | undefined {
  return industries.find(i => i.slug === slug)
}

export function getAllModifiers(): Modifier[] {
  return modifiers
}

export function getAllCountries(): Country[] {
  return countries
}

export function getAllIndustries(): Industry[] {
  return industries
}

export function generateModifierPageCount(): number {
  return modifiers.length * 15 // 12 modifiers × 15 tools approximately
}

export function generateCountryPageCount(): number {
  return countries.length * 15 // 15 countries × 15 tools
}

export function generateIndustryPageCount(): number {
  return industries.length * 15 // 15 industries × 15 tools
}

export function generateTotalPageCount(): number {
  return generateModifierPageCount() + generateCountryPageCount() + generateIndustryPageCount()
}
