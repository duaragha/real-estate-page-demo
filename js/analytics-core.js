// Analytics Core Module
class AnalyticsCore {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.events = [];
        this.init();
    }

    init() {
        console.log('Analytics Core initialized');
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    trackEvent(eventName, data = {}) {
        const event = {
            id: Date.now(),
            name: eventName,
            data: data,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId
        };

        this.events.push(event);
        console.log('Event tracked:', eventName, data);
        return event;
    }

    exportData(format = 'json') {
        console.log('Exporting analytics data as', format);
        return this.events;
    }
}

window.AnalyticsCore = AnalyticsCore;
window.analyticsCore = new AnalyticsCore();