/**
 * Simple Real Estate Page - Essential Functionality Only
 * Clean, lightweight implementation without analytics or dark mode
 */

class SimpleRealEstateApp {
    constructor() {
        this.properties = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        console.log('🏠 Initializing Simple Real Estate Page...');

        // Setup navigation
        this.setupNavigation();

        // Setup property filtering
        this.setupPropertyFilters();

        // Load property data
        this.loadProperties();

        // Setup mortgage calculator
        this.setupMortgageCalculator();

        // Setup contact form
        this.setupContactForm();

        console.log('✅ Simple Real Estate Page initialized successfully!');
    }

    setupNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
                navToggle.setAttribute('aria-expanded', !isExpanded);
                navMenu.classList.toggle('active');
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupPropertyFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-pressed', 'false');
                });
                button.classList.add('active');
                button.setAttribute('aria-pressed', 'true');

                // Apply filter
                this.currentFilter = button.getAttribute('data-filter');
                this.filterProperties();
            });
        });
    }

    loadProperties() {
        // Sample property data
        this.properties = [
            {
                id: 1,
                title: "Modern Downtown Condo",
                location: "Downtown District",
                price: "$750,000",
                type: "condo",
                bedrooms: 2,
                bathrooms: 2,
                sqft: 1200,
                image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
                badge: "New"
            },
            {
                id: 2,
                title: "Luxury Family Home",
                location: "Suburban Heights",
                price: "$1,250,000",
                type: "house",
                bedrooms: 4,
                bathrooms: 3,
                sqft: 2800,
                image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
                badge: "Featured"
            },
            {
                id: 3,
                title: "Cozy Urban Apartment",
                location: "Arts District",
                price: "$450,000",
                type: "apartment",
                bedrooms: 1,
                bathrooms: 1,
                sqft: 800,
                image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
                badge: "Affordable"
            },
            {
                id: 4,
                title: "Spacious Townhouse",
                location: "Riverside Community",
                price: "$685,000",
                type: "townhouse",
                bedrooms: 3,
                bathrooms: 2.5,
                sqft: 1800,
                image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop"
            },
            {
                id: 5,
                title: "Executive Penthouse",
                location: "Financial District",
                price: "$2,100,000",
                type: "condo",
                bedrooms: 3,
                bathrooms: 3,
                sqft: 2200,
                image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=300&fit=crop",
                badge: "Luxury"
            },
            {
                id: 6,
                title: "Charming Starter Home",
                location: "Garden Village",
                price: "$395,000",
                type: "house",
                bedrooms: 2,
                bathrooms: 2,
                sqft: 1100,
                image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
                badge: "Starter"
            }
        ];

        this.renderProperties();
    }

    filterProperties() {
        const filtered = this.currentFilter === 'all'
            ? this.properties
            : this.properties.filter(property => property.type === this.currentFilter);

        this.renderProperties(filtered);

        // Update status for screen readers
        const statusElement = document.getElementById('property-grid-status');
        if (statusElement) {
            statusElement.textContent = `Showing ${filtered.length} ${this.currentFilter === 'all' ? '' : this.currentFilter} properties`;
        }
    }

    renderProperties(propertiesToShow = this.properties) {
        const grid = document.getElementById('property-grid');
        if (!grid) return;

        grid.innerHTML = propertiesToShow.map(property => `
            <div class="property-card" data-type="${property.type}" data-property-id="${property.id}">
                <div class="property-image">
                    <img src="${property.image}" alt="${property.title} - ${property.location}" loading="lazy">
                    ${property.badge ? `<span class="property-badge">${property.badge}</span>` : ''}
                    <div class="property-price">${property.price}</div>
                </div>
                <div class="property-content">
                    <h3 class="property-title">${property.title}</h3>
                    <div class="property-location">
                        <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                        ${property.location}
                    </div>
                    <div class="property-features">
                        <div class="property-feature">
                            <i class="fas fa-bed" aria-hidden="true"></i>
                            <span>${property.bedrooms} bed</span>
                        </div>
                        <div class="property-feature">
                            <i class="fas fa-bath" aria-hidden="true"></i>
                            <span>${property.bathrooms} bath</span>
                        </div>
                        <div class="property-feature">
                            <i class="fas fa-ruler-combined" aria-hidden="true"></i>
                            <span>${property.sqft} sqft</span>
                        </div>
                    </div>
                    <div class="property-actions">
                        <button class="btn btn-primary" onclick="app.viewProperty(${property.id})">
                            View Details
                        </button>
                        <button class="btn-icon" onclick="app.saveProperty(${property.id})" title="Save property">
                            <i class="fas fa-heart" aria-hidden="true"></i>
                        </button>
                        <button class="btn-icon" onclick="app.shareProperty(${property.id})" title="Share property">
                            <i class="fas fa-share" aria-hidden="true"></i>
                        </button>
                        <button class="btn-icon" onclick="app.getDirections(${property.id})" title="Get directions">
                            <i class="fas fa-map-marked-alt" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    viewProperty(id) {
        const property = this.properties.find(p => p.id === id);
        if (property) {
            alert(`Viewing ${property.title}\nPrice: ${property.price}\nLocation: ${property.location}\n\nFeature: ${property.bedrooms} bed, ${property.bathrooms} bath, ${property.sqft} sqft`);
        }
    }

    saveProperty(id) {
        const property = this.properties.find(p => p.id === id);
        if (property) {
            alert(`${property.title} saved to your favorites!`);
        }
    }

    shareProperty(id) {
        const property = this.properties.find(p => p.id === id);
        if (property) {
            if (navigator.share) {
                navigator.share({
                    title: property.title,
                    text: `Check out this property: ${property.title} in ${property.location}`,
                    url: window.location.href
                });
            } else {
                // Fallback for browsers without Web Share API
                alert(`Share: ${property.title} - ${property.price}`);
            }
        }
    }

    getDirections(id) {
        const property = this.properties.find(p => p.id === id);
        if (property) {
            // Open Google Maps with directions
            const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(property.location)}`;
            window.open(mapsUrl, '_blank');
        }
    }

    setupMortgageCalculator() {
        const calculateBtn = document.getElementById('calculate-mortgage');
        if (!calculateBtn) return;

        calculateBtn.addEventListener('click', () => {
            const homePrice = parseFloat(document.getElementById('home-price').value) || 0;
            const downPayment = parseFloat(document.getElementById('down-payment').value) || 0;
            const loanTerm = parseFloat(document.getElementById('loan-term').value) || 30;
            const interestRate = parseFloat(document.getElementById('interest-rate').value) || 6.5;

            if (homePrice <= 0) {
                alert('Please enter a valid home price');
                return;
            }

            const loanAmount = homePrice - downPayment;
            const monthlyRate = interestRate / 100 / 12;
            const numPayments = loanTerm * 12;

            // Calculate monthly payment using loan formula
            const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                                 (Math.pow(1 + monthlyRate, numPayments) - 1);

            // Estimate property tax (1.2% annually) and insurance (0.5% annually)
            const propertyTax = (homePrice * 0.012) / 12;
            const insurance = (homePrice * 0.005) / 12;
            const totalMonthly = monthlyPayment + propertyTax + insurance;
            const totalInterest = (monthlyPayment * numPayments) - loanAmount;
            const totalCost = downPayment + (monthlyPayment * numPayments);

            // Update results
            document.getElementById('principal-interest').textContent = `$${monthlyPayment.toLocaleString('en-US', {maximumFractionDigits: 0})}`;
            document.getElementById('property-tax').textContent = `$${propertyTax.toLocaleString('en-US', {maximumFractionDigits: 0})}`;
            document.getElementById('home-insurance').textContent = `$${insurance.toLocaleString('en-US', {maximumFractionDigits: 0})}`;
            document.getElementById('total-payment').textContent = `$${totalMonthly.toLocaleString('en-US', {maximumFractionDigits: 0})}`;
            document.getElementById('loan-amount').textContent = `$${loanAmount.toLocaleString('en-US', {maximumFractionDigits: 0})}`;
            document.getElementById('total-interest').textContent = `$${totalInterest.toLocaleString('en-US', {maximumFractionDigits: 0})}`;
            document.getElementById('total-cost').textContent = `$${totalCost.toLocaleString('en-US', {maximumFractionDigits: 0})}`;
        });
    }

    setupContactForm() {
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            if (!this.isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'var(--success-color)';

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    contactForm.reset();
                    alert('Thank you for your message! We will get back to you soon.');
                }, 2000);
            }, 1500);
        });
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SimpleRealEstateApp();
});

console.log('🚀 Simple Real Estate Application loaded successfully!');