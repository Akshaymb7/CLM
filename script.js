// Sample contract data
const contractsData = [
    {
        id: 'CT-2024-001',
        title: 'Software License Agreement',
        client: 'TechCorp Inc.',
        type: 'License Agreement',
        status: 'active',
        startDate: '2024-01-15',
        endDate: '2024-12-15',
        value: '$125,000'
    },
    {
        id: 'CT-2024-002',
        title: 'Maintenance Support Contract',
        client: 'Global Systems Ltd.',
        type: 'Maintenance Contract',
        status: 'expiring',
        startDate: '2023-06-01',
        endDate: '2024-05-31',
        value: '$85,000'
    },
    {
        id: 'CT-2024-003',
        title: 'Cloud Services Agreement',
        client: 'DataFlow Solutions',
        type: 'Service Agreement',
        status: 'active',
        startDate: '2024-03-01',
        endDate: '2025-02-28',
        value: '$200,000'
    },
    {
        id: 'CT-2023-045',
        title: 'Consulting Services Contract',
        client: 'Innovation Hub',
        type: 'Service Agreement',
        status: 'expired',
        startDate: '2023-01-01',
        endDate: '2023-12-31',
        value: '$150,000'
    },
    {
        id: 'CT-2024-004',
        title: 'Enterprise Software License',
        client: 'MegaCorp Industries',
        type: 'License Agreement',
        status: 'expiring',
        startDate: '2023-09-15',
        endDate: '2024-09-14',
        value: '$300,000'
    }
];

// Sample audit log data
const auditData = [
    {
        timestamp: '2024-09-08 14:30:25',
        user: 'john.doe@company.com',
        action: 'Contract Renewed',
        contractId: 'CT-2024-001',
        details: 'Extended contract for 12 months',
        ipAddress: '192.168.1.100'
    },
    {
        timestamp: '2024-09-08 11:15:42',
        user: 'jane.smith@company.com',
        action: 'Contract Modified',
        contractId: 'CT-2024-002',
        details: 'Updated contract value from $80,000 to $85,000',
        ipAddress: '192.168.1.101'
    },
    {
        timestamp: '2024-09-07 16:45:18',
        user: 'admin@company.com',
        action: 'Contract Created',
        contractId: 'CT-2024-004',
        details: 'New enterprise software license contract created',
        ipAddress: '192.168.1.102'
    },
    {
        timestamp: '2024-09-07 09:22:33',
        user: 'mike.johnson@company.com',
        action: 'Contract Terminated',
        contractId: 'CT-2023-045',
        details: 'Contract terminated due to completion',
        ipAddress: '192.168.1.103'
    },
    {
        timestamp: '2024-09-06 13:55:07',
        user: 'sarah.wilson@company.com',
        action: 'Contract Renewed',
        contractId: 'CT-2024-003',
        details: 'Auto-renewed for additional 12 months',
        ipAddress: '192.168.1.104'
    }
];

let selectedContracts = new Set();

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    populateContractsTable();
    populateAuditTable();
});

// Tab switching functionality
function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked tab button
    event.target.classList.add('active');
}

