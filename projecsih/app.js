// Application State
let appState = {
    casualties: [
        {"id": "C2024001", "name": "John Doe", "age": 35, "gender": "Male", "triage": "Red", "injury": "Severe head trauma", "status": "In Surgery", "hospital": "Main Hospital", "arrival": "09:15", "kin": "Jane Doe"},
        {"id": "C2024002", "name": "Mary Johnson", "age": 42, "gender": "Female", "triage": "Yellow", "injury": "Broken arm, stable", "status": "Waiting", "hospital": "Main Hospital", "arrival": "09:18", "kin": "Mike Johnson"},
        {"id": "C2024003", "name": "Tom Smith", "age": 28, "gender": "Male", "triage": "Green", "injury": "Minor cuts", "status": "Discharged", "hospital": "Clinic A", "arrival": "09:20", "kin": "Sarah Smith"},
        {"id": "C2024004", "name": "Linda Brown", "age": 51, "gender": "Female", "triage": "Red", "injury": "Internal bleeding", "status": "Critical Care", "hospital": "Main Hospital", "arrival": "09:22", "kin": "Unknown"},
        {"id": "C2024005", "name": "Mike Davis", "age": 33, "gender": "Male", "triage": "Yellow", "injury": "Fractured ribs", "status": "Observation", "hospital": "Hospital B", "arrival": "09:25", "kin": "Lisa Brown"},
        {"id": "C2024006", "name": "Robert Wilson", "age": 67, "gender": "Male", "triage": "Black", "injury": "Cardiac arrest", "status": "Deceased", "hospital": "Morgue", "arrival": "09:12", "kin": "Mary Wilson"}
    ],
    resources: [
        {"type": "ICU Beds", "available": 45, "total": 50, "status": "Available", "location": "Main Hospital"},
        {"type": "Emergency Beds", "available": 120, "total": 150, "status": "Available", "location": "Emergency Wing"},
        {"type": "Operating Rooms", "available": 18, "total": 20, "status": "Available", "location": "Surgical Wing"},
        {"type": "Ventilators", "available": 35, "total": 40, "status": "Available", "location": "ICU"},
        {"type": "Ambulances", "available": 12, "total": 15, "status": "Available", "location": "Parking Area"},
        {"type": "Blood O-", "available": 150, "total": 300, "status": "Low Stock", "location": "Blood Bank"},
        {"type": "Medical Staff", "available": 85, "total": 100, "status": "Available", "location": "Various"}
    ],
    contacts: [
        {"name": "Dr. Sarah Johnson", "role": "Emergency Coordinator", "phone": "+1-555-0101", "department": "Emergency Coordination", "status": "On Call"},
        {"name": "Dr. Michael Chen", "role": "Medical Director", "phone": "+1-555-0102", "department": "Administration", "status": "Available"},
        {"name": "Nurse Emily Davis", "role": "Triage Officer", "phone": "+1-555-0103", "department": "Emergency Department", "status": "On Duty"},
        {"name": "Officer James Wilson", "role": "Security Chief", "phone": "+1-555-0104", "department": "Security", "status": "Available"},
        {"name": "Ms. Rachel Green", "role": "Communications Officer", "phone": "+1-555-0105", "department": "Communications", "status": "Available"}
    ],
    protocols: [
        {"type": "Earthquake", "level": "Level 3", "time": "15 minutes", "actions": "Search & Rescue, Structural Assessment, Medical Triage"},
        {"type": "Fire", "level": "Level 2", "time": "5 minutes", "actions": "Evacuation, Fire Suppression, Smoke Inhalation Treatment"},
        {"type": "Chemical Spill", "level": "Level 4", "time": "30 minutes", "actions": "Hazmat Response, Decontamination, Air Quality Monitoring"},
        {"type": "Mass Shooting", "level": "Level 3", "time": "10 minutes", "actions": "Lockdown, Trauma Care, Law Enforcement Coordination"}
    ],
    nextCasualtyId: 7
};

