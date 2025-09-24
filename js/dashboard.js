// Enhanced Dashboard Module with Professional Data Visualization
class Dashboard {
    constructor() {
        this.charts = {};
        this.metricsData = {
            totalListings: 2847,
            activeListings: 1256,
            soldThisMonth: 342,
            avgDaysOnMarket: 28,
            medianSalePrice: 485000,
            pricePerSqFt: 285,
            totalViews: 124589,
            savedListings: 3421,
            directionsRequested: 892,
            contactsGenerated: 456,
            mlsListings: 1842,
            idxSynced: 2105,
            clickThroughRate: 3.8,
            conversionRate: 2.4,
            uniqueVisitors: 45200,
            mobileTrafficPercentage: 68
        };

        this.historicalData = {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            salesVolume: [280, 298, 312, 335, 358, 342],
            avgPrice: [445000, 455000, 465000, 475000, 480000, 485000],
            inventory: [1150, 1180, 1200, 1230, 1245, 1256],
            daysOnMarket: [35, 33, 30, 29, 28, 28]
        };

        this.propertyTypes = {
            labels: ['Houses', 'Apartments', 'Condos', 'Townhouses', 'Land'],
            data: [845, 456, 342, 298, 145],
            colors: ['#4F46E5', '#7C3AED', '#EC4899', '#F59E0B', '#10B981']
        };

        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.loadDashboard();
            this.initializeCharts();
        });
    }

    loadDashboard() {
        const dashboardContainer = document.getElementById('analytics-dashboard');
        if (!dashboardContainer) return;

        dashboardContainer.innerHTML = `
            <!-- Professional Dashboard Header -->
            <div class="dashboard-header">
                <div class="dashboard-title">
                    <h3>Real Estate Analytics Dashboard</h3>
                    <p class="dashboard-subtitle">Live Performance Metrics & Market Insights</p>
                </div>
                <div class="dashboard-controls">
                    <div class="date-range-selector">
                        <button class="date-btn active" data-range="7d">7 Days</button>
                        <button class="date-btn" data-range="30d">30 Days</button>
                        <button class="date-btn" data-range="90d">90 Days</button>
                        <button class="date-btn" data-range="1y">1 Year</button>
                    </div>
                    <div class="dashboard-actions">
                        <button class="action-btn" onclick="dashboard.refreshData()">
                            <i class="fas fa-sync-alt"></i>
                        </button>
                        <button class="action-btn" onclick="dashboard.exportData()">
                            <i class="fas fa-download"></i>
                        </button>
                        <button class="action-btn" onclick="dashboard.toggleFullscreen()">
                            <i class="fas fa-expand"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Key Performance Indicators (KPIs) - Clean Card Design -->
            <div class="kpi-section">
                <div class="kpi-card">
                    <div class="kpi-header">
                        <span class="kpi-icon" style="background: linear-gradient(135deg, #667EEA, #764BA2);">
                            <i class="fas fa-dollar-sign"></i>
                        </span>
                        <span class="kpi-trend positive">+5.3%</span>
                    </div>
                    <div class="kpi-value">$${this.formatNumber(this.metricsData.medianSalePrice)}</div>
                    <div class="kpi-label">Median Sale Price</div>
                    <div class="kpi-sparkline" id="price-sparkline"></div>
                </div>

                <div class="kpi-card">
                    <div class="kpi-header">
                        <span class="kpi-icon" style="background: linear-gradient(135deg, #F093FB, #F5576C);">
                            <i class="fas fa-home"></i>
                        </span>
                        <span class="kpi-trend positive">+12.5%</span>
                    </div>
                    <div class="kpi-value">${this.formatNumber(this.metricsData.totalListings)}</div>
                    <div class="kpi-label">Total Listings</div>
                    <div class="kpi-sparkline" id="listings-sparkline"></div>
                </div>

                <div class="kpi-card">
                    <div class="kpi-header">
                        <span class="kpi-icon" style="background: linear-gradient(135deg, #4FACFE, #00F2FE);">
                            <i class="fas fa-chart-line"></i>
                        </span>
                        <span class="kpi-trend positive">+8.2%</span>
                    </div>
                    <div class="kpi-value">${this.metricsData.soldThisMonth}</div>
                    <div class="kpi-label">Properties Sold</div>
                    <div class="kpi-sparkline" id="sold-sparkline"></div>
                </div>

                <div class="kpi-card">
                    <div class="kpi-header">
                        <span class="kpi-icon" style="background: linear-gradient(135deg, #FA709A, #FEE140);">
                            <i class="fas fa-clock"></i>
                        </span>
                        <span class="kpi-trend negative">-3 days</span>
                    </div>
                    <div class="kpi-value">${this.metricsData.avgDaysOnMarket}</div>
                    <div class="kpi-label">Avg Days on Market</div>
                    <div class="kpi-sparkline" id="dom-sparkline"></div>
                </div>
            </div>

            <!-- Main Charts Section -->
            <div class="charts-grid">
                <!-- Sales Trend Chart -->
                <div class="chart-container">
                    <div class="chart-header">
                        <h4>Sales Volume Trend</h4>
                        <div class="chart-options">
                            <button class="chart-type-btn active" data-chart="sales" data-type="line">
                                <i class="fas fa-chart-line"></i>
                            </button>
                            <button class="chart-type-btn" data-chart="sales" data-type="bar">
                                <i class="fas fa-chart-bar"></i>
                            </button>
                        </div>
                    </div>
                    <canvas id="salesTrendChart"></canvas>
                </div>

                <!-- Property Types Distribution -->
                <div class="chart-container">
                    <div class="chart-header">
                        <h4>Property Types Distribution</h4>
                        <button class="chart-legend-btn" onclick="dashboard.toggleLegend('propertyTypes')">
                            <i class="fas fa-list"></i>
                        </button>
                    </div>
                    <canvas id="propertyTypesChart"></canvas>
                </div>

                <!-- Price Trends Chart -->
                <div class="chart-container full-width">
                    <div class="chart-header">
                        <h4>Market Price Trends</h4>
                        <select class="chart-filter" id="price-filter">
                            <option value="median">Median Price</option>
                            <option value="average">Average Price</option>
                            <option value="psf">Price per Sq Ft</option>
                        </select>
                    </div>
                    <canvas id="priceTrendsChart"></canvas>
                </div>
            </div>

            <!-- Performance Metrics Grid -->
            <div class="metrics-section">
                <h4 class="section-title">Performance Metrics</h4>
                <div class="metrics-grid-modern">
                    <div class="metric-item">
                        <div class="metric-visual">
                            <div class="progress-ring" data-percentage="${this.metricsData.clickThroughRate}">
                                <svg>
                                    <circle class="progress-ring-bg" cx="40" cy="40" r="36"></circle>
                                    <circle class="progress-ring-fill" cx="40" cy="40" r="36"
                                            style="stroke-dashoffset: ${226 - (226 * this.metricsData.clickThroughRate / 10)}"></circle>
                                </svg>
                                <span class="progress-value">${this.metricsData.clickThroughRate}%</span>
                            </div>
                        </div>
                        <div class="metric-details">
                            <h5>Click-Through Rate</h5>
                            <p>+0.5% from last month</p>
                        </div>
                    </div>

                    <div class="metric-item">
                        <div class="metric-visual">
                            <div class="progress-ring" data-percentage="${this.metricsData.conversionRate}">
                                <svg>
                                    <circle class="progress-ring-bg" cx="40" cy="40" r="36"></circle>
                                    <circle class="progress-ring-fill" cx="40" cy="40" r="36"
                                            style="stroke-dashoffset: ${226 - (226 * this.metricsData.conversionRate / 10)}"></circle>
                                </svg>
                                <span class="progress-value">${this.metricsData.conversionRate}%</span>
                            </div>
                        </div>
                        <div class="metric-details">
                            <h5>Conversion Rate</h5>
                            <p>Industry avg: 2.1%</p>
                        </div>
                    </div>

                    <div class="metric-item">
                        <div class="metric-visual">
                            <div class="mini-bar-chart">
                                <div class="bar" style="height: 70%;"></div>
                                <div class="bar" style="height: 85%;"></div>
                                <div class="bar" style="height: 60%;"></div>
                                <div class="bar" style="height: 90%;"></div>
                                <div class="bar" style="height: 75%;"></div>
                            </div>
                        </div>
                        <div class="metric-details">
                            <h5>Page Views</h5>
                            <p>${this.formatNumber(this.metricsData.totalViews)}</p>
                        </div>
                    </div>

                    <div class="metric-item">
                        <div class="metric-visual">
                            <div class="device-split">
                                <div class="device-bar mobile" style="width: ${this.metricsData.mobileTrafficPercentage}%;"></div>
                                <div class="device-bar desktop" style="width: ${100 - this.metricsData.mobileTrafficPercentage}%;"></div>
                            </div>
                        </div>
                        <div class="metric-details">
                            <h5>Mobile vs Desktop</h5>
                            <p>${this.metricsData.mobileTrafficPercentage}% Mobile</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Traffic Sources Breakdown -->
            <div class="traffic-sources">
                <h4 class="section-title">Traffic Sources & Attribution</h4>
                <div class="sources-grid">
                    <div class="source-card">
                        <div class="source-header">
                            <span class="source-icon"><i class="fas fa-search"></i></span>
                            <h5>Organic Search</h5>
                        </div>
                        <div class="source-stats">
                            <div class="stat-row">
                                <span>Visits</span>
                                <strong>32,450</strong>
                            </div>
                            <div class="stat-row">
                                <span>Conversion</span>
                                <strong>2.75%</strong>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 75%;"></div>
                            </div>
                        </div>
                    </div>

                    <div class="source-card">
                        <div class="source-header">
                            <span class="source-icon"><i class="fab fa-google"></i></span>
                            <h5>Google Ads</h5>
                        </div>
                        <div class="source-stats">
                            <div class="stat-row">
                                <span>Visits</span>
                                <strong>18,670</strong>
                            </div>
                            <div class="stat-row">
                                <span>Conversion</span>
                                <strong>2.25%</strong>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 60%;"></div>
                            </div>
                        </div>
                    </div>

                    <div class="source-card">
                        <div class="source-header">
                            <span class="source-icon"><i class="fas fa-share-alt"></i></span>
                            <h5>Social Media</h5>
                        </div>
                        <div class="source-stats">
                            <div class="stat-row">
                                <span>Visits</span>
                                <strong>15,234</strong>
                            </div>
                            <div class="stat-row">
                                <span>Conversion</span>
                                <strong>1.96%</strong>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 45%;"></div>
                            </div>
                        </div>
                    </div>

                    <div class="source-card">
                        <div class="source-header">
                            <span class="source-icon"><i class="fas fa-envelope"></i></span>
                            <h5>Email Campaign</h5>
                        </div>
                        <div class="source-stats">
                            <div class="stat-row">
                                <span>Visits</span>
                                <strong>12,450</strong>
                            </div>
                            <div class="stat-row">
                                <span>Conversion</span>
                                <strong>2.77%</strong>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 40%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Top Performing Properties -->
            <div class="top-properties">
                <h4 class="section-title">Top Performing Properties</h4>
                <div class="properties-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Property</th>
                                <th>Views</th>
                                <th>Saves</th>
                                <th>Inquiries</th>
                                <th>Performance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="property-info">
                                        <span class="property-badge hot">HOT</span>
                                        4BR Luxury Villa - Miami Beach
                                    </div>
                                </td>
                                <td><strong>8,456</strong></td>
                                <td>342</td>
                                <td>87</td>
                                <td>
                                    <div class="performance-bar">
                                        <div class="performance-fill excellent" style="width: 95%;"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="property-info">
                                        <span class="property-badge trending">TRENDING</span>
                                        Downtown Penthouse - Manhattan
                                    </div>
                                </td>
                                <td><strong>7,234</strong></td>
                                <td>298</td>
                                <td>65</td>
                                <td>
                                    <div class="performance-bar">
                                        <div class="performance-fill good" style="width: 85%;"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="property-info">
                                        Modern Condo - Los Angeles
                                    </div>
                                </td>
                                <td><strong>6,892</strong></td>
                                <td>276</td>
                                <td>54</td>
                                <td>
                                    <div class="performance-bar">
                                        <div class="performance-fill good" style="width: 75%;"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="property-info">
                                        Suburban Home - Austin
                                    </div>
                                </td>
                                <td><strong>5,678</strong></td>
                                <td>234</td>
                                <td>48</td>
                                <td>
                                    <div class="performance-bar">
                                        <div class="performance-fill moderate" style="width: 65%;"></div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        this.attachEventListeners();
    }

    initializeCharts() {
        // Sales Trend Chart
        const salesCtx = document.getElementById('salesTrendChart');
        if (salesCtx) {
            this.charts.salesTrend = new Chart(salesCtx, {
                type: 'line',
                data: {
                    labels: this.historicalData.months,
                    datasets: [{
                        label: 'Properties Sold',
                        data: this.historicalData.salesVolume,
                        borderColor: '#4F46E5',
                        backgroundColor: 'rgba(79, 70, 229, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            padding: 12,
                            borderRadius: 8
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }

        // Property Types Chart
        const typesCtx = document.getElementById('propertyTypesChart');
        if (typesCtx) {
            this.charts.propertyTypes = new Chart(typesCtx, {
                type: 'doughnut',
                data: {
                    labels: this.propertyTypes.labels,
                    datasets: [{
                        data: this.propertyTypes.data,
                        backgroundColor: this.propertyTypes.colors,
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 15,
                                font: {
                                    size: 12
                                }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.parsed;
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = ((value / total) * 100).toFixed(1);
                                    return `${label}: ${value} (${percentage}%)`;
                                }
                            }
                        }
                    }
                }
            });
        }

        // Price Trends Chart
        const priceCtx = document.getElementById('priceTrendsChart');
        if (priceCtx) {
            this.charts.priceTrends = new Chart(priceCtx, {
                type: 'line',
                data: {
                    labels: this.historicalData.months,
                    datasets: [{
                        label: 'Average Price',
                        data: this.historicalData.avgPrice,
                        borderColor: '#7C3AED',
                        backgroundColor: 'rgba(124, 58, 237, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        yAxisID: 'y'
                    }, {
                        label: 'Days on Market',
                        data: this.historicalData.daysOnMarket,
                        borderColor: '#EC4899',
                        backgroundColor: 'rgba(236, 72, 153, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        yAxisID: 'y1'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        mode: 'index',
                        intersect: false
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                usePointStyle: true,
                                padding: 15
                            }
                        }
                    },
                    scales: {
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + (value / 1000) + 'K';
                                }
                            }
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            grid: {
                                drawOnChartArea: false
                            },
                            ticks: {
                                callback: function(value) {
                                    return value + ' days';
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }

        // Initialize sparklines
        this.initializeSparklines();
    }

    initializeSparklines() {
        // Price sparkline
        const priceSparkline = document.getElementById('price-sparkline');
        if (priceSparkline) {
            const canvas = document.createElement('canvas');
            canvas.width = 100;
            canvas.height = 30;
            priceSparkline.appendChild(canvas);

            new Chart(canvas, {
                type: 'line',
                data: {
                    labels: ['', '', '', '', '', ''],
                    datasets: [{
                        data: [465000, 470000, 475000, 480000, 483000, 485000],
                        borderColor: '#667EEA',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 0
                    }]
                },
                options: {
                    responsive: false,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: { enabled: false }
                    },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    }
                }
            });
        }

        // Similar sparklines for other KPIs
        this.createSparkline('listings-sparkline', [2600, 2650, 2700, 2750, 2800, 2847], '#F093FB');
        this.createSparkline('sold-sparkline', [290, 305, 315, 325, 335, 342], '#4FACFE');
        this.createSparkline('dom-sparkline', [35, 33, 31, 29, 28, 28], '#FA709A');
    }

    createSparkline(elementId, data, color) {
        const element = document.getElementById(elementId);
        if (element) {
            const canvas = document.createElement('canvas');
            canvas.width = 100;
            canvas.height = 30;
            element.appendChild(canvas);

            new Chart(canvas, {
                type: 'line',
                data: {
                    labels: Array(data.length).fill(''),
                    datasets: [{
                        data: data,
                        borderColor: color,
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 0
                    }]
                },
                options: {
                    responsive: false,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: { enabled: false }
                    },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    }
                }
            });
        }
    }

    formatNumber(num) {
        return new Intl.NumberFormat('en-US').format(num);
    }

    attachEventListeners() {
        // Date range selector
        document.querySelectorAll('.date-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.updateMetrics(e.target.dataset.range);
            });
        });

        // Chart type switcher
        document.querySelectorAll('.chart-type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const chartName = e.currentTarget.dataset.chart;
                const chartType = e.currentTarget.dataset.type;
                this.switchChartType(chartName, chartType);

                document.querySelectorAll(`.chart-type-btn[data-chart="${chartName}"]`).forEach(b =>
                    b.classList.remove('active'));
                e.currentTarget.classList.add('active');
            });
        });

        // Price filter
        const priceFilter = document.getElementById('price-filter');
        if (priceFilter) {
            priceFilter.addEventListener('change', (e) => {
                this.updatePriceChart(e.target.value);
            });
        }
    }

    switchChartType(chartName, type) {
        if (chartName === 'sales' && this.charts.salesTrend) {
            this.charts.salesTrend.config.type = type;
            this.charts.salesTrend.update();
        }
    }

    updatePriceChart(metric) {
        // Update price chart based on selected metric
        console.log(`Updating price chart to show: ${metric}`);
    }

    updateMetrics(timeframe) {
        console.log(`Updating metrics for timeframe: ${timeframe}`);
        // Simulate data update with animation
        this.animateNumbers();
    }

    animateNumbers() {
        document.querySelectorAll('.kpi-value').forEach(element => {
            const finalValue = element.innerText;
            element.style.opacity = '0.5';
            setTimeout(() => {
                element.style.opacity = '1';
            }, 300);
        });
    }

    exportData() {
        console.log('Exporting dashboard data...');
        const data = {
            metrics: this.metricsData,
            historical: this.historicalData,
            timestamp: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `analytics_export_${Date.now()}.json`;
        a.click();
    }

    refreshData() {
        const refreshBtn = document.querySelector('.fa-sync-alt');
        if (refreshBtn) {
            refreshBtn.classList.add('spinning');

            // Simulate data refresh
            setTimeout(() => {
                refreshBtn.classList.remove('spinning');
                this.loadDashboard();
                this.initializeCharts();
            }, 1500);
        }
    }

    toggleFullscreen() {
        const dashboard = document.getElementById('analytics-dashboard');
        if (!document.fullscreenElement) {
            dashboard.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    toggleLegend(chartName) {
        if (this.charts[chartName]) {
            const chart = this.charts[chartName];
            chart.options.plugins.legend.display = !chart.options.plugins.legend.display;
            chart.update();
        }
    }
}

// Initialize dashboard
window.Dashboard = Dashboard;
window.dashboard = new Dashboard();