// Populate contracts table
function populateContractsTable() {
    const tbody = document.getElementById('contractsTableBody');
    tbody.innerHTML = '';
    
    contractsData.forEach(contract => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="contract-checkbox" value="${contract.id}" onchange="updateSelectedContracts()"></td>
            <td>${contract.id}</td>
            <td>${contract.title}</td>
            <td>${contract.client}</td>
            <td>${contract.type}</td>
            <td><span class="status ${contract.status}">${contract.status}</span></td>
            <td>${contract.startDate}</td>
            <td>${contract.endDate}</td>
            <td>${contract.value}</td>
            <td class="actions">
                <button class="action-btn renew" onclick="renewContract('${contract.id}')">Renew</button>
                <button class="action-btn view" onclick="viewContract('${contract.id}')">View</button>
                <div class="dropdown">
                    <button class="more-btn">More ▼</button>
                    <div class="dropdown-content">
                        <a href="#" onclick="editContract('${contract.id}')">Edit</a>
                        <a href="#" onclick="duplicateContract('${contract.id}')">Duplicate</a>
                        <a href="#" onclick="terminateContract('${contract.id}')">Terminate</a>
                        <a href="#" onclick="exportContract('${contract.id}')">Export</a>
                    </div>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Populate audit table
function populateAuditTable() {
    const tbody = document.getElementById('auditTableBody');
    tbody.innerHTML = '';
    
    auditData.forEach(log => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${log.timestamp}</td>
            <td>${log.user}</td>
            <td>${log.action}</td>
            <td>${log.contractId}</td>
            <td>${log.details}</td>
            <td>${log.ipAddress}</td>
        `;
        tbody.appendChild(row);
    });
}

// Bulk actions functionality
function toggleBulkActions() {
    const bulkActions = document.getElementById('bulkActions');
    bulkActions.classList.toggle('hidden');
}

function toggleSelectAll() {
    const selectAll = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.contract-checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });
    
    updateSelectedContracts();
}

function updateSelectedContracts() {
    const checkboxes = document.querySelectorAll('.contract-checkbox:checked');
    selectedContracts.clear();
    
    checkboxes.forEach(checkbox => {
        selectedContracts.add(checkbox.value);
    });
    
    document.getElementById('selectedCount').textContent = 
        `${selectedContracts.size} contract${selectedContracts.size !== 1 ? 's' : ''} selected`;
    
    // Update select all checkbox state
    const allCheckboxes = document.querySelectorAll('.contract-checkbox');
    const selectAllCheckbox = document.getElementById('selectAll');
    
    if (selectedContracts.size === 0) {
        selectAllCheckbox.indeterminate = false;
        selectAllCheckbox.checked = false;
    } else if (selectedContracts.size === allCheckboxes.length) {
        selectAllCheckbox.indeterminate = false;
        selectAllCheckbox.checked = true;
    } else {
        selectAllCheckbox.indeterminate = true;
    }
}

// Contract action functions
function renewContract(contractId) {
    alert(`Renewing contract: ${contractId}`);
    // Add audit log entry
    addAuditEntry('Contract Renewed', contractId, `Contract ${contractId} renewed for 12 months`);
}

function viewContract(contractId) {
    alert(`Viewing contract: ${contractId}`);
}

function editContract(contractId) {
    alert(`Editing contract: ${contractId}`);
}

function duplicateContract(contractId) {
    alert(`Duplicating contract: ${contractId}`);
}

function terminateContract(contractId) {
    if (confirm(`Are you sure you want to terminate contract ${contractId}?`)) {
        alert(`Contract ${contractId} terminated`);
        addAuditEntry('Contract Terminated', contractId, `Contract ${contractId} terminated by user`);
    }
}

function exportContract(contractId) {
    alert(`Exporting contract: ${contractId}`);
}

// Bulk action functions
function bulkRenew() {
    if (selectedContracts.size === 0) {
        alert('Please select contracts to renew');
        return;
    }
    
    if (confirm(`Renew ${selectedContracts.size} selected contracts?`)) {
        selectedContracts.forEach(contractId => {
            addAuditEntry('Contract Renewed', contractId, `Bulk renewal of contract ${contractId}`);
        });
        alert(`${selectedContracts.size} contracts renewed successfully`);
        selectedContracts.clear();
        updateSelectedContracts();
    }
}

function bulkExport() {
    if (selectedContracts.size === 0) {
        alert('Please select contracts to export');
        return;
    }
    
    alert(`Exporting ${selectedContracts.size} selected contracts`);
}

function bulkTerminate() {
    if (selectedContracts.size === 0) {
        alert('Please select contracts to terminate');
        return;
    }
    
    if (confirm(`Terminate ${selectedContracts.size} selected contracts? This action cannot be undone.`)) {
        selectedContracts.forEach(contractId => {
            addAuditEntry('Contract Terminated', contractId, `Bulk termination of contract ${contractId}`);
        });
        alert(`${selectedContracts.size} contracts terminated successfully`);
        selectedContracts.clear();
        updateSelectedContracts();
    }
}

// Add new audit entry
function addAuditEntry(action, contractId, details) {
    const now = new Date();
    const timestamp = now.toISOString().slice(0, 19).replace('T', ' ');
    
    const newEntry = {
        timestamp: timestamp,
        user: 'current.user@company.com',
        action: action,
        contractId: contractId,
        details: details,
        ipAddress: '192.168.1.105'
    };
    
    auditData.unshift(newEntry);
    populateAuditTable();
}