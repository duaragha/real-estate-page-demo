// Property data for the real estate website
const propertyData = [
    {
        id: 1,
        title: "Modern Downtown Luxury Condo",
        type: "condo",
        price: 850000,
        location: "Downtown District, NY",
        address: "123 Main Street, Downtown District, NY 10001",
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        yearBuilt: 2020,
        featured: true,
        status: "for-sale",
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
        ],
        description: "Stunning modern condo with floor-to-ceiling windows offering breathtaking city views. Features include hardwood floors, granite countertops, stainless steel appliances, and access to building amenities including rooftop terrace, fitness center, and concierge service.",
        features: [
            "Floor-to-ceiling windows",
            "Hardwood floors",
            "Granite countertops",
            "Stainless steel appliances",
            "In-unit laundry",
            "Balcony with city views",
            "Building gym",
            "Rooftop terrace",
            "24/7 concierge",
            "Pet-friendly"
        ],
        agent: {
            name: "Sarah Johnson",
            phone: "(555) 123-4567",
            email: "sarah@premiumrealestate.com",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face"
        },
        coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    {
        id: 2,
        title: "Charming Victorian Family Home",
        type: "house",
        price: 675000,
        location: "Maple Heights, NY",
        address: "456 Oak Avenue, Maple Heights, NY 10002",
        bedrooms: 4,
        bathrooms: 3,
        area: 2400,
        yearBuilt: 1925,
        featured: true,
        status: "for-sale",
        images: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop"
        ],
        description: "Beautiful Victorian home with original architectural details preserved and modern updates throughout. Features spacious rooms, original hardwood floors, updated kitchen and bathrooms, large backyard perfect for families, and detached two-car garage.",
        features: [
            "Original hardwood floors",
            "Crown molding",
            "Fireplace",
            "Updated kitchen",
            "Master suite",
            "Large backyard",
            "Two-car garage",
            "Original stained glass",
            "Wrap-around porch",
            "Basement storage"
        ],
        agent: {
            name: "Michael Chen",
            phone: "(555) 234-5678",
            email: "michael@premiumrealestate.com",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
        },
        coordinates: { lat: 40.7505, lng: -73.9934 }
    },
    {
        id: 3,
        title: "Waterfront Luxury Apartment",
        type: "apartment",
        price: 1200000,
        location: "Harbor View, NY",
        address: "789 Waterfront Drive, Harbor View, NY 10003",
        bedrooms: 3,
        bathrooms: 2,
        area: 1800,
        yearBuilt: 2018,
        featured: true,
        status: "for-sale",
        images: [
            "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800&h=600&fit=crop"
        ],
        description: "Exceptional waterfront apartment with panoramic harbor views. Open-plan living with premium finishes, chef's kitchen with high-end appliances, master suite with walk-in closet, and private balcony overlooking the water. Building amenities include pool, spa, and marina access.",
        features: [
            "Panoramic water views",
            "Open floor plan",
            "Chef's kitchen",
            "High-end appliances",
            "Walk-in closets",
            "Private balcony",
            "Building pool",
            "Spa access",
            "Marina privileges",
            "Valet parking"
        ],
        agent: {
            name: "Emily Rodriguez",
            phone: "(555) 345-6789",
            email: "emily@premiumrealestate.com",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
        },
        coordinates: { lat: 40.7614, lng: -73.9776 }
    },
    {
        id: 4,
        title: "Contemporary Townhouse",
        type: "townhouse",
        price: 925000,
        location: "Riverside Commons, NY",
        address: "321 River Street, Riverside Commons, NY 10004",
        bedrooms: 3,
        bathrooms: 3,
        area: 2000,
        yearBuilt: 2019,
        featured: false,
        status: "for-sale",
        images: [
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop"
        ],
        description: "Sleek contemporary townhouse with modern design and high-quality finishes. Features include open living spaces, gourmet kitchen with quartz countertops, rooftop deck, attached garage, and smart home technology throughout.",
        features: [
            "Contemporary design",
            "Open living spaces",
            "Quartz countertops",
            "Rooftop deck",
            "Attached garage",
            "Smart home tech",
            "Energy efficient",
            "Skylight",
            "Wine cellar",
            "Home office"
        ],
        agent: {
            name: "David Kim",
            phone: "(555) 456-7890",
            email: "david@premiumrealestate.com",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
        },
        coordinates: { lat: 40.7544, lng: -73.9862 }
    },
    {
        id: 5,
        title: "Cozy Studio Apartment",
        type: "apartment",
        price: 425000,
        location: "Arts District, NY",
        address: "654 Gallery Lane, Arts District, NY 10005",
        bedrooms: 1,
        bathrooms: 1,
        area: 600,
        yearBuilt: 2021,
        featured: false,
        status: "for-sale",
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"
        ],
        description: "Perfect starter home or investment property in the vibrant Arts District. This modern studio features efficient layout, large windows, murphy bed, compact kitchen with full appliances, and building amenities including rooftop garden and bike storage.",
        features: [
            "Efficient layout",
            "Large windows",
            "Murphy bed",
            "Full kitchen",
            "Hardwood floors",
            "High ceilings",
            "Rooftop garden",
            "Bike storage",
            "Laundry room",
            "Pet-friendly"
        ],
        agent: {
            name: "Lisa Thompson",
            phone: "(555) 567-8901",
            email: "lisa@premiumrealestate.com",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
        },
        coordinates: { lat: 40.7282, lng: -74.0776 }
    },
    {
        id: 6,
        title: "Suburban Family Estate",
        type: "house",
        price: 1450000,
        location: "Green Hills, NY",
        address: "987 Elm Court, Green Hills, NY 10006",
        bedrooms: 5,
        bathrooms: 4,
        area: 3500,
        yearBuilt: 2015,
        featured: true,
        status: "for-sale",
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop"
        ],
        description: "Magnificent family estate on 1.2 acres with mature landscaping. Features include grand foyer, formal living and dining rooms, gourmet kitchen with island, family room with fireplace, master suite with sitting area, finished basement, and three-car garage.",
        features: [
            "1.2 acre lot",
            "Grand foyer",
            "Formal dining room",
            "Gourmet kitchen",
            "Family room fireplace",
            "Master sitting area",
            "Finished basement",
            "Three-car garage",
            "Swimming pool",
            "Tennis court"
        ],
        agent: {
            name: "Robert Davis",
            phone: "(555) 678-9012",
            email: "robert@premiumrealestate.com",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face"
        },
        coordinates: { lat: 40.7831, lng: -73.9712 }
    },
    {
        id: 7,
        title: "Urban Loft Conversion",
        type: "condo",
        price: 775000,
        location: "Industrial Quarter, NY",
        address: "246 Factory Street, Industrial Quarter, NY 10007",
        bedrooms: 2,
        bathrooms: 2,
        area: 1400,
        yearBuilt: 2017,
        featured: false,
        status: "for-sale",
        images: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&h=600&fit=crop"
        ],
        description: "Industrial chic loft in converted factory building. Features exposed brick walls, original wooden beams, polished concrete floors, floor-to-ceiling windows, modern kitchen with stainless steel appliances, and unique architectural details throughout.",
        features: [
            "Exposed brick walls",
            "Original wood beams",
            "Concrete floors",
            "Industrial windows",
            "High ceilings",
            "Open floor plan",
            "Modern kitchen",
            "Unique architecture",
            "Freight elevator",
            "Shared rooftop"
        ],
        agent: {
            name: "Jennifer Wilson",
            phone: "(555) 789-0123",
            email: "jennifer@premiumrealestate.com",
            image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face"
        },
        coordinates: { lat: 40.7505, lng: -73.9971 }
    },
    {
        id: 8,
        title: "Garden Apartment",
        type: "apartment",
        price: 550000,
        location: "Parkside, NY",
        address: "135 Garden Terrace, Parkside, NY 10008",
        bedrooms: 2,
        bathrooms: 1,
        area: 950,
        yearBuilt: 1955,
        featured: false,
        status: "for-sale",
        images: [
            "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop"
        ],
        description: "Charming garden apartment with private patio overlooking beautifully maintained communal gardens. Features updated kitchen and bathroom, original hardwood floors, large windows, ample storage, and access to shared outdoor spaces including BBQ area and children's playground.",
        features: [
            "Private patio",
            "Garden access",
            "Updated kitchen",
            "Hardwood floors",
            "Large windows",
            "Ample storage",
            "BBQ area",
            "Playground",
            "Pet-friendly",
            "Parking space"
        ],
        agent: {
            name: "Mark Anderson",
            phone: "(555) 890-1234",
            email: "mark@premiumrealestate.com",
            image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=200&h=200&fit=crop&crop=face"
        },
        coordinates: { lat: 40.7505, lng: -73.9757 }
    },
    {
        id: 9,
        title: "Luxury Penthouse Suite",
        type: "condo",
        price: 2500000,
        location: "Skyline Heights, NY",
        address: "1 Sky Tower, Skyline Heights, NY 10009",
        bedrooms: 4,
        bathrooms: 3,
        area: 2800,
        yearBuilt: 2022,
        featured: true,
        status: "for-sale",
        images: [
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop"
        ],
        description: "Ultimate luxury penthouse with 360-degree city views. Features include private elevator access, expansive terraces, chef's kitchen with premium appliances, master suite with spa-like bathroom, home theater, wine cellar, and access to exclusive building amenities.",
        features: [
            "360-degree views",
            "Private elevator",
            "Expansive terraces",
            "Chef's kitchen",
            "Premium appliances",
            "Spa bathroom",
            "Home theater",
            "Wine cellar",
            "Concierge service",
            "Valet parking"
        ],
        agent: {
            name: "Victoria Sterling",
            phone: "(555) 901-2345",
            email: "victoria@premiumrealestate.com",
            image: "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?w=200&h=200&fit=crop&crop=face"
        },
        coordinates: { lat: 40.7614, lng: -73.9853 }
    },
    {
        id: 10,
        title: "Historic Brownstone",
        type: "townhouse",
        price: 1850000,
        location: "Heritage Row, NY",
        address: "42 Heritage Row, Historic District, NY 10010",
        bedrooms: 4,
        bathrooms: 3,
        area: 2600,
        yearBuilt: 1890,
        featured: false,
        status: "for-sale",
        images: [
            "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop"
        ],
        description: "Meticulously restored historic brownstone in prestigious Heritage Row. Features original architectural details, modern kitchen and bathrooms, period fireplaces, restored original floors, private garden, and authentic Victorian charm throughout.",
        features: [
            "Historic designation",
            "Original details",
            "Period fireplaces",
            "Restored floors",
            "Modern kitchen",
            "Private garden",
            "Victorian charm",
            "High ceilings",
            "Original molding",
            "Basement level"
        ],
        agent: {
            name: "Charles Harrison",
            phone: "(555) 012-3456",
            email: "charles@premiumrealestate.com",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face"
        },
        coordinates: { lat: 40.7282, lng: -73.9942 }
    }
];

