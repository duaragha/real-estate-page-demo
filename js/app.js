// Main Application JavaScript
class RealEstateApp {
    constructor() {
        this.currentFilter = 'all';
        this.currentPage = 1;
        this.itemsPerPage = 6;
        this.filteredProperties = [];
        this.isLoading = false;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadInitialProperties();
        this.setupScrollAnimations();
        this.setupMobileNavigation();
        this.setupModal();
        this.setupSearch();
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Property filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilterClick(e));
        });

        // Load more button
        const loadMoreBtn = document.getElementById('load-more');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMoreProperties());
        }

        // Search form
        const searchForm = document.querySelector('.search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => this.handleSearchSubmit(e));
        }

        // Contact form
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));
        }

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Window resize handler
        window.addEventListener('resize', () => this.handleResize());

        // Scroll handler for header
        window.addEventListener('scroll', () => this.handleScroll());
    }

    // Load initial properties
    loadInitialProperties() {
        this.filteredProperties = PropertyDataUtils.getAllProperties();
        this.renderProperties();
    }

    // Handle filter button clicks
    handleFilterClick(e) {
        e.preventDefault();

        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Apply filter
        this.currentFilter = e.target.dataset.filter;
        this.currentPage = 1;

        if (this.currentFilter === 'all') {
            this.filteredProperties = PropertyDataUtils.getAllProperties();
        } else {
            this.filteredProperties = PropertyDataUtils.filterProperties({
                type: this.currentFilter
            });
        }

        this.renderProperties();
    }

    // Handle search form submission
    handleSearchSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const filters = {
            location: formData.get('location'),
            type: formData.get('property-type'),
            priceRange: formData.get('price-range')
        };

        // Remove empty filters
        Object.keys(filters).forEach(key => {
            if (!filters[key] || filters[key] === '') {
                delete filters[key];
            }
        });

        this.filteredProperties = PropertyDataUtils.filterProperties(filters);
        this.renderProperties();

        // Scroll to results
        document.getElementById('properties').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Show search results message
        this.showSearchResults(Object.keys(filters).length > 0);
    }

    // Handle contact form submission
    handleContactSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const contactData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message')
        };

        // Simulate form submission
        this.showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        e.target.reset();
    }

    // Handle navigation clicks
    handleNavClick(e) {
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        e.target.classList.add('active');

        // Close mobile menu if open
        this.closeMobileMenu();
    }

    // Render properties
    renderProperties() {
        const propertyGrid = document.getElementById('property-grid');
        if (!propertyGrid) return;

        // Show loading state
        propertyGrid.innerHTML = this.createLoadingHTML();

        // Simulate loading delay for better UX
        setTimeout(() => {
            const propertiesToShow = this.filteredProperties.slice(0, this.currentPage * this.itemsPerPage);

            if (propertiesToShow.length === 0) {
                propertyGrid.innerHTML = this.createNoResultsHTML();
            } else {
                propertyGrid.innerHTML = propertiesToShow.map(property =>
                    this.createPropertyCardHTML(property)
                ).join('');
            }

            // Update load more button
            this.updateLoadMoreButton();

            // Setup property card event listeners
            this.setupPropertyCardListeners();

            // Animate in the new cards
            this.animatePropertyCards();
        }, 300);
    }

    // Create property card HTML
    createPropertyCardHTML(property) {
        const formattedPrice = PropertyDataUtils.formatPrice(property.price);
        const formattedArea = PropertyDataUtils.formatArea(property.area);
        const typeIcon = PropertyDataUtils.getPropertyTypeIcon(property.type);

        return `
            <div class="property-card fade-in" data-property-id="${property.id}">
                <div class="property-image">
                    <img src="${property.images[0]}" alt="${property.title}" loading="lazy">
                    ${property.featured ? '<div class="property-badge">Featured</div>' : ''}
                    <div class="property-price">${formattedPrice}</div>
                </div>
                <div class="property-content">
                    <h3 class="property-title">${property.title}</h3>
                    <div class="property-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${property.location}
                    </div>
                    <div class="property-features">
                        <div class="property-feature">
                            <i class="fas fa-bed"></i>
                            ${property.bedrooms} Beds
                        </div>
                        <div class="property-feature">
                            <i class="fas fa-bath"></i>
                            ${property.bathrooms} Baths
                        </div>
                        <div class="property-feature">
                            <i class="fas fa-ruler-combined"></i>
                            ${formattedArea}
                        </div>
                    </div>
                    <div class="property-actions">
                        <button class="btn btn-primary view-details" data-property-id="${property.id}">
                            View Details
                        </button>
                        <button class="btn-icon save-property" data-property-id="${property.id}" aria-label="Save property">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="btn-icon share-property" data-property-id="${property.id}" aria-label="Share property">
                            <i class="fas fa-share-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Create loading HTML
    createLoadingHTML() {
        return Array(6).fill().map(() => `
            <div class="property-card loading">
                <div class="property-image" style="background: #f7fafc;"></div>
                <div class="property-content">
                    <div style="height: 24px; background: #e2e8f0; margin-bottom: 8px; border-radius: 4px;"></div>
                    <div style="height: 16px; background: #e2e8f0; margin-bottom: 16px; border-radius: 4px; width: 70%;"></div>
                    <div style="height: 40px; background: #e2e8f0; border-radius: 4px;"></div>
                </div>
            </div>
        `).join('');
    }

    // Create no results HTML
    createNoResultsHTML() {
        return `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-search" style="font-size: 3rem; color: #e2e8f0; margin-bottom: 20px;"></i>
                <h3 style="margin-bottom: 12px; color: #4a5568;">No Properties Found</h3>
                <p style="color: #718096; margin-bottom: 24px;">Try adjusting your search criteria or browse all properties.</p>
                <button class="btn btn-primary" onclick="realEstateApp.resetFilters()">View All Properties</button>
            </div>
        `;
    }

    // Setup property card event listeners
    setupPropertyCardListeners() {
        // View details buttons
        document.querySelectorAll('.view-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const propertyId = e.target.dataset.propertyId;
                this.showPropertyModal(propertyId);
            });
        });

        // Save property buttons
        document.querySelectorAll('.save-property').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleSaveProperty(e.target.closest('.save-property'));
            });
        });

        // Share property buttons
        document.querySelectorAll('.share-property').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const propertyId = e.target.closest('.share-property').dataset.propertyId;
                this.shareProperty(propertyId);
            });
        });

        // Property card clicks
        document.querySelectorAll('.property-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.property-actions')) {
                    const propertyId = card.dataset.propertyId;
                    this.showPropertyModal(propertyId);
                }
            });
        });
    }

    // Load more properties
    loadMoreProperties() {
        this.currentPage++;
        this.renderProperties();
    }

    // Update load more button
    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more');
        if (!loadMoreBtn) return;

        const totalShown = this.currentPage * this.itemsPerPage;
        const hasMore = totalShown < this.filteredProperties.length;

        if (hasMore) {
            loadMoreBtn.style.display = 'inline-flex';
            loadMoreBtn.textContent = `Load More Properties (${this.filteredProperties.length - totalShown} remaining)`;
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }

    // Show property modal
    showPropertyModal(propertyId) {
        const property = PropertyDataUtils.getPropertyById(propertyId);
        if (!property) return;

        const modal = document.getElementById('property-modal');
        const modalBody = document.getElementById('modal-body');

        modalBody.innerHTML = this.createPropertyModalHTML(property);

        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Setup modal image gallery
        this.setupModalImageGallery(property.images);

        // Setup contact agent button
        this.setupContactAgentButton(property.agent);

        // Initialize Google Map for the property
        setTimeout(() => {
            if (window.PropertyMaps && property.coordinates) {
                const mapContainerId = `property-map-${propertyId}`;
                window.PropertyMaps.createMap(mapContainerId, property);
            }
        }, 500);

        // Track property view
        if (window.PropertyAnalytics) {
            window.PropertyAnalytics.trackEvent('property_modal_viewed', {
                property_id: propertyId,
                property_title: property.title,
                property_price: property.price
            });
        }
    }

    // Create property modal HTML
    createPropertyModalHTML(property) {
        const formattedPrice = PropertyDataUtils.formatPrice(property.price);
        const formattedArea = PropertyDataUtils.formatArea(property.area);

        return `
            <div class="property-modal-content">
                <div class="property-modal-gallery">
                    <div class="main-image">
                        <img src="${property.images[0]}" alt="${property.title}" id="modal-main-image">
                    </div>
                    <div class="image-thumbnails">
                        ${property.images.map((img, index) => `
                            <img src="${img}" alt="Property image ${index + 1}"
                                 class="thumbnail ${index === 0 ? 'active' : ''}"
                                 data-index="${index}">
                        `).join('')}
                    </div>
                </div>

                <div class="property-modal-details">
                    <div class="property-modal-header">
                        <h2 class="modal-title" id="modal-title">${property.title}</h2>
                        <div class="property-modal-price">${formattedPrice}</div>
                    </div>

                    <div class="property-modal-info">
                        <div class="property-modal-location">
                            <i class="fas fa-map-marker-alt"></i>
                            ${property.address}
                        </div>

                        <div class="property-modal-features">
                            <div class="feature">
                                <i class="fas fa-bed"></i>
                                <span>${property.bedrooms} Bedrooms</span>
                            </div>
                            <div class="feature">
                                <i class="fas fa-bath"></i>
                                <span>${property.bathrooms} Bathrooms</span>
                            </div>
                            <div class="feature">
                                <i class="fas fa-ruler-combined"></i>
                                <span>${formattedArea}</span>
                            </div>
                            <div class="feature">
                                <i class="fas fa-calendar"></i>
                                <span>Built ${property.yearBuilt}</span>
                            </div>
                        </div>

                        <div class="property-modal-description">
                            <h3>Description</h3>
                            <p>${property.description}</p>
                        </div>

                        <div class="property-modal-amenities">
                            <h3>Features & Amenities</h3>
                            <div class="amenities-grid">
                                ${property.features.map(feature => `
                                    <div class="amenity-item">
                                        <i class="fas fa-check"></i>
                                        ${feature}
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="property-modal-agent">
                            <h3>Contact Agent</h3>
                            <div class="agent-card">
                                <img src="${property.agent.image}" alt="${property.agent.name}" class="agent-photo">
                                <div class="agent-info">
                                    <h4>${property.agent.name}</h4>
                                    <p class="agent-contact">
                                        <i class="fas fa-phone"></i>
                                        <a href="tel:${property.agent.phone}">${property.agent.phone}</a>
                                    </p>
                                    <p class="agent-contact">
                                        <i class="fas fa-envelope"></i>
                                        <a href="mailto:${property.agent.email}">${property.agent.email}</a>
                                    </p>
                                    <button class="btn btn-primary contact-agent">Contact Agent</button>
                                </div>
                            </div>
                        </div>

                        ${window.VirtualTours ? window.VirtualTours.createVirtualTourSection(property.id) : ''}

                        <div class="property-modal-map">
                            <h3>Location & Directions</h3>
                            <div class="map-container">
                                <div id="property-map-${property.id}" class="property-map"></div>
                                <div class="map-controls">
                                    <button class="map-control-btn" title="Show nearby amenities" onclick="window.PropertyMaps?.addNearbyPlaces(${JSON.stringify(property).replace(/"/g, '&quot;')})">
                                        <i class="fas fa-map-marker"></i>
                                    </button>
                                    <button class="map-control-btn" title="Clear directions" onclick="window.PropertyMaps?.clearDirections()">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="directions-panel">
                                <div class="directions-form">
                                    <input type="text" class="directions-input" placeholder="Enter your address for directions" id="directions-from-${property.id}">
                                    <button class="directions-btn" onclick="app.calculateDirections(${property.id})">
                                        <i class="fas fa-route"></i> Get Directions
                                    </button>
                                </div>
                                <div id="route-info" style="display: none;"></div>
                            </div>
                        </div>

                        <div class="property-modal-mortgage">
                            <h3>Mortgage Calculator</h3>
                            <div class="mortgage-quick-calc">
                                <p>Estimated monthly payment for this property:</p>
                                <button class="btn btn-outline" onclick="app.calculateMortgageForProperty(${property.id}, ${property.price})">
                                    <i class="fas fa-calculator"></i> Calculate Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Setup modal functionality
    setupModal() {
        const modal = document.getElementById('property-modal');

        // Close modal handlers
        document.querySelectorAll('[data-close-modal]').forEach(btn => {
            btn.addEventListener('click', () => this.closeModal());
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                this.closeModal();
            }
        });
    }

    // Close modal
    closeModal() {
        const modal = document.getElementById('property-modal');
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Setup modal image gallery
    setupModalImageGallery(images) {
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImage = document.getElementById('modal-main-image');

        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);

                // Update main image
                mainImage.src = images[index];

                // Update active thumbnail
                thumbnails.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    // Setup mobile navigation
    setupMobileNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                const isOpen = navMenu.classList.contains('active');

                if (isOpen) {
                    this.closeMobileMenu();
                } else {
                    this.openMobileMenu();
                }
            });
        }
    }

    // Open mobile menu
    openMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');

        navMenu.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    // Close mobile menu
    closeMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');

        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    // Setup search functionality
    setupSearch() {
        const searchInputs = document.querySelectorAll('.search-input');

        searchInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                // Add search suggestions functionality here if needed
            });
        });
    }

    // Setup scroll animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            observer.observe(el);
        });
    }

    // Animate property cards
    animatePropertyCards() {
        const cards = document.querySelectorAll('.property-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        });
    }

    // Handle scroll events
    handleScroll() {
        const header = document.querySelector('.header');
        const scrollTop = window.pageYOffset;

        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }
    }

    // Handle window resize
    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    }

    // Toggle save property
    toggleSaveProperty(button) {
        const icon = button.querySelector('i');
        const propertyId = button.dataset.propertyId;

        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            button.style.color = '#e53e3e';
            this.showNotification('Property saved to favorites!', 'success');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            button.style.color = '';
            this.showNotification('Property removed from favorites.', 'info');
        }
    }

    // Share property
    shareProperty(propertyId) {
        const property = PropertyDataUtils.getPropertyById(propertyId);
        if (!property) return;

        if (navigator.share) {
            navigator.share({
                title: property.title,
                text: `Check out this amazing property: ${property.title}`,
                url: window.location.href + `#property-${propertyId}`
            });
        } else {
            // Fallback to copying URL
            const url = window.location.href + `#property-${propertyId}`;
            navigator.clipboard.writeText(url).then(() => {
                this.showNotification('Property link copied to clipboard!', 'success');
            });
        }
    }

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Show search results message
    showSearchResults(hasFilters) {
        const resultsCount = this.filteredProperties.length;
        const message = hasFilters ?
            `Found ${resultsCount} properties matching your criteria` :
            `Showing all ${resultsCount} properties`;

        this.showNotification(message, 'info');
    }

    // Reset filters
    resetFilters() {
        this.currentFilter = 'all';
        this.currentPage = 1;
        this.filteredProperties = PropertyDataUtils.getAllProperties();

        // Reset UI
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');

        // Reset search form
        const searchForm = document.querySelector('.search-form');
        if (searchForm) {
            searchForm.reset();
        }

        this.renderProperties();
    }

    // Setup contact agent button
    setupContactAgentButton(agent) {
        const contactBtn = document.querySelector('.contact-agent');
        if (contactBtn) {
            contactBtn.addEventListener('click', () => {
                // Scroll to contact section and pre-fill with agent info
                this.closeModal();
                setTimeout(() => {
                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });

                    // Pre-fill message
                    const messageField = document.getElementById('message');
                    if (messageField) {
                        messageField.value = `Hi ${agent.name}, I'm interested in learning more about this property. Please contact me with additional details.`;
                    }
                }, 500);
            });
        }
    }

    // Calculate directions for a property
    calculateDirections(propertyId) {
        const property = PropertyDataUtils.getPropertyById(propertyId);
        if (!property) {
            console.error('Property not found:', propertyId);
            return;
        }

        const fromInput = document.getElementById(`directions-from-${propertyId}`);
        if (!fromInput) {
            console.error('Directions input not found');
            return;
        }

        const fromAddress = fromInput.value.trim();
        if (!fromAddress) {
            this.showNotification('Please enter your address', 'error');
            return;
        }

        // Initialize PropertyMaps if not already done
        if (!window.PropertyMaps) {
            this.showNotification('Maps service not available', 'error');
            return;
        }

        // Calculate directions
        window.PropertyMaps.calculateDirections(fromAddress, property.coordinates, property);

        // Track analytics
        if (window.PropertyAnalytics) {
            window.PropertyAnalytics.trackEvent('directions_requested', {
                property_id: propertyId,
                from_address: fromAddress,
                to_address: property.address
            });
        }
    }

    // Calculate mortgage for a specific property
    calculateMortgageForProperty(propertyId, propertyPrice) {
        // Navigate to mortgage calculator section
        const mortgageSection = document.getElementById('mortgage-calculator');
        if (mortgageSection) {
            mortgageSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Set property price in mortgage calculator
        setTimeout(() => {
            if (window.MortgageCalc) {
                // Calculate 20% down payment
                const downPayment = Math.round(propertyPrice * 0.2);

                window.MortgageCalc.setValues({
                    homePrice: propertyPrice,
                    downPayment: downPayment
                });

                this.showNotification('Mortgage calculator updated with property price', 'success');
            }
        }, 500);

        // Track analytics
        if (window.PropertyAnalytics) {
            window.PropertyAnalytics.trackEvent('mortgage_calculation_requested', {
                property_id: propertyId,
                property_price: propertyPrice
            });
        }

        // Close modal after a short delay
        setTimeout(() => {
            this.closeModal();
        }, 1000);
    }

}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.realEstateApp = new RealEstateApp();
    window.app = window.realEstateApp; // Make app globally accessible
});

