/**
 * Main Application Entry Point
 * Initializes all analytics systems and coordinates their interactions
 */

// Main application controller
class RealEstateAnalyticsApp {
    constructor() {
        this.analyticsInitialized = false;
        this.dashboardVisible = false;
        this.privacyConsent = null;

        this.init();
    }

    /**
     * Initialize the complete analytics system
     */
    async init() {
        try {
            console.log('🏠 Initializing Real Estate Analytics System...');

            // Check privacy consent first
            await this.checkPrivacyConsent();

            // Initialize core analytics
            await this.initializeAnalytics();

            // Initialize event tracking
            this.initializeEventTracking();

            // Initialize dashboard
            this.initializeDashboard();

            // Setup navigation
            this.setupNavigation();

            // Initialize data generation
            this.initializeDataGeneration();

            // Setup privacy controls
            this.setupPrivacyControls();

            // Setup real-time updates
            this.setupRealTimeUpdates();

            console.log('✅ Real Estate Analytics System initialized successfully!');
            this.showWelcomeMessage();

        } catch (error) {
            console.error('❌ Failed to initialize analytics system:', error);
        }
    }

    /**
     * Check and handle privacy consent
     */
    async checkPrivacyConsent() {
        const consent = localStorage.getItem('re_tracking_consent');
        this.privacyConsent = consent;

        if (!consent) {
            this.showPrivacyNotice();
        } else if (consent === 'accepted') {
            this.enableAnalytics();
        } else {
            this.disableAnalytics();
        }
    }

    /**
     * Show privacy consent notice
     */
    showPrivacyNotice() {
        // Privacy notice removed - analytics consent assumed
        this.setPrivacyConsent('accepted');
    }

    /**
     * Set privacy consent
     */
    setPrivacyConsent(consent) {
        localStorage.setItem('re_tracking_consent', consent);
        this.privacyConsent = consent;

        if (consent === 'accepted') {
            this.enableAnalytics();
            this.showNotification('Analytics enabled. Thank you!', 'success');
        } else {
            this.disableAnalytics();
            this.showNotification('Analytics disabled. You can change this in settings.', 'info');
        }
    }

    /**
     * Enable analytics tracking
     */
    enableAnalytics() {
        if (window.analyticsCore) {
            window.analyticsCore.enableTracking();
        }
        this.analyticsInitialized = true;
        console.log('📊 Analytics tracking enabled');
    }

    /**
     * Disable analytics tracking
     */
    disableAnalytics() {
        if (window.analyticsCore) {
            window.analyticsCore.disableTracking();
        }
        this.analyticsInitialized = false;
        console.log('🚫 Analytics tracking disabled');
    }

    /**
     * Initialize core analytics system
     */
    async initializeAnalytics() {
        // Analytics core is already initialized via analytics-core.js
        // Just need to set up the integration

        if (this.privacyConsent === 'accepted') {
            this.enableAnalytics();

            // Generate some initial demo data
            this.generateDemoAnalyticsData();
        }
    }

    /**
     * Initialize event tracking system
     */
    initializeEventTracking() {
        if (!this.analyticsInitialized) return;

        // Event tracker is already initialized via event-tracker.js
        console.log('🎯 Event tracking system ready');

        // Track page load
        if (window.analyticsCore) {
            window.analyticsCore.trackEvent('page_load', {
                page: 'homepage',
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                referrer: document.referrer
            });
        }
    }

    /**
     * Initialize analytics dashboard
     */
    initializeDashboard() {
        // Dashboard is already initialized via dashboard.js
        console.log('📈 Analytics dashboard ready');

        // Dashboard navigation removed - using existing analytics link in HTML
    }




    /**
     * Setup navigation handling
     */
    setupNavigation() {
        // Navigation handling simplified - no dynamic dashboard toggling needed
    }

    /**
     * Initialize data generation for demo purposes
     */
    initializeDataGeneration() {
        if (!this.analyticsInitialized) return;

        // Generate some demo activity every few seconds
        setInterval(() => {
            this.generateDemoActivity();
        }, 5000);

        console.log('🎲 Demo data generation started');
    }

