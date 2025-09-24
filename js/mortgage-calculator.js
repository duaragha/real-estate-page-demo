/* =====================================
   Mortgage Calculator Module
   ===================================== */

class MortgageCalculator {
    constructor() {
        this.initializeCalculator();
        this.bindEvents();
    }

    initializeCalculator() {
        // Initialize with default calculation
        this.calculateMortgage();
    }

    bindEvents() {
        const calculateBtn = document.getElementById('calculate-mortgage');
        const inputs = [
            'home-price',
            'down-payment',
            'loan-term',
            'interest-rate'
        ];

        // Calculate on button click
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => this.calculateMortgage());
        }

        // Calculate on input change for real-time updates
        inputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('input', () => this.calculateMortgage());
                input.addEventListener('change', () => this.calculateMortgage());
            }
        });
    }

    calculateMortgage() {
        try {
            // Get input values
            const homePrice = parseFloat(document.getElementById('home-price')?.value) || 0;
            const downPayment = parseFloat(document.getElementById('down-payment')?.value) || 0;
            const loanTermYears = parseInt(document.getElementById('loan-term')?.value) || 30;
            const annualInterestRate = parseFloat(document.getElementById('interest-rate')?.value) || 0;

            // Validate inputs
            if (homePrice <= 0) {
                this.displayError('Please enter a valid home price');
                return;
            }

            if (downPayment >= homePrice) {
                this.displayError('Down payment cannot exceed home price');
                return;
            }

            if (annualInterestRate < 0 || annualInterestRate > 30) {
                this.displayError('Interest rate must be between 0% and 30%');
                return;
            }

            // Calculate loan amount
            const loanAmount = homePrice - downPayment;

            // Convert annual rate to monthly and years to months
            const monthlyInterestRate = annualInterestRate / 100 / 12;
            const totalMonths = loanTermYears * 12;

            // Calculate monthly principal and interest using the formula:
            // M = P * [r(1+r)^n] / [(1+r)^n - 1]
            let monthlyPrincipalInterest = 0;
            if (monthlyInterestRate > 0) {
                const monthlyFactor = Math.pow(1 + monthlyInterestRate, totalMonths);
                monthlyPrincipalInterest = loanAmount * (monthlyInterestRate * monthlyFactor) / (monthlyFactor - 1);
            } else {
                // If interest rate is 0, just divide loan amount by months
                monthlyPrincipalInterest = loanAmount / totalMonths;
            }

            // Estimate additional monthly costs
            const monthlyPropertyTax = (homePrice * 0.012) / 12; // 1.2% annual property tax
            const monthlyInsurance = (homePrice * 0.0035) / 12;  // 0.35% annual insurance

            // Calculate totals
            const totalMonthlyPayment = monthlyPrincipalInterest + monthlyPropertyTax + monthlyInsurance;
            const totalInterestPaid = (monthlyPrincipalInterest * totalMonths) - loanAmount;
            const totalCost = homePrice + totalInterestPaid;

            // Update display
            this.updateDisplay({
                principalInterest: monthlyPrincipalInterest,
                propertyTax: monthlyPropertyTax,
                homeInsurance: monthlyInsurance,
                totalPayment: totalMonthlyPayment,
                loanAmount: loanAmount,
                totalInterest: totalInterestPaid,
                totalCost: totalCost
            });

            // Track analytics
            if (window.PropertyAnalytics) {
                window.PropertyAnalytics.trackEvent('mortgage_calculation', {
                    home_price: homePrice,
                    down_payment: downPayment,
                    loan_term: loanTermYears,
                    interest_rate: annualInterestRate,
                    monthly_payment: totalMonthlyPayment
                });
            }

        } catch (error) {
            console.error('Mortgage calculation error:', error);
            this.displayError('An error occurred while calculating. Please check your inputs.');
        }
    }

    updateDisplay(results) {
        // Update payment breakdown
        this.updateElement('principal-interest', this.formatCurrency(results.principalInterest));
        this.updateElement('property-tax', this.formatCurrency(results.propertyTax));
        this.updateElement('home-insurance', this.formatCurrency(results.homeInsurance));
        this.updateElement('total-payment', this.formatCurrency(results.totalPayment));

        // Update loan summary
        this.updateElement('loan-amount', this.formatCurrency(results.loanAmount));
        this.updateElement('total-interest', this.formatCurrency(results.totalInterest));
        this.updateElement('total-cost', this.formatCurrency(results.totalCost));

        // Add visual feedback
        this.addCalculationAnimation();
    }

    updateElement(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = value;
        }
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(Math.round(amount));
    }

    displayError(message) {
        // Create or update error message
        let errorDiv = document.querySelector('.calculator-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'calculator-error';
            errorDiv.style.cssText = `
                background: #fee2e2;
                color: #dc2626;
                padding: 1rem;
                border-radius: 8px;
                margin: 1rem 0;
                border: 1px solid #fecaca;
                font-weight: 500;
            `;

            const calculatorForm = document.querySelector('.calculator-form');
            if (calculatorForm) {
                calculatorForm.appendChild(errorDiv);
            }
        }

        errorDiv.textContent = message;

        // Remove error after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }

    addCalculationAnimation() {
        // Add subtle animation to results
        const resultCards = document.querySelectorAll('.result-card');
        resultCards.forEach(card => {
            card.style.transform = 'scale(0.98)';
            card.style.transition = 'transform 0.2s ease';

            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 100);
        });
    }

    // Method to get current calculation results (for integration with other features)
    getCurrentResults() {
        const homePrice = parseFloat(document.getElementById('home-price')?.value) || 0;
        const downPayment = parseFloat(document.getElementById('down-payment')?.value) || 0;
        const loanTermYears = parseInt(document.getElementById('loan-term')?.value) || 30;
        const annualInterestRate = parseFloat(document.getElementById('interest-rate')?.value) || 0;

        const loanAmount = homePrice - downPayment;
        const monthlyInterestRate = annualInterestRate / 100 / 12;
        const totalMonths = loanTermYears * 12;

        let monthlyPayment = 0;
        if (monthlyInterestRate > 0) {
            const monthlyFactor = Math.pow(1 + monthlyInterestRate, totalMonths);
            monthlyPayment = loanAmount * (monthlyInterestRate * monthlyFactor) / (monthlyFactor - 1);
        } else {
            monthlyPayment = loanAmount / totalMonths;
        }

        return {
            homePrice,
            downPayment,
            loanAmount,
            monthlyPayment,
            loanTermYears,
            annualInterestRate
        };
    }

    // Method to set values programmatically (useful for property-specific calculations)
    setValues(values) {
        if (values.homePrice) {
            const homePriceInput = document.getElementById('home-price');
            if (homePriceInput) homePriceInput.value = values.homePrice;
        }

        if (values.downPayment) {
            const downPaymentInput = document.getElementById('down-payment');
            if (downPaymentInput) downPaymentInput.value = values.downPayment;
        }

        if (values.loanTerm) {
            const loanTermInput = document.getElementById('loan-term');
            if (loanTermInput) loanTermInput.value = values.loanTerm;
        }

        if (values.interestRate) {
            const interestRateInput = document.getElementById('interest-rate');
            if (interestRateInput) interestRateInput.value = values.interestRate;
        }

        // Recalculate with new values
        this.calculateMortgage();
    }
}