// Helper Functions
function getCurrentTime() {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

function generateCasualtyId() {
    const id = `C2024${String(appState.nextCasualtyId).padStart(3, '0')}`;
    appState.nextCasualtyId++;
    return id;
}

function getTriageIcon(triage) {
    const icons = {
        'Red': '🔴',
        'Yellow': '🟡',
        'Green': '🟢',
        'Black': '⚫'
    };
    return icons[triage] || '';
}

function getTriageDescription(triage) {
    const descriptions = {
        'Red': 'Critical (Immediate)',
        'Yellow': 'Moderate (Delayed)',
        'Green': 'Minor (Walking Wounded)',
        'Black': 'Deceased/Expectant'
    };
    return descriptions[triage] || '';
}

// Tab Navigation
function initTabNavigation() {
    const tabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Refresh content when tab is activated
            refreshTabContent(targetTab);
        });
    });
}

function refreshTabContent(tabName) {
    switch(tabName) {
        case 'dashboard':
            updateDashboard();
            break;
        case 'casualties':
            renderCasualties();
            break;
        case 'resources':
            renderResources();
            break;
        case 'coordination':
            renderCoordination();
            break;
        case 'communication':
            renderCommunication();
            break;
        case 'reports':
            renderReports();
            break;
    }
}

// Dashboard Functions
function updateDashboard() {
    // Update casualty counts
    const triageCounts = appState.casualties.reduce((counts, casualty) => {
        counts[casualty.triage] = (counts[casualty.triage] || 0) + 1;
        return counts;
    }, {});

    document.getElementById('critical-count').textContent = triageCounts.Red || 0;
    document.getElementById('moderate-count').textContent = triageCounts.Yellow || 0;
    document.getElementById('minor-count').textContent = triageCounts.Green || 0;
    document.getElementById('deceased-count').textContent = triageCounts.Black || 0;

    // Update incident timer
    updateIncidentTimer();
}

function updateIncidentTimer() {
    let seconds = 8130; // Starting at 02:15:30
    
    setInterval(() => {
        seconds++;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        const timerElement = document.getElementById('incident-timer');
        if (timerElement) {
            timerElement.textContent = timeString;
        }
    }, 1000);
}

// Casualty Management
function renderCasualties() {
    const grid = document.getElementById('casualties-grid');
    const triageFilter = document.getElementById('triage-filter').value;
    const statusFilter = document.getElementById('status-filter').value;
    const searchTerm = document.getElementById('search-casualties').value.toLowerCase();

    let filteredCasualties = appState.casualties.filter(casualty => {
        const matchesTriage = !triageFilter || casualty.triage === triageFilter;
        const matchesStatus = !statusFilter || casualty.status === statusFilter;
        const matchesSearch = !searchTerm || 
            casualty.name.toLowerCase().includes(searchTerm) ||
            casualty.id.toLowerCase().includes(searchTerm);
        
        return matchesTriage && matchesStatus && matchesSearch;
    });

    grid.innerHTML = filteredCasualties.map(casualty => `
        <div class="casualty-card triage-${casualty.triage.toLowerCase()}" data-id="${casualty.id}">
            <div class="casualty-header">
                <span class="casualty-id">${casualty.id}</span>
                <span class="triage-badge ${casualty.triage.toLowerCase()}">
                    ${getTriageIcon(casualty.triage)} ${casualty.triage}
                </span>
            </div>
            <h4 class="casualty-name">${casualty.name}</h4>
            <div class="casualty-details">
                <div>Age: ${casualty.age} | Gender: ${casualty.gender}</div>
                <div>Injury: ${casualty.injury}</div>
                <div>Hospital: ${casualty.hospital}</div>
                <div>Arrival: ${casualty.arrival}</div>
                <div>Next of Kin: ${casualty.kin}</div>
            </div>
            <div class="casualty-status">
                <span class="status-text">Status: ${casualty.status}</span>
            </div>
            <div class="casualty-actions">
                <button class="btn btn--sm btn--primary" onclick="viewCasualtyDetails('${casualty.id}')">
                    View Details
                </button>
                <button class="btn btn--sm btn--secondary" onclick="updateCasualtyStatus('${casualty.id}')">
                    Update Status
                </button>
            </div>
        </div>
    `).join('');
}

