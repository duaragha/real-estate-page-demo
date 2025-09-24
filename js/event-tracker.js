// Event Tracker Module
class EventTracker {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        console.log('Event Tracker initialized');
    }

    setupEventListeners() {
        // Track property clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.property-card')) {
                const propertyId = e.target.closest('.property-card').dataset.propertyId;
                if (window.analyticsCore) {
                    window.analyticsCore.trackEvent('property_clicked', {
                        property_id: propertyId
                    });
                }
            }
        });
    }
}

window.EventTracker = EventTracker;
window.eventTracker = new EventTracker();