/* =====================================
   Google Maps Integration
   ===================================== */

class PropertyMaps {
    constructor() {
        this.map = null;
        this.directionsService = null;
        this.directionsRenderer = null;
        this.markers = [];
        this.initializeMaps();
    }

    initializeMaps() {
        // Wait for Google Maps API to load
        if (typeof google === 'undefined') {
            // Retry after a short delay if Google Maps isn't loaded yet
            setTimeout(() => this.initializeMaps(), 1000);
            return;
        }

        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer({
            suppressMarkers: false,
            draggable: true
        });
    }

    createMap(containerId, property) {
        if (!property || !property.coordinates) {
            console.warn('Property coordinates not available for map');
            return null;
        }

        const mapContainer = document.getElementById(containerId);
        if (!mapContainer) {
            console.warn(`Map container ${containerId} not found`);
            return null;
        }

        // Create map
        const mapOptions = {
            center: property.coordinates,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
                {
                    featureType: 'poi',
                    elementType: 'labels',
                    stylers: [{ visibility: 'off' }]
                }
            ]
        };

        this.map = new google.maps.Map(mapContainer, mapOptions);

        // Add property marker
        const marker = new google.maps.Marker({
            position: property.coordinates,
            map: this.map,
            title: property.title,
            icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="14" fill="#2563eb" stroke="white" stroke-width="2"/>
                        <text x="16" y="20" text-anchor="middle" fill="white" font-size="16" font-weight="bold">🏠</text>
                    </svg>
                `),
                scaledSize: new google.maps.Size(32, 32)
            }
        });

        this.markers.push(marker);

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="max-width: 200px;">
                    <h4 style="margin: 0 0 8px 0; color: #2563eb;">${property.title}</h4>
                    <p style="margin: 0; color: #666;">${property.location}</p>
                    <p style="margin: 4px 0 0 0; font-weight: bold; color: #059669;">${property.price}</p>
                </div>
            `
        });

