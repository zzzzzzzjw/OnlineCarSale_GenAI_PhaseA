document.addEventListener('DOMContentLoaded', () => {
  // Mock Data for Vehicles
  let vehicles = [
    { id: 1, brand: 'Tesla', model: 'Model 3 Long Range', price: '$45,000', listedDate: '2023-10-01', views: 1240, status: 'Listed' },
    { id: 2, brand: 'BMW', model: 'X5 xDrive40i', price: '$62,000', listedDate: '2023-09-15', views: 890, status: 'Unlisted' },
    { id: 3, brand: 'Audi', model: 'A6 Premium Plus', price: '$55,000', listedDate: '2023-08-22', views: 3200, status: 'Sold' }
  ];

  const vehicleGrid = document.getElementById('vehicleGrid');
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('vehicleSearch');
  const searchError = document.getElementById('searchError');

  // Client-Side Validation using Regex for search input
  const searchRegex = /^[a-zA-Z0-9\s-]*$/;

  /**
   * Renders the vehicle grid securely based on the provided data array.
   */
  const renderVehicles = (data) => {
    vehicleGrid.innerHTML = ''; // Clear current grid
    
    if (data.length === 0) {
      vehicleGrid.innerHTML = '<p>No vehicles found.</p>';
      return;
    }

    data.forEach(vehicle => {
      // Determine CSS class based on status
      const statusClass = vehicle.status === 'Listed' ? 'status-listed' : 
                          vehicle.status === 'Unlisted' ? 'status-unlisted' : 'status-sold';
      
      const toggleText = vehicle.status === 'Listed' ? 'Unlist' : 'List';
      const toggleDisabled = vehicle.status === 'Sold' ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : '';

      const cardHTML = `
        <article class="vehicle-card" data-id="${vehicle.id}">
          <div class="vehicle-image-container">
            <span class="status-tag ${statusClass}" aria-label="Status: ${vehicle.status}">${vehicle.status}</span>
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:#999; font-size:0.9rem;">
              [ ${vehicle.brand} Image ]
            </div>
          </div>
          <div class="vehicle-info">
            <h3 class="vehicle-title">${vehicle.brand} ${vehicle.model}</h3>
            <div class="vehicle-price">${vehicle.price}</div>
            <div class="vehicle-meta">
              <span>Listed: ${vehicle.listedDate}</span>
              <span>👁 ${vehicle.views} views</span>
            </div>
          </div>
          <div class="vehicle-actions">
            <button class="btn-action btn-edit" aria-label="Edit ${vehicle.model}">Edit</button>
            <button class="btn-action btn-toggle" ${toggleDisabled} aria-label="${toggleText} ${vehicle.model}">${toggleText}</button>
            <button class="btn-action btn-delete" aria-label="Delete ${vehicle.model}">Delete</button>
          </div>
        </article>
      `;
      vehicleGrid.insertAdjacentHTML('beforeend', cardHTML);
    });
  };

  // Initial Render
  renderVehicles(vehicles);

  // Search/Filter Event Listener with Regex Validation
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();

    // Regex Validation
    if (!searchRegex.test(query)) {
      searchInput.classList.add('is-invalid');
      searchError.textContent = 'Search contains invalid characters. Use letters, numbers, spaces, or hyphens only.';
      return;
    }

    searchInput.classList.remove('is-invalid');
    searchError.textContent = '';

    const filtered = vehicles.filter(v => 
      v.brand.toLowerCase().includes(query.toLowerCase()) || 
      v.model.toLowerCase().includes(query.toLowerCase())
    );
    renderVehicles(filtered);
  });

  // Event Delegation for action buttons (Edit, Toggle Status, Delete)
  vehicleGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.vehicle-card');
    if (!card) return;
    
    const id = parseInt(card.getAttribute('data-id'));
    const vehicle = vehicles.find(v => v.id === id);

    if (e.target.classList.contains('btn-delete')) {
      if (confirm(`Are you sure you want to delete ${vehicle.model}?`)) {
        vehicles = vehicles.filter(v => v.id !== id);
        renderVehicles(vehicles);
      }
    } else if (e.target.classList.contains('btn-toggle') && vehicle.status !== 'Sold') {
      vehicle.status = vehicle.status === 'Listed' ? 'Unlisted' : 'Listed';
      renderVehicles(vehicles);
    } else if (e.target.classList.contains('btn-edit')) {
      alert(`Redirecting to edit page for ${vehicle.model}...`);
    }
  });
});