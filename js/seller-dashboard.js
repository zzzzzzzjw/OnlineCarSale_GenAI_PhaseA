/* Modified part start */

document.addEventListener('DOMContentLoaded', () => {
  // Mock Data for Vehicles (Updated with requested placeholder details)
  let vehicles = [
    { id: 1, brand: 'Tesla', model: 'Model 3 Long Range', year: 2022, colour: 'Pearl White', location: 'New York, NY', price: '$45,000', listedDate: '2023-10-01', views: 1240, status: 'Listed', image: '[ Vehicle Image 1 Placeholder ]' },
    { id: 2, brand: 'BMW', model: 'X5 xDrive40i', year: 2021, colour: 'Carbon Black', location: 'Los Angeles, CA', price: '$62,000', listedDate: '2023-09-15', views: 890, status: 'Unlisted', image: '[ Vehicle Image 2 Placeholder ]' },
    { id: 3, brand: 'Audi', model: 'A6 Premium Plus', year: 2023, colour: 'Glacier White', location: 'Chicago, IL', price: '$55,000', listedDate: '2023-08-22', views: 3200, status: 'Sold', image: '[ Vehicle Image 3 Placeholder ]' },
    { id: 4, brand: 'Mercedes', model: 'C-Class C300', year: 2020, colour: 'Obsidian Black', location: 'Miami, FL', price: '$38,000', listedDate: '2023-11-05', views: 450, status: 'Listed', image: '[ Vehicle Image 4 Placeholder ]' }
  ];

  const vehicleGrid = document.getElementById('vehicleGrid');
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('vehicleSearch');
  const searchError = document.getElementById('searchError');

  // Real-time Number Ticking Animation Logic
  const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Easing calculation for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4); 
      element.innerHTML = Math.floor(easeOutQuart * (end - start) + start).toLocaleString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // Trigger animations on load
  const statOrders = document.getElementById('statOrders');
  const statVehicles = document.getElementById('statVehicles');
  if (statOrders) animateValue(statOrders, parseInt(statOrders.innerText), parseInt(statOrders.getAttribute('data-target')), 2500);
  if (statVehicles) animateValue(statVehicles, parseInt(statVehicles.innerText), parseInt(statVehicles.getAttribute('data-target')), 2500);

  // Client-Side Validation using Regex for search input
  const searchRegex = /^[a-zA-Z0-9\s-]*$/;

  /**
   * Renders the vehicle grid securely based on the provided data array.
   */
  const renderVehicles = (data) => {
    vehicleGrid.innerHTML = ''; 
    
    if (data.length === 0) {
      vehicleGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--gray);">No vehicles found matching your criteria.</p>';
      return;
    }

    data.forEach(vehicle => {
      const statusClass = vehicle.status === 'Listed' ? 'status-listed' : 
                          vehicle.status === 'Unlisted' ? 'status-unlisted' : 'status-sold';
      
      const toggleText = vehicle.status === 'Listed' ? 'Unlist' : 'List';
      const toggleDisabled = vehicle.status === 'Sold' ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : '';

      // Emojis removed, detail properties added
      const cardHTML = `
        <article class="vehicle-card" data-id="${vehicle.id}" tabindex="0" role="button" aria-label="View details for ${vehicle.brand} ${vehicle.model}">
          <div class="vehicle-image-container">
            <span class="status-tag ${statusClass}" aria-label="Status: ${vehicle.status}">${vehicle.status}</span>
            <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:#999; font-size:0.9rem;">
              ${vehicle.image}
            </div>
          </div>
          <div class="vehicle-info">
            <h3 class="vehicle-title">${vehicle.brand} ${vehicle.model}</h3>
            <div class="vehicle-price">${vehicle.price}</div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.25rem; font-size: 0.85rem; color: var(--gray-dark); margin-bottom: 1rem;">
              <span>Year: ${vehicle.year}</span>
              <span>Colour: ${vehicle.colour}</span>
              <span style="grid-column: span 2;">Location: ${vehicle.location}</span>
            </div>

            <div class="vehicle-meta">
              <span>Listed: ${vehicle.listedDate}</span>
              <span>Views: ${vehicle.views}</span>
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

  // Search/Filter Event Listener checking new fields
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();

    if (!searchRegex.test(query)) {
      searchInput.classList.add('is-invalid');
      searchError.textContent = 'Search contains invalid characters. Use letters, numbers, spaces, or hyphens only.';
      return;
    }

    searchInput.classList.remove('is-invalid');
    searchError.textContent = '';

    const filtered = vehicles.filter(v => 
      v.brand.toLowerCase().includes(query.toLowerCase()) || 
      v.model.toLowerCase().includes(query.toLowerCase()) ||
      v.colour.toLowerCase().includes(query.toLowerCase()) ||
      v.location.toLowerCase().includes(query.toLowerCase()) ||
      v.year.toString().includes(query)
    );
    renderVehicles(filtered);
  });

  // Event Delegation for action buttons and detail page redirection
  vehicleGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.vehicle-card');
    if (!card) return;
    
    const id = parseInt(card.getAttribute('data-id'));
    const vehicle = vehicles.find(v => v.id === id);

    // Differentiate between clicking action buttons vs clicking the card itself
    if (e.target.classList.contains('btn-delete')) {
      e.stopPropagation(); // Prevent card redirect
      if (confirm(`Are you sure you want to delete ${vehicle.model}?`)) {
        vehicles = vehicles.filter(v => v.id !== id);
        renderVehicles(vehicles);
      }
    } else if (e.target.classList.contains('btn-toggle') && vehicle.status !== 'Sold') {
      e.stopPropagation(); // Prevent card redirect
      vehicle.status = vehicle.status === 'Listed' ? 'Unlisted' : 'Listed';
      renderVehicles(vehicles);
    } else if (e.target.classList.contains('btn-edit')) {
      e.stopPropagation(); // Prevent card redirect
      alert(`Redirecting to edit page for ${vehicle.model}...`);
    } else {
      // If the click is anywhere else on the card, trigger redirect
      window.location.href = `vehicle-detail.html?id=${id}`;
    }
  });
});

/* Modified part end */