        marker.addListener('click', () => {
            infoWindow.open(this.map, marker);
        });

        return this.map;
    }

    calculateDirections(from, to, property) {
        if (!this.directionsService || !this.directionsRenderer) {
            console.warn('Directions service not initialized');
            return;
        }

        const request = {
            origin: from,
            destination: to || property.coordinates,
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            avoidHighways: false,
            avoidTolls: false
        };

        this.directionsService.route(request, (result, status) => {
            if (status === 'OK') {
                this.directionsRenderer.setDirections(result);
                this.directionsRenderer.setMap(this.map);

                // Extract route information
                const route = result.routes[0];
                const leg = route.legs[0];

                // Display route information
                this.displayRouteInfo({
                    distance: leg.distance.text,
                    duration: leg.duration.text,
                    startAddress: leg.start_address,
                    endAddress: leg.end_address
                });

                // Track analytics
                if (window.PropertyAnalytics) {
                    window.PropertyAnalytics.trackEvent('directions_calculated', {
                        property_id: property.id,
                        from_location: from,
                        distance: leg.distance.text,
                        duration: leg.duration.text
                    });
                }
            } else {
                console.error('Directions request failed:', status);
                this.displayRouteError('Unable to calculate directions. Please check your addresses.');
            }
        });
    }

    displayRouteInfo(routeInfo) {
        const routeInfoDiv = document.getElementById('route-info');
        if (routeInfoDiv) {
            routeInfoDiv.innerHTML = `
                <div class="route-summary">
                    <h4>Route Information</h4>
                    <div class="route-details">
                        <div class="route-item">
                            <i class="fas fa-route"></i>
                            <span>Distance: ${routeInfo.distance}</span>
                        </div>
                        <div class="route-item">
                            <i class="fas fa-clock"></i>
                            <span>Duration: ${routeInfo.duration}</span>
                        </div>
                    </div>
                    <div class="route-addresses">
                        <p><strong>From:</strong> ${routeInfo.startAddress}</p>
                        <p><strong>To:</strong> ${routeInfo.endAddress}</p>
                    </div>
                </div>
            `;
            routeInfoDiv.style.display = 'block';
        }
    }

    displayRouteError(message) {
        const routeInfoDiv = document.getElementById('route-info');
        if (routeInfoDiv) {
            routeInfoDiv.innerHTML = `
                <div class="route-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>${message}</span>
                </div>
            `;
            routeInfoDiv.style.display = 'block';
        }
    }

    clearDirections() {
        if (this.directionsRenderer) {
            this.directionsRenderer.setMap(null);
        }
    }

    addNearbyPlaces(property) {
        if (!this.map || !property.coordinates) return;

        const placesService = new google.maps.places.PlacesService(this.map);

        // Search for nearby amenities
        const amenityTypes = ['school', 'hospital', 'grocery_or_supermarket', 'restaurant'];

        amenityTypes.forEach(type => {
            const request = {
                location: property.coordinates,
                radius: 2000, // 2km radius
                type: type
            };

            placesService.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
                    // Add up to 3 nearby places of each type
                    results.slice(0, 3).forEach(place => {
                        const marker = new google.maps.Marker({
                            position: place.geometry.location,
                            map: this.map,
                            title: place.name,
                            icon: {
                                url: `https://maps.google.com/mapfiles/ms/icons/${this.getPlaceIcon(type)}-dot.png`,
                                scaledSize: new google.maps.Size(32, 32)
                            }
                        });

                        const infoWindow = new google.maps.InfoWindow({
                            content: `
                                <div>
                                    <h5>${place.name}</h5>
                                    <p>Rating: ${place.rating || 'N/A'}</p>
                                    <p>${place.vicinity}</p>
                                </div>
                            `
                        });

                        marker.addListener('click', () => {
                            infoWindow.open(this.map, marker);
                        });

                        this.markers.push(marker);
                    });
                }
            });
        });
    }

    getPlaceIcon(type) {
        const iconMap = {
            'school': 'yellow',
            'hospital': 'red',
            'grocery_or_supermarket': 'green',
            'restaurant': 'blue'
        };
        return iconMap[type] || 'purple';
    }

    clearMarkers() {
        this.markers.forEach(marker => {
            marker.setMap(null);
        });
        this.markers = [];
    }
}

