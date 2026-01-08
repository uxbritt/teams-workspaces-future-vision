// Mock data for BrandKit prototypes
// Simulates Cactus Garden USA franchise structure

export const organization = {
  id: 'org-001',
  name: 'Cactus Garden USA',
  logo: '🌵',
  plan: 'Enterprise',
  memberCount: 24
}

export const brandAssets = {
  logos: [
    { id: 'logo-1', name: 'Primary Logo', type: 'SVG', url: null, color: '#2D5016' },
    { id: 'logo-2', name: 'Icon Mark', type: 'PNG', url: null, color: '#4A7C23' },
    { id: 'logo-3', name: 'Wordmark', type: 'SVG', url: null, color: '#2D5016' }
  ],
  colors: [
    { id: 'color-1', name: 'Cactus Green', hex: '#2D5016' },
    { id: 'color-2', name: 'Desert Sand', hex: '#E8DCC4' },
    { id: 'color-3', name: 'Sunset Orange', hex: '#E87A3C' },
    { id: 'color-4', name: 'Clay Brown', hex: '#8B5A2B' }
  ],
  fonts: [
    { id: 'font-1', name: 'Heading', family: 'Sora', weight: '600' },
    { id: 'font-2', name: 'Body', family: 'DM Sans', weight: '400' }
  ],
  images: [
    { id: 'img-1', name: 'Hero Background', type: 'JPG' },
    { id: 'img-2', name: 'Product Showcase', type: 'PNG' },
    { id: 'img-3', name: 'Team Photo', type: 'JPG' }
  ]
}

export const subaccounts = [
  {
    id: 'sub-001',
    name: 'Phoenix Downtown',
    location: 'Phoenix, AZ',
    brandKitUpdated: '2024-01-15',
    updatedBy: 'organization',
    status: 'active'
  },
  {
    id: 'sub-002',
    name: 'Scottsdale North',
    location: 'Scottsdale, AZ',
    brandKitUpdated: null,
    updatedBy: null,
    status: 'active'
  },
  {
    id: 'sub-003',
    name: 'Tucson Central',
    location: 'Tucson, AZ',
    brandKitUpdated: '2024-02-20',
    updatedBy: 'subaccount',
    status: 'active'
  },
  {
    id: 'sub-004',
    name: 'Mesa East',
    location: 'Mesa, AZ',
    brandKitUpdated: null,
    updatedBy: null,
    status: 'active'
  },
  {
    id: 'sub-005',
    name: 'Tempe University',
    location: 'Tempe, AZ',
    brandKitUpdated: '2023-12-01',
    updatedBy: 'organization',
    status: 'active'
  },
  {
    id: 'sub-006',
    name: 'Chandler Plaza',
    location: 'Chandler, AZ',
    brandKitUpdated: null,
    updatedBy: null,
    status: 'pending'
  },
  {
    id: 'sub-007',
    name: 'Gilbert Town Center',
    location: 'Gilbert, AZ',
    brandKitUpdated: '2024-01-28',
    updatedBy: 'organization',
    status: 'active'
  },
  {
    id: 'sub-008',
    name: 'Flagstaff Mountain',
    location: 'Flagstaff, AZ',
    brandKitUpdated: null,
    updatedBy: null,
    status: 'active'
  }
]

export const recentActivity = [
  {
    id: 'act-1',
    action: 'BrandKit copied',
    target: 'Phoenix Downtown',
    user: 'Admin',
    timestamp: '2024-01-15T10:30:00Z'
  },
  {
    id: 'act-2',
    action: 'Logo updated',
    target: 'Primary Logo',
    user: 'Admin',
    timestamp: '2024-01-14T15:45:00Z'
  },
  {
    id: 'act-3',
    action: 'Color added',
    target: 'Sunset Orange',
    user: 'Admin',
    timestamp: '2024-01-12T09:20:00Z'
  }
]

export function formatDate(dateString) {
  if (!dateString) return 'Never'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

export function getTimeAgo(dateString) {
  if (!dateString) return 'Never'
  const date = new Date(dateString)
  const now = new Date()
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return `${Math.floor(diffDays / 30)} months ago`
}