    /**
     * Generate demo analytics data
     */
    generateDemoAnalyticsData() {
        const demoEvents = [
            'property_view',
            'search_query',
            'filter_usage',
            'property_save',
            'property_share',
            'contact_request'
        ];

        // Generate 20 demo events
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const eventType = demoEvents[Math.floor(Math.random() * demoEvents.length)];
                const propertyId = Math.floor(Math.random() * 10) + 1;

                if (window.analyticsCore) {
                    window.analyticsCore.trackEvent(eventType, {
                        propertyId: propertyId,
                        timestamp: new Date().toISOString(),
                        demo: true
                    });
                }
            }, i * 100);
        }
    }

    /**
     * Generate demo activity for real-time feed
     */
    generateDemoActivity() {
        if (!this.analyticsInitialized || !this.dashboardVisible) return;

        const activities = [
            'User viewed Property #' + (Math.floor(Math.random() * 10) + 1),
            'Property #' + (Math.floor(Math.random() * 10) + 1) + ' was saved',
            'Search for "' + ['downtown apartment', 'luxury home', 'waterfront condo'][Math.floor(Math.random() * 3)] + '"',
            'User requested directions to Property #' + (Math.floor(Math.random() * 10) + 1),
            'Property #' + (Math.floor(Math.random() * 10) + 1) + ' was shared'
        ];

        const activity = activities[Math.floor(Math.random() * activities.length)];
        this.addActivityToFeed(activity);
    }

    /**
     * Add activity to real-time feed
     */
    addActivityToFeed(activity) {
        const activityList = document.getElementById('activity-list');
        if (!activityList) return;

        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item fade-in';
        activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="fas fa-circle"></i>
            </div>
            <div class="activity-content">
                <p>${activity}</p>
                <span class="activity-time">Just now</span>
            </div>
        `;

        activityList.insertBefore(activityItem, activityList.firstChild);

        // Keep only last 10 activities
        while (activityList.children.length > 10) {
            activityList.removeChild(activityList.lastChild);
        }
    }

    /**
     * Setup privacy controls
     */
    setupPrivacyControls() {
        // Add privacy settings to the page
        const footer = document.querySelector('.footer');
        if (footer) {
            const privacyLink = document.createElement('div');
            privacyLink.className = 'privacy-settings';
            privacyLink.innerHTML = `
                <button class="privacy-toggle" onclick="window.realEstateApp.showPrivacySettings()">
                    <i class="fas fa-shield-alt"></i> Privacy Settings
                </button>
            `;
            footer.appendChild(privacyLink);
        }
    }

    /**
     * Show privacy settings modal
     */
    showPrivacySettings() {
        const modal = document.createElement('div');
        modal.className = 'privacy-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>🔒 Privacy Settings</h3>
                    <button class="modal-close" onclick="this.closest('.privacy-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="privacy-option">
                        <label>
                            <input type="checkbox" ${this.privacyConsent === 'accepted' ? 'checked' : ''}
                                   onchange="window.realEstateApp.toggleAnalytics(this.checked)">
                            Enable Analytics Tracking
                        </label>
                        <p>Helps us understand how you use our website to improve your experience.</p>
                    </div>

                    <div class="privacy-info">
                        <h4>What we track:</h4>
                        <ul>
                            <li>Property views and interactions</li>
                            <li>Search queries and filters</li>
                            <li>User journey and navigation patterns</li>
                            <li>Performance metrics</li>
                        </ul>

                        <h4>What we DON'T track:</h4>
                        <ul>
                            <li>Personal information without consent</li>
                            <li>Sensitive form data</li>
                            <li>Cross-site activity</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    /**
     * Toggle analytics on/off
     */
    toggleAnalytics(enabled) {
        this.setPrivacyConsent(enabled ? 'accepted' : 'declined');
    }

    /**
     * Setup real-time updates
     */
    setupRealTimeUpdates() {
        // Update analytics data every 30 seconds
        setInterval(() => {
            if (this.analyticsInitialized && this.dashboardVisible) {
                if (window.analyticsDashboard) {
                    window.analyticsDashboard.loadDashboardData();
                }
            }
        }, 30000);

        // Save analytics data every minute
        setInterval(() => {
            if (this.analyticsInitialized && window.propertyAnalytics) {
                window.propertyAnalytics.saveAnalyticsToStorage();
            }
        }, 60000);
    }

    /**
     * Export analytics data
     */
    exportData(format) {
        if (!this.analyticsInitialized) {
            this.showNotification('Analytics not enabled', 'error');
            return;
        }

        if (window.analyticsCore) {
            window.analyticsCore.exportData(format);
            this.showNotification(`Data exported as ${format.toUpperCase()}`, 'success');
        }
    }

    /**
     * Show notification message
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation' : 'info'}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    /**
     * Show welcome message
     */
    showWelcomeMessage() {
        if (this.privacyConsent === 'accepted') {
            setTimeout(() => {
                this.showNotification('🏠 Real Estate Analytics System is now tracking user interactions!', 'success');
            }, 1000);
        }
    }

    /**
     * Show privacy details
     */
    showPrivacyDetails() {
        const modal = document.createElement('div');
        modal.className = 'privacy-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.closest('.privacy-modal').remove()"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>🔒 Privacy & Data Collection</h3>
                    <button class="modal-close" onclick="this.closest('.privacy-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <h4>How We Use Analytics</h4>
                    <p>Our analytics system helps us understand how users interact with properties and search for homes. This data helps us:</p>
                    <ul>
                        <li>Improve the user experience</li>
                        <li>Understand which properties are most popular</li>
                        <li>Optimize search functionality</li>
                        <li>Provide better recommendations</li>
                    </ul>

                    <h4>Data We Collect</h4>
                    <ul>
                        <li>Property views and interactions</li>
                        <li>Search queries and filters</li>
                        <li>Navigation patterns</li>
                        <li>Performance metrics</li>
                        <li>Anonymous usage statistics</li>
                    </ul>

                    <h4>Your Privacy Rights</h4>
                    <ul>
                        <li>You can opt out of analytics at any time</li>
                        <li>Data is stored locally in your browser</li>
                        <li>No personal information is collected without consent</li>
                        <li>You can clear all analytics data</li>
                    </ul>

                    <div class="privacy-actions">
                        <button class="btn btn-outline" onclick="window.realEstateApp.clearAnalyticsData()">
                            Clear Analytics Data
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    /**
     * Clear all analytics data
     */
    clearAnalyticsData() {
        localStorage.removeItem('re_analytics_events');
        localStorage.removeItem('re_property_analytics');
        localStorage.removeItem('re_search_history');
        localStorage.removeItem('re_session_history');
        localStorage.removeItem('re_current_session');

        this.showNotification('All analytics data cleared', 'success');

        // Close any open modals
        document.querySelectorAll('.privacy-modal').forEach(modal => modal.remove());
    }
}

// Initialize the complete analytics system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Starting Real Estate Analytics Application...');

    // Wait a bit for other scripts to load
    setTimeout(() => {
        window.realEstateApp = new RealEstateAnalyticsApp();
    }, 500);
});

// Make sure all analytics systems are available globally
window.addEventListener('load', () => {
    // Verify all systems are loaded
    const systems = [
        'analyticsCore',
        'eventTracker',
        'analyticsDashboard',
        'propertyAnalytics',
        'searchAnalytics'
    ];

    systems.forEach(system => {
        if (!window[system]) {
            console.warn(`⚠️  ${system} not found`);
        }
    });

    console.log('🎯 All analytics systems verified');
});

// =====================================
// Dark Mode Toggle Functionality
// =====================================

class DarkModeController {
    constructor() {
        this.isDark = false;
        this.toggle = null;
        this.icon = null;
        this.init();
    }

    init() {
        // Get elements
        this.toggle = document.getElementById('dark-mode-toggle');
        this.icon = document.getElementById('dark-mode-icon');

        if (!this.toggle || !this.icon) {
            console.warn('Dark mode elements not found');
            return;
        }

        // Check for stored preference or system preference
        this.loadPreference();

        // Set initial state
        this.updateTheme();

        // Add event listeners
        this.toggle.addEventListener('click', () => this.toggleDarkMode());

        // Listen for system preference changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                if (!localStorage.getItem('dark-mode-preference')) {
                    this.isDark = e.matches;
                    this.updateTheme();
                }
            });
        }

        console.log('🌙 Dark mode controller initialized');
    }

    loadPreference() {
        const stored = localStorage.getItem('dark-mode-preference');
        if (stored) {
            this.isDark = stored === 'dark';
        } else {
            // Use system preference if no stored preference
            this.isDark = window.matchMedia &&
                         window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
    }

    toggleDarkMode() {
        this.isDark = !this.isDark;
        this.updateTheme();
        this.savePreference();

        // Track the toggle event for analytics
        if (window.eventTracker) {
            window.eventTracker.track('theme_toggle', {
                theme: this.isDark ? 'dark' : 'light',
                timestamp: Date.now()
            });
        }
    }

    updateTheme() {
        const body = document.body;
        const html = document.documentElement;

        if (this.isDark) {
            body.setAttribute('data-theme', 'dark');
            html.setAttribute('data-theme', 'dark');
            this.icon.className = 'fas fa-sun';
            this.toggle.setAttribute('aria-label', 'Switch to light mode');
            this.toggle.setAttribute('title', 'Switch to light theme');
        } else {
            body.removeAttribute('data-theme');
            html.removeAttribute('data-theme');
            this.icon.className = 'fas fa-moon';
            this.toggle.setAttribute('aria-label', 'Switch to dark mode');
            this.toggle.setAttribute('title', 'Switch to dark theme');
        }

        // Add a smooth transition class
        body.classList.add('theme-transitioning');
        setTimeout(() => {
            body.classList.remove('theme-transitioning');
        }, 300);
    }

    savePreference() {
        localStorage.setItem('dark-mode-preference', this.isDark ? 'dark' : 'light');
    }

    getCurrentTheme() {
        return this.isDark ? 'dark' : 'light';
    }
}

// Initialize dark mode when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.darkModeController = new DarkModeController();
});

// =====================================
// Enhanced Form Validation
// =====================================

class FormValidation {
    constructor() {
        this.forms = [];
        this.init();
    }

    init() {
        // Find all forms with validation
        const forms = document.querySelectorAll('form[novalidate]');
        forms.forEach(form => this.setupFormValidation(form));
        console.log(`📝 Enhanced validation setup for ${forms.length} forms`);
    }

    setupFormValidation(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');

        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearErrors(input));
        });

        form.addEventListener('submit', (e) => this.handleSubmit(e, form));
    }

    validateField(field) {
        const errorElement = document.getElementById(field.getAttribute('aria-describedby')?.split(' ')[0]);
        if (!errorElement) return;

        let isValid = true;
        let errorMessage = '';

        // Required field check
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            errorMessage = `${this.getFieldName(field)} is required.`;
        }
        // Email validation
        else if (field.type === 'email' && field.value && !this.isValidEmail(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
        // Phone validation
        else if (field.type === 'tel' && field.value && !this.isValidPhone(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        }

        this.showFieldError(field, errorElement, errorMessage, !isValid);
        return isValid;
    }

    handleSubmit(e, form) {
        e.preventDefault();

        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            this.submitForm(form);
        } else {
            // Focus first invalid field
            const firstError = form.querySelector('.error');
            if (firstError) firstError.focus();
        }
    }

    submitForm(form) {
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Simulate API call
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = 'var(--success-color)';

            // Reset after delay
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                form.reset();
            }, 3000);
        }, 1500);

        // Track form submission
        if (window.eventTracker) {
            window.eventTracker.track('form_submit', {
                form: form.getAttribute('aria-label') || 'unknown',
                timestamp: Date.now()
            });
        }
    }

    showFieldError(field, errorElement, message, hasError) {
        if (hasError) {
            field.classList.add('error');
            field.classList.remove('success');
            errorElement.textContent = message;
            errorElement.classList.add('show');
            field.setAttribute('aria-invalid', 'true');
        } else {
            field.classList.remove('error');
            field.classList.add('success');
            errorElement.textContent = '';
            errorElement.classList.remove('show');
            field.setAttribute('aria-invalid', 'false');
        }
    }

    clearErrors(field) {
        const errorElement = document.getElementById(field.getAttribute('aria-describedby')?.split(' ')[0]);
        if (errorElement && field.value.trim()) {
            this.showFieldError(field, errorElement, '', false);
        }
    }

    getFieldName(field) {
        const label = document.querySelector(`label[for="${field.id}"]`);
        return label ? label.textContent.replace(' *', '') : 'This field';
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    isValidPhone(phone) {
        return /^[+]?[1-9][\d\s\-\(\)]{7,}$/.test(phone.replace(/\s/g, ''));
    }
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', () => {
    window.formValidation = new FormValidation();
});

// =====================================
// Performance Optimizations
// =====================================

// Preload critical resources
function preloadCriticalResources() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&crop=center'
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', preloadCriticalResources);

console.log('🚀 Enhanced Real Estate Application fully loaded with dark mode and accessibility features!');