// Additional data structures for enhanced functionality
const propertyTypes = [
    { value: 'house', label: 'House', icon: 'fas fa-home' },
    { value: 'apartment', label: 'Apartment', icon: 'fas fa-building' },
    { value: 'condo', label: 'Condo', icon: 'fas fa-city' },
    { value: 'townhouse', label: 'Townhouse', icon: 'fas fa-hotel' }
];

const priceRanges = [
    { value: '0-500000', label: 'Under $500K', min: 0, max: 500000 },
    { value: '500000-750000', label: '$500K - $750K', min: 500000, max: 750000 },
    { value: '750000-1000000', label: '$750K - $1M', min: 750000, max: 1000000 },
    { value: '1000000-1500000', label: '$1M - $1.5M', min: 1000000, max: 1500000 },
    { value: '1500000+', label: '$1.5M+', min: 1500000, max: Infinity }
];

const locations = [
    'Downtown District',
    'Maple Heights',
    'Harbor View',
    'Riverside Commons',
    'Arts District',
    'Green Hills',
    'Industrial Quarter',
    'Parkside',
    'Skyline Heights',
    'Heritage Row'
];

// Utility functions for property data manipulation
const PropertyDataUtils = {
    // Get all properties
    getAllProperties: () => [...propertyData],

    // Get featured properties
    getFeaturedProperties: () => propertyData.filter(property => property.featured),

    // Get property by ID
    getPropertyById: (id) => propertyData.find(property => property.id === parseInt(id)),

    // Filter properties by criteria
    filterProperties: (filters = {}) => {
        return propertyData.filter(property => {
            // Type filter
            if (filters.type && filters.type !== 'all' && property.type !== filters.type) {
                return false;
            }

            // Price range filter
            if (filters.priceRange) {
                const range = priceRanges.find(range => range.value === filters.priceRange);
                if (range && (property.price < range.min || property.price > range.max)) {
                    return false;
                }
            }

            // Location filter
            if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
                return false;
            }

            // Bedrooms filter
            if (filters.bedrooms && property.bedrooms < parseInt(filters.bedrooms)) {
                return false;
            }

            // Search query filter
            if (filters.query) {
                const query = filters.query.toLowerCase();
                const searchableText = `${property.title} ${property.location} ${property.description} ${property.features.join(' ')}`.toLowerCase();
                if (!searchableText.includes(query)) {
                    return false;
                }
            }

            return true;
        });
    },

    // Sort properties by criteria
    sortProperties: (properties, sortBy = 'price-asc') => {
        const [field, direction] = sortBy.split('-');
        const multiplier = direction === 'desc' ? -1 : 1;

        return [...properties].sort((a, b) => {
            switch (field) {
                case 'price':
                    return (a.price - b.price) * multiplier;
                case 'date':
                    return (new Date(a.yearBuilt) - new Date(b.yearBuilt)) * multiplier;
                case 'size':
                    return (a.area - b.area) * multiplier;
                case 'title':
                    return a.title.localeCompare(b.title) * multiplier;
                default:
                    return 0;
            }
        });
    },

    // Format price for display
    formatPrice: (price) => {
        if (price >= 1000000) {
            return `$${(price / 1000000).toFixed(1)}M`;
        } else if (price >= 1000) {
            return `$${(price / 1000).toFixed(0)}K`;
        } else {
            return `$${price.toLocaleString()}`;
        }
    },

    // Format area for display
    formatArea: (area) => {
        return `${area.toLocaleString()} sq ft`;
    },

    // Get property type icon
    getPropertyTypeIcon: (type) => {
        const propertyType = propertyTypes.find(pt => pt.value === type);
        return propertyType ? propertyType.icon : 'fas fa-home';
    },

    // Get similar properties
    getSimilarProperties: (propertyId, limit = 3) => {
        const property = PropertyDataUtils.getPropertyById(propertyId);
        if (!property) return [];

        return propertyData
            .filter(p => p.id !== propertyId)
            .filter(p => p.type === property.type || Math.abs(p.price - property.price) < 200000)
            .slice(0, limit);
    },

    // Get random properties
    getRandomProperties: (limit = 6) => {
        const shuffled = [...propertyData].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, limit);
    }
};