function viewCasualtyDetails(casualtyId) {
    const casualty = appState.casualties.find(c => c.id === casualtyId);
    if (!casualty) return;

    const modal = document.getElementById('casualty-details-modal');
    const content = document.getElementById('casualty-details-content');
    
    content.innerHTML = `
        <div class="casualty-details-grid">
            <div class="detail-item">
                <span class="detail-label">Patient ID</span>
                <span class="detail-value">${casualty.id}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Triage Level</span>
                <span class="detail-value">
                    <span class="triage-badge ${casualty.triage.toLowerCase()}">
                        ${getTriageIcon(casualty.triage)} ${casualty.triage} - ${getTriageDescription(casualty.triage)}
                    </span>
                </span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Full Name</span>
                <span class="detail-value">${casualty.name}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Age</span>
                <span class="detail-value">${casualty.age}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Gender</span>
                <span class="detail-value">${casualty.gender}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Arrival Time</span>
                <span class="detail-value">${casualty.arrival}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Current Status</span>
                <span class="detail-value">${casualty.status}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Assigned Hospital</span>
                <span class="detail-value">${casualty.hospital}</span>
            </div>
            <div class="detail-item" style="grid-column: 1 / -1;">
                <span class="detail-label">Injury Description</span>
                <span class="detail-value">${casualty.injury}</span>
            </div>
            <div class="detail-item" style="grid-column: 1 / -1;">
                <span class="detail-label">Next of Kin</span>
                <span class="detail-value">${casualty.kin}</span>
            </div>
        </div>
        <div class="modal-actions">
            <button class="btn btn--secondary" onclick="closeDetailsModal()">Close</button>
            <button class="btn btn--primary" onclick="updateCasualtyStatus('${casualty.id}')">Update Status</button>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function updateCasualtyStatus(casualtyId) {
    const casualty = appState.casualties.find(c => c.id === casualtyId);
    if (!casualty) return;

    const statuses = ['Waiting', 'In Surgery', 'Critical Care', 'Observation', 'Discharged', 'Deceased'];
    const currentIndex = statuses.indexOf(casualty.status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    
    casualty.status = statuses[nextIndex];
    
    // Close details modal if open
    closeDetailsModal();
    
    // Refresh displays
    renderCasualties();
    updateDashboard();
    
    // Show notification
    showNotification(`Updated ${casualty.name}'s status to: ${casualty.status}`);
}

function closeDetailsModal() {
    document.getElementById('casualty-details-modal').classList.add('hidden');
}

// Add Casualty Modal
function initCasualtyModal() {
    const modal = document.getElementById('casualty-modal');
    const openButtons = document.querySelectorAll('#add-casualty-btn, #add-casualty-modal-btn');
    const closeButton = document.getElementById('close-modal');
    const cancelButton = document.getElementById('cancel-casualty');
    const form = document.getElementById('casualty-form');

    openButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });
    });

    closeButton.addEventListener('click', () => {
        modal.classList.add('hidden');
        form.reset();
    });

    cancelButton.addEventListener('click', () => {
        modal.classList.add('hidden');
        form.reset();
    });

    document.getElementById('close-details-modal').addEventListener('click', closeDetailsModal);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addNewCasualty();
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            form.reset();
        }
    });
}

function addNewCasualty() {
    const form = document.getElementById('casualty-form');
    const formData = new FormData(form);
    
    const newCasualty = {
        id: generateCasualtyId(),
        name: document.getElementById('patient-name').value,
        age: parseInt(document.getElementById('patient-age').value),
        gender: document.getElementById('patient-gender').value,
        triage: document.getElementById('patient-triage').value,
        injury: document.getElementById('patient-injury').value,
        status: 'Waiting',
        hospital: document.getElementById('patient-hospital').value,
        arrival: getCurrentTime(),
        kin: document.getElementById('patient-kin').value || 'Unknown'
    };

    appState.casualties.push(newCasualty);
    
    // Close modal and reset form
    document.getElementById('casualty-modal').classList.add('hidden');
    form.reset();
    
    // Refresh displays
    renderCasualties();
    updateDashboard();
    
    // Show notification
    showNotification(`Successfully added new casualty: ${newCasualty.name} (${newCasualty.id})`);
}

// Resource Management
function renderResources() {
    const hospitalContainer = document.getElementById('hospital-resources');
    const equipmentContainer = document.getElementById('equipment-resources');

    const hospitalResources = appState.resources.filter(r => 
        ['ICU Beds', 'Emergency Beds', 'Operating Rooms', 'Medical Staff'].includes(r.type)
    );
    
    const equipmentResources = appState.resources.filter(r => 
        ['Ventilators', 'Ambulances', 'Blood O-'].includes(r.type)
    );

    hospitalContainer.innerHTML = hospitalResources.map(resource => `
        <div class="resource-entry">
            <div>
                <div class="resource-name-type">${resource.type}</div>
                <div class="resource-location">${resource.location}</div>
            </div>
            <div class="resource-availability">${resource.available}/${resource.total}</div>
            <span class="resource-status-badge ${resource.status.toLowerCase().replace(' ', '-')}">${resource.status}</span>
        </div>
    `).join('');

    equipmentContainer.innerHTML = equipmentResources.map(resource => `
        <div class="resource-entry">
            <div>
                <div class="resource-name-type">${resource.type}</div>
                <div class="resource-location">${resource.location}</div>
            </div>
            <div class="resource-availability">${resource.available}/${resource.total}</div>
            <span class="resource-status-badge ${resource.status.toLowerCase().replace(' ', '-')}">${resource.status}</span>
        </div>
    `).join('');
}