// Add notification styles dynamically
const notificationStyles = `
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        padding: 16px 20px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 2001;
        max-width: 300px;
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .notification-success .notification-content i {
        color: #48bb78;
    }

    .notification-error .notification-content i {
        color: #e53e3e;
    }

    .notification-info .notification-content i {
        color: #667eea;
    }

    .property-modal-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
        min-height: 500px;
    }

    .property-modal-gallery {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .main-image img {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 8px;
    }

    .image-thumbnails {
        display: flex;
        gap: 8px;
        overflow-x: auto;
    }

    .thumbnail {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 4px;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s ease;
        flex-shrink: 0;
    }

    .thumbnail.active,
    .thumbnail:hover {
        opacity: 1;
    }

    .property-modal-header {
        margin-bottom: 24px;
    }

    .property-modal-price {
        font-size: 1.5rem;
        font-weight: 600;
        color: #667eea;
        margin-top: 8px;
    }

    .property-modal-location {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #718096;
        margin-bottom: 20px;
    }

    .property-modal-features {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-bottom: 24px;
    }

    .property-modal-features .feature {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #4a5568;
    }

    .property-modal-features .feature i {
        color: #667eea;
        width: 16px;
    }

    .property-modal-description,
    .property-modal-amenities,
    .property-modal-agent {
        margin-bottom: 24px;
    }

    .property-modal-description h3,
    .property-modal-amenities h3,
    .property-modal-agent h3 {
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 12px;
        color: #2d3748;
    }

    .amenities-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
    }

    .amenity-item {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #4a5568;
        font-size: 14px;
    }

    .amenity-item i {
        color: #48bb78;
        font-size: 12px;
    }

    .agent-card {
        display: flex;
        gap: 16px;
        background: #f7fafc;
        padding: 20px;
        border-radius: 8px;
    }

    .agent-photo {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
    }

    .agent-info h4 {
        margin-bottom: 8px;
        color: #2d3748;
    }

    .agent-contact {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 4px;
        font-size: 14px;
        color: #4a5568;
    }

    .agent-contact i {
        color: #667eea;
        width: 12px;
    }

    .agent-contact a {
        color: #667eea;
    }

    .contact-agent {
        margin-top: 12px;
    }

    @media (max-width: 768px) {
        .property-modal-content {
            grid-template-columns: 1fr;
        }

        .property-modal-features {
            grid-template-columns: 1fr;
        }

        .amenities-grid {
            grid-template-columns: 1fr;
        }

        .notification {
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Initialize Analytics Integration
class AnalyticsIntegration {
    constructor() {
        this.setupAnalyticsTracking();
        this.setupPropertyTracking();
        this.setupSearchTracking();
    }

    setupAnalyticsTracking() {
        // Track property card interactions
        document.addEventListener('click', (event) => {
            const propertyCard = event.target.closest('.property-card');
            if (propertyCard) {
                const propertyId = parseInt(propertyCard.dataset.propertyId);
                if (propertyId && window.propertyAnalytics) {
                    window.propertyAnalytics.updatePropertyAnalytics(propertyId, 'view');
                }

                // Track specific interactions
                if (event.target.closest('.property-save')) {
                    window.propertyAnalytics?.updatePropertyAnalytics(propertyId, 'save');
                } else if (event.target.closest('.property-share')) {
                    window.propertyAnalytics?.updatePropertyAnalytics(propertyId, 'share');
                } else if (event.target.closest('.property-directions')) {
                    window.propertyAnalytics?.updatePropertyAnalytics(propertyId, 'directions');
                }
            }
        });

        // Track modal interactions
        document.addEventListener('click', (event) => {
            if (event.target.closest('[data-property-id]')) {
                const propertyId = parseInt(event.target.closest('[data-property-id]').dataset.propertyId);
                if (propertyId && window.analyticsCore) {
                    window.analyticsCore.trackPropertyEvent(propertyId, 'modal_view', {
                        element: event.target.className,
                        timestamp: new Date().toISOString()
                    });
                }
            }
        });
    }

    setupPropertyTracking() {
        // Track property interactions with detailed analytics
        const propertyActions = {
            '.property-image': 'image_view',
            '.property-price': 'price_view',
            '.property-title': 'title_click',
            '.property-location': 'location_click',
            '.contact-agent': 'contact_agent',
            '.view-details': 'view_details'
        };

        Object.entries(propertyActions).forEach(([selector, action]) => {
            document.addEventListener('click', (event) => {
                if (event.target.matches(selector) || event.target.closest(selector)) {
                    const propertyCard = event.target.closest('.property-card');
                    if (propertyCard) {
                        const propertyId = parseInt(propertyCard.dataset.propertyId);
                        if (propertyId && window.analyticsCore) {
                            window.analyticsCore.trackPropertyEvent(propertyId, action, {
                                element: selector,
                                timestamp: new Date().toISOString()
                            });
                        }
                    }
                }
            });
        });
    }

    setupSearchTracking() {
        // Track search form submissions
        const searchForm = document.querySelector('.search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', (event) => {
                event.preventDefault();

                const formData = new FormData(searchForm);
                const searchParams = {
                    location: formData.get('location') || '',
                    propertyType: formData.get('property-type') || '',
                    priceRange: formData.get('price-range') || ''
                };

                // Perform search and get results
                const results = PropertyDataUtils.filterProperties(searchParams);

                // Track search with analytics
                if (window.searchAnalytics) {
                    window.searchAnalytics.trackSearch(
                        searchParams.location,
                        searchParams,
                        results
                    );
                }

                if (window.analyticsCore) {
                    window.analyticsCore.trackSearchEvent(
                        searchParams.location,
                        searchParams,
                        results.length,
                        'main_search'
                    );
                }

                // Update UI with results
                this.displaySearchResults(results, searchParams);
            });
        }

        // Track filter usage
        document.addEventListener('click', (event) => {
            if (event.target.matches('.filter-btn')) {
                const filter = event.target.dataset.filter;
                if (window.analyticsCore) {
                    window.analyticsCore.trackEvent('filter_usage', {
                        filterType: filter,
                        timestamp: new Date().toISOString()
                    });
                }
            }
        });
    }

    displaySearchResults(results, searchParams) {
        const propertyGrid = document.getElementById('property-grid');
        if (!propertyGrid) return;

        // Clear current properties
        propertyGrid.innerHTML = '';

        if (results.length === 0) {
            propertyGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No properties found</h3>
                    <p>Try adjusting your search criteria</p>
                </div>
            `;
            return;
        }

        // Display search results
        results.forEach(property => {
            const propertyCard = this.createPropertyCard(property);
            propertyGrid.appendChild(propertyCard);
        });

        // Show search results summary
        this.showSearchSummary(results.length, searchParams);
    }

    createPropertyCard(property) {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.dataset.propertyId = property.id;
        card.dataset.propertyType = property.type;

        card.innerHTML = `
            <div class="property-image">
                <img src="${property.images[0]}" alt="${property.title}" loading="lazy">
                <div class="property-badge">${property.featured ? 'Featured' : ''}</div>
                <div class="property-actions">
                    <button class="property-action property-save" title="Save Property">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="property-action property-share" title="Share Property">
                        <i class="fas fa-share"></i>
                    </button>
                </div>
            </div>
            <div class="property-content">
                <div class="property-price">$${property.price.toLocaleString()}</div>
                <h3 class="property-title">${property.title}</h3>
                <p class="property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${property.location}
                </p>
                <div class="property-details">
                    <span><i class="fas fa-bed"></i> ${property.bedrooms} beds</span>
                    <span><i class="fas fa-bath"></i> ${property.bathrooms} baths</span>
                    <span><i class="fas fa-ruler"></i> ${property.area} sq ft</span>
                </div>
                <div class="property-footer">
                    <button class="btn btn-primary view-details" onclick="app.showPropertyModal(${property.id})">
                        View Details
                    </button>
                    <button class="property-directions" title="Get Directions">
                        <i class="fas fa-directions"></i>
                    </button>
                </div>
            </div>
        `;

        return card;
    }

    showSearchSummary(count, params) {
        const existingSummary = document.querySelector('.search-summary');
        if (existingSummary) {
            existingSummary.remove();
        }

        const summary = document.createElement('div');
        summary.className = 'search-summary';
        summary.innerHTML = `
            <div class="search-results-info">
                <h3>Search Results</h3>
                <p>Found ${count} ${count === 1 ? 'property' : 'properties'}</p>
                ${params.location ? `<span class="search-filter">Location: ${params.location}</span>` : ''}
                ${params.propertyType && params.propertyType !== 'all' ? `<span class="search-filter">Type: ${params.propertyType}</span>` : ''}
                ${params.priceRange ? `<span class="search-filter">Price: ${params.priceRange}</span>` : ''}
            </div>
        `;

        const propertyGrid = document.getElementById('property-grid');
        if (propertyGrid) {
            propertyGrid.parentNode.insertBefore(summary, propertyGrid);
        }
    }
}

// Analytics Dashboard Toggle
function initializeAnalyticsDashboard() {
    // Analytics navigation now handled in HTML directly
}

function toggleAnalyticsDashboard(event) {
    // Function removed - using existing analytics section in HTML
}

// Analytics section creation removed - using static HTML version

function exportAnalyticsData(format) {
    if (window.analyticsCore) {
        window.analyticsCore.exportData(format);
    }
}

// Initialize analytics integration when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize analytics integration
    window.analyticsIntegration = new AnalyticsIntegration();

    // Initialize analytics dashboard navigation
    initializeAnalyticsDashboard();

    // Set up periodic analytics updates
    setInterval(() => {
        if (window.propertyAnalytics) {
            window.propertyAnalytics.saveAnalyticsToStorage();
        }
    }, 30000); // Save every 30 seconds
});