// Analytics data utilities
class PropertyAnalytics {
    constructor() {
        this.properties = propertyData;
        this.initializeAnalytics();
    }

    /**
     * Initialize analytics tracking for all properties
     */
    initializeAnalytics() {
        // Add analytics data to each property if not already present
        this.properties.forEach(property => {
            if (!property.analytics) {
                property.analytics = {
                    views: Math.floor(Math.random() * 100) + 10,
                    saves: Math.floor(Math.random() * 20) + 1,
                    shares: Math.floor(Math.random() * 10) + 1,
                    directions: Math.floor(Math.random() * 15) + 1,
                    contactRequests: Math.floor(Math.random() * 8) + 1,
                    lastViewed: this.generateRandomDate()
                };
            }
        });
    }

    /**
     * Generate random date within the last 30 days
     */
    generateRandomDate() {
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const randomTime = thirtyDaysAgo.getTime() + Math.random() * (now.getTime() - thirtyDaysAgo.getTime());
        return new Date(randomTime).toISOString();
    }

    /**
     * Update property analytics
     */
    updatePropertyAnalytics(propertyId, eventType) {
        const property = this.properties.find(p => p.id === propertyId);
        if (property && property.analytics) {
            switch (eventType) {
                case 'view':
                    property.analytics.views++;
                    property.analytics.lastViewed = new Date().toISOString();
                    break;
                case 'save':
                    property.analytics.saves++;
                    break;
                case 'share':
                    property.analytics.shares++;
                    break;
                case 'directions':
                    property.analytics.directions++;
                    break;
                case 'contact':
                    property.analytics.contactRequests++;
                    break;
            }
            this.saveAnalyticsToStorage();
        }
    }