/* =====================================
   Virtual Tour Features
   ===================================== */

class VirtualTourManager {
    constructor() {
        this.currentTour = null;
        this.tourData = new Map();
        this.initializeVirtualTours();
    }

    initializeVirtualTours() {
        // Generate sample virtual tour data for properties
        this.generateSampleTourData();
    }

    generateSampleTourData() {
        // Sample virtual tour data for each property
        const tourTypes = ['360_photo', '3d_model', 'video_tour', 'interactive'];

        // This would typically come from a backend API
        for (let i = 1; i <= 10; i++) {
            this.tourData.set(i, {
                property_id: i,
                tours: {
                    '360_photo': {
                        available: true,
                        url: `https://example.com/360-tour/${i}`,
                        title: '360° Photo Tour'
                    },
                    '3d_model': {
                        available: Math.random() > 0.3, // 70% availability
                        url: `https://example.com/3d-tour/${i}`,
                        title: '3D Virtual Tour'
                    },
                    'video_tour': {
                        available: Math.random() > 0.5, // 50% availability
                        url: `https://example.com/video-tour/${i}`,
                        title: 'Video Walkthrough'
                    },
                    'interactive': {
                        available: Math.random() > 0.7, // 30% availability
                        url: `https://example.com/interactive-tour/${i}`,
                        title: 'Interactive Floor Plan'
                    }
                }
            });
        }
    }

    createVirtualTourSection(propertyId) {
        const tourData = this.tourData.get(propertyId);
        if (!tourData) return '';

        const availableTours = Object.entries(tourData.tours)
            .filter(([type, tour]) => tour.available);

        if (availableTours.length === 0) return '';

        const tourButtons = availableTours.map(([type, tour]) => `
            <button class="tour-btn" onclick="window.VirtualTours.startTour('${propertyId}', '${type}')">
                <i class="fas ${this.getTourIcon(type)}"></i>
                ${tour.title}
            </button>
        `).join('');

        return `
            <div class="virtual-tour-section">
                <h3>Virtual Tours Available</h3>
                <div class="virtual-tour-buttons">
                    ${tourButtons}
                </div>
            </div>
        `;
    }

    getTourIcon(type) {
        const iconMap = {
            '360_photo': 'fa-camera',
            '3d_model': 'fa-cube',
            'video_tour': 'fa-play-circle',
            'interactive': 'fa-mouse-pointer'
        };
        return iconMap[type] || 'fa-eye';
    }

    startTour(propertyId, tourType) {
        const tourData = this.tourData.get(parseInt(propertyId));
        if (!tourData || !tourData.tours[tourType]?.available) {
            this.showError('Virtual tour not available');
            return;
        }

        const tour = tourData.tours[tourType];

        // Track analytics
        if (window.PropertyAnalytics) {
            window.PropertyAnalytics.trackEvent('virtual_tour_started', {
                property_id: propertyId,
                tour_type: tourType,
                tour_title: tour.title
            });
        }

        // Create tour modal
        this.createTourModal(tour, propertyId, tourType);
    }