// Coordination Management
function renderCoordination() {
    const protocolsList = document.getElementById('protocols-list');
    
    protocolsList.innerHTML = appState.protocols.map(protocol => `
        <div class="protocol-item">
            <div class="protocol-header">
                <span class="protocol-type">${protocol.type}</span>
                <span class="status status--error">${protocol.level}</span>
            </div>
            <div class="protocol-details">
                <div><strong>Response Time:</strong> ${protocol.time}</div>
                <div><strong>Key Actions:</strong> ${protocol.actions}</div>
            </div>
        </div>
    `).join('');
}

// Communication Management
function renderCommunication() {
    const contactsList = document.getElementById('contacts-list');
    
    contactsList.innerHTML = appState.contacts.map(contact => `
        <div class="contact-item">
            <div class="contact-info">
                <div class="contact-name">${contact.name}</div>
                <div class="contact-role">${contact.role} - ${contact.department}</div>
                <div class="contact-phone" onclick="simulateCall('${contact.phone}')">${contact.phone}</div>
            </div>
            <span class="contact-status">${contact.status}</span>
        </div>
    `).join('');
}

function simulateCall(phoneNumber) {
    showNotification(`Initiating call to ${phoneNumber}...`);
}

// Reports and Analytics
function renderReports() {
    renderCasualtyChart();
}

function renderCasualtyChart() {
    const ctx = document.getElementById('casualty-chart');
    if (!ctx) return;

    // Calculate triage distribution
    const triageCounts = appState.casualties.reduce((counts, casualty) => {
        counts[casualty.triage] = (counts[casualty.triage] || 0) + 1;
        return counts;
    }, {});

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Red (Critical)', 'Yellow (Moderate)', 'Green (Minor)', 'Black (Deceased)'],
            datasets: [{
                data: [
                    triageCounts.Red || 0,
                    triageCounts.Yellow || 0,
                    triageCounts.Green || 0,
                    triageCounts.Black || 0
                ],
                backgroundColor: ['#dc2626', '#fbbf24', '#16a34a', '#000000'],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Filter and Search
function initFilters() {
    const triageFilter = document.getElementById('triage-filter');
    const statusFilter = document.getElementById('status-filter');
    const searchInput = document.getElementById('search-casualties');

    [triageFilter, statusFilter, searchInput].forEach(element => {
        if (element) {
            element.addEventListener('change', renderCasualties);
            element.addEventListener('input', renderCasualties);
        }
    });
}

// Notifications
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-success);
        color: var(--color-btn-primary-text);
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 300);
    }, 3000);
}

// Real-time Updates Simulation
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Randomly update resource availability
        const randomResource = appState.resources[Math.floor(Math.random() * appState.resources.length)];
        const change = Math.random() > 0.5 ? 1 : -1;
        
        if (randomResource.available + change >= 0 && randomResource.available + change <= randomResource.total) {
            randomResource.available += change;
            
            // Update status based on availability
            const utilization = randomResource.available / randomResource.total;
            if (utilization < 0.3) {
                randomResource.status = 'Low Stock';
            } else {
                randomResource.status = 'Available';
            }
        }

        // Refresh resource display if on resources tab
        const activeTab = document.querySelector('.tab-content.active');
        if (activeTab && activeTab.id === 'resources') {
            renderResources();
        }
    }, 10000); // Update every 10 seconds
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initTabNavigation();
    initCasualtyModal();
    initFilters();
    
    // Initial render
    updateDashboard();
    renderCasualties();
    renderResources();
    renderCoordination();
    renderCommunication();
    renderReports();
    
    // Start real-time updates
    simulateRealTimeUpdates();
    
    console.log('Disaster Management System initialized successfully');
});