    /**
     * Get property analytics summary
     */
    getAnalyticsSummary() {
        const summary = {
            totalProperties: this.properties.length,
            totalViews: 0,
            totalSaves: 0,
            totalShares: 0,
            totalDirections: 0,
            totalContactRequests: 0,
            averagePrice: 0,
            topPerformingProperties: [],
            locationBreakdown: {},
            typeBreakdown: {}
        };

        this.properties.forEach(property => {
            summary.totalViews += property.analytics.views;
            summary.totalSaves += property.analytics.saves;
            summary.totalShares += property.analytics.shares;
            summary.totalDirections += property.analytics.directions;
            summary.totalContactRequests += property.analytics.contactRequests;
            summary.averagePrice += property.price;

            // Location breakdown
            const location = property.location.split(',')[0];
            summary.locationBreakdown[location] = (summary.locationBreakdown[location] || 0) + 1;

            // Type breakdown
            summary.typeBreakdown[property.type] = (summary.typeBreakdown[property.type] || 0) + 1;
        });

        summary.averagePrice = Math.round(summary.averagePrice / this.properties.length);

        // Get top performing properties
        summary.topPerformingProperties = this.properties
            .sort((a, b) => b.analytics.views - a.analytics.views)
            .slice(0, 5)
            .map(p => ({
                id: p.id,
                title: p.title,
                views: p.analytics.views,
                saves: p.analytics.saves,
                engagementRate: p.analytics.views > 0 ? Math.round(((p.analytics.saves + p.analytics.shares + p.analytics.directions) / p.analytics.views) * 100) : 0
            }));

        return summary;
    }

    /**
     * Save analytics to localStorage
     */
    saveAnalyticsToStorage() {
        const analyticsData = this.properties.map(p => ({
            id: p.id,
            analytics: p.analytics
        }));
        localStorage.setItem('re_property_analytics', JSON.stringify(analyticsData));
    }

    /**
     * Load analytics from localStorage
     */
    loadAnalyticsFromStorage() {
        const stored = localStorage.getItem('re_property_analytics');
        if (stored) {
            const analyticsData = JSON.parse(stored);
            analyticsData.forEach(item => {
                const property = this.properties.find(p => p.id === item.id);
                if (property) {
                    property.analytics = { ...property.analytics, ...item.analytics };
                }
            });
        }
    }
}

// Search analytics utilities
class SearchAnalytics {
    constructor() {
        this.searchHistory = this.loadSearchHistory();
    }

    /**
     * Track search query
     */
    trackSearch(query, filters, results) {
        const searchData = {
            query: query.toLowerCase().trim(),
            filters: { ...filters },
            resultCount: results.length,
            timestamp: new Date().toISOString(),
            successful: results.length > 0
        };

        this.searchHistory.push(searchData);
        this.saveSearchHistory();
        return searchData;
    }

    /**
     * Get search analytics
     */
    getSearchAnalytics(days = 30) {
        const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
        const recentSearches = this.searchHistory.filter(search =>
            new Date(search.timestamp) >= cutoffDate
        );

        const queryFrequency = {};
        const filterUsage = {};
        let totalSearches = recentSearches.length;
        let successfulSearches = 0;

        recentSearches.forEach(search => {
            if (search.query) {
                queryFrequency[search.query] = (queryFrequency[search.query] || 0) + 1;
            }

            Object.entries(search.filters).forEach(([key, value]) => {
                if (value && value !== 'all' && value !== '') {
                    filterUsage[key] = (filterUsage[key] || 0) + 1;
                }
            });

            if (search.successful) {
                successfulSearches++;
            }
        });

        return {
            totalSearches,
            successfulSearches,
            successRate: totalSearches > 0 ? (successfulSearches / totalSearches * 100).toFixed(1) : 0,
            popularQueries: Object.entries(queryFrequency)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10),
            filterUsage
        };
    }

    /**
     * Load search history from localStorage
     */
    loadSearchHistory() {
        const stored = localStorage.getItem('re_search_history');
        return stored ? JSON.parse(stored) : [];
    }

    /**
     * Save search history to localStorage
     */
    saveSearchHistory() {
        const trimmedHistory = this.searchHistory.slice(-1000);
        localStorage.setItem('re_search_history', JSON.stringify(trimmedHistory));
    }
}

// Initialize analytics utilities
const propertyAnalytics = new PropertyAnalytics();
const searchAnalytics = new SearchAnalytics();

// Load existing analytics data
propertyAnalytics.loadAnalyticsFromStorage();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { propertyData, PropertyDataUtils, propertyTypes, priceRanges, locations, propertyAnalytics, searchAnalytics };
} else {
    // Make available globally for browser use
    window.propertyAnalytics = propertyAnalytics;
    window.searchAnalytics = searchAnalytics;
}