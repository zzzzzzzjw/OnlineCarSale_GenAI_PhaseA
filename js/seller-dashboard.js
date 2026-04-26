/* Modified part start */

document.addEventListener('DOMContentLoaded', () => {
  // Mock Data for Vehicles
  let vehicles = [
    { id: 'car_1', title: '2022 BMW X3 xDrive30i', brand: 'BMW', model: 'X3', year: 2022, price: 38.8, mileage: 3.2, transmission: 'Automatic', fuelType: 'Gasoline', color: 'Blue', city: 'Shanghai', image: '../images/cars/BMW-blue.jpg', createdAt: '2025-01-15' },
        { id: 'car_2', title: '2023 Tesla Model 3', brand: 'Tesla', model: 'Model 3', year: 2023, price: 22.5, mileage: 1.5, transmission: 'Automatic', fuelType: 'Electric', color: 'Silver', city: 'Beijing', image: '../images/cars/TESLA_S.png', createdAt: '2025-02-01' },
        { id: 'car_3', title: '2021 Mercedes-Benz GLC', brand: 'Mercedes-Benz', model: 'GLC', year: 2021, price: 28.9, mileage: 4.8, transmission: 'Automatic', fuelType: 'Gasoline', color: 'Grey', city: 'Shenzhen', image: '../images/cars/SUV-grey.jpg', createdAt: '2025-01-20' },
        { id: 'car_4', title: '2022 Audi Q5', brand: 'Audi', model: 'Q5', year: 2022, price: 35.6, mileage: 2.5, transmission: 'Automatic', fuelType: 'Gasoline', color: 'Red', city: 'Guangzhou', image: '../images/cars/SUV-red.jpg', createdAt: '2025-01-10' },
        { id: 'car_5', title: '2020 BMW 3 Series', brand: 'BMW', model: '3 Series', year: 2020, price: 16.8, mileage: 5.2, transmission: 'Automatic', fuelType: 'Gasoline', color: 'White', city: 'Hangzhou', image: '../images/cars/BMW-white.jpg', createdAt: '2025-01-25' },
        { id: 'car_6', title: '2023 Xiaomi SU7', brand: 'Xiaomi', model: 'SU7', year: 2023, price: 21.6, mileage: 0.8, transmission: 'Automatic', fuelType: 'Electric', color: 'Grey', city: 'Shanghai', image: '../images/cars/xiaomi-grey.jpg', createdAt: '2025-02-10' }
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
   * Completely stripped of status, views, edit, and toggle logic.
   */
  const renderVehicles = (data) => {
    vehicleGrid.innerHTML = ''; 
    
    if (data.length === 0) {
      vehicleGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--gray);">No vehicles found matching your criteria.</p>';
      return;
    }

    data.forEach(vehicle => {
      const cardHTML = `
        <article class="vehicle-card" data-id="${vehicle.id}" tabindex="0" role="button" aria-label="View details for ${vehicle.brand} ${vehicle.model}">
          <div class="vehicle-image-container">
            <img src="${vehicle.image}" alt="${vehicle.brand} ${vehicle.model}">
          </div>
          <div class="vehicle-info">
            <h3 class="vehicle-title">${vehicle.brand} ${vehicle.model}</h3>
            <div class="vehicle-price">¥${Math.round(vehicle.price * 10000).toLocaleString('en-US')}</div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.25rem; font-size: 0.85rem; color: var(--gray-dark); margin-bottom: 0.5rem;">
              <span>Year: ${vehicle.year}</span>
              <span>Colour: ${vehicle.color}</span>
              <span style="grid-column: span 2;">Location: ${vehicle.city}</span>
            </div>
          </div>
          <div class="vehicle-actions">
            <button class="btn-action btn-show-more" aria-label="Show more details for ${vehicle.model}">Show More</button>
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
    
    if (e.target.classList.contains('btn-show-more')) {
      const id = card.getAttribute('data-id'); 
      window.location.href = `vehicle-detail.html?id=${id}`;
    }
  });
});

/* Modified part end */