    createTourModal(tour, propertyId, tourType) {
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'virtual-tour-modal-overlay';
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
        `;

        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'virtual-tour-modal-content';
        modalContent.style.cssText = `
            background: white;
            border-radius: 16px;
            padding: 2rem;
            max-width: 90vw;
            max-height: 90vh;
            position: relative;
            text-align: center;
        `;

        // Create close button
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        closeButton.style.cssText = `
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: #f1f5f9;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 1.2rem;
            color: #64748b;
        `;

        closeButton.addEventListener('click', () => {
            document.body.removeChild(modalOverlay);
        });

        // Create tour content based on type
        const tourContent = this.createTourContent(tour, tourType);

        modalContent.appendChild(closeButton);
        modalContent.appendChild(tourContent);
        modalOverlay.appendChild(modalContent);

        // Close on overlay click
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                document.body.removeChild(modalOverlay);
            }
        });

        // Add to DOM
        document.body.appendChild(modalOverlay);
    }

    createTourContent(tour, tourType) {
        const container = document.createElement('div');
        container.style.cssText = 'width: 100%; height: 500px;';

        switch (tourType) {
            case '360_photo':
                container.innerHTML = `
                    <h3 style="margin-bottom: 1rem;">${tour.title}</h3>
                    <div style="width: 100%; height: 400px; background: linear-gradient(45deg, #667eea, #764ba2); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white;">
                        <div style="text-align: center;">
                            <i class="fas fa-camera" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                            <p>360° Photo Tour would load here</p>
                            <p style="font-size: 0.9rem; opacity: 0.8;">This is a demo placeholder</p>
                        </div>
                    </div>
                `;
                break;

            case '3d_model':
                container.innerHTML = `
                    <h3 style="margin-bottom: 1rem;">${tour.title}</h3>
                    <div style="width: 100%; height: 400px; background: linear-gradient(45deg, #11998e, #38ef7d); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white;">
                        <div style="text-align: center;">
                            <i class="fas fa-cube" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                            <p>3D Virtual Tour would load here</p>
                            <p style="font-size: 0.9rem; opacity: 0.8;">This is a demo placeholder</p>
                        </div>
                    </div>
                `;
                break;

            case 'video_tour':
                container.innerHTML = `
                    <h3 style="margin-bottom: 1rem;">${tour.title}</h3>
                    <div style="width: 100%; height: 400px; background: linear-gradient(45deg, #fc466b, #3f5efb); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white;">
                        <div style="text-align: center;">
                            <i class="fas fa-play-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                            <p>Video Walkthrough would play here</p>
                            <p style="font-size: 0.9rem; opacity: 0.8;">This is a demo placeholder</p>
                        </div>
                    </div>
                `;
                break;

            case 'interactive':
                container.innerHTML = `
                    <h3 style="margin-bottom: 1rem;">${tour.title}</h3>
                    <div style="width: 100%; height: 400px; background: linear-gradient(45deg, #ffecd2, #fcb69f); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #333;">
                        <div style="text-align: center;">
                            <i class="fas fa-mouse-pointer" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                            <p>Interactive Floor Plan would load here</p>
                            <p style="font-size: 0.9rem; opacity: 0.8;">This is a demo placeholder</p>
                        </div>
                    </div>
                `;
                break;

            default:
                container.innerHTML = `
                    <h3>Virtual Tour</h3>
                    <p>Tour content would load here</p>
                `;
        }

        return container;
    }

    showError(message) {
        // Create simple error notification
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #fee2e2;
            color: #dc2626;
            padding: 1rem;
            border-radius: 8px;
            border: 1px solid #fecaca;
            z-index: 10001;
            font-weight: 500;
        `;
        errorDiv.textContent = message;

        document.body.appendChild(errorDiv);

        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 3000);
    }
}

/* =====================================
   Global Initialization
   ===================================== */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mortgage calculator
    if (document.getElementById('mortgage-calculator')) {
        window.MortgageCalc = new MortgageCalculator();
    }

    // Initialize virtual tours
    window.VirtualTours = new VirtualTourManager();
});

// Initialize Google Maps when API is loaded
function initMap() {
    window.PropertyMaps = new PropertyMaps();
}

// Make classes globally available
window.MortgageCalculator = MortgageCalculator;
window.PropertyMaps = PropertyMaps;
window.VirtualTourManager = VirtualTourManager;