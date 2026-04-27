(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');
    
    // Default cars data - same as in search.js
    const DEFAULT_CARS = [
        { id: 'car_1', title: '2022 BMW X3 xDrive30i', brand: 'BMW', model: 'X3', year: 2022, price: 38.8, mileage: 3.2, transmission: 'Automatic', fuelType: 'Gasoline', color: 'Blue', city: 'Shanghai', image: '../images/cars/BMW-blue.jpg', createdAt: '2025-01-15' },
        { id: 'car_2', title: '2023 Tesla Model 3', brand: 'Tesla', model: 'Model 3', year: 2023, price: 22.5, mileage: 1.5, transmission: 'Automatic', fuelType: 'Electric', color: 'Silver', city: 'Beijing', image: '../images/cars/TESLA_S.png', createdAt: '2025-02-01' },
        { id: 'car_3', title: '2021 Mercedes-Benz GLC', brand: 'Mercedes-Benz', model: 'GLC', year: 2021, price: 28.9, mileage: 4.8, transmission: 'Automatic', fuelType: 'Gasoline', color: 'Grey', city: 'Shenzhen', image: '../images/cars/SUV-grey.jpg', createdAt: '2025-01-20' },
        { id: 'car_4', title: '2022 Audi Q5', brand: 'Audi', model: 'Q5', year: 2022, price: 35.6, mileage: 2.5, transmission: 'Automatic', fuelType: 'Gasoline', color: 'Red', city: 'Guangzhou', image: '../images/cars/SUV-red.jpg', createdAt: '2025-01-10' },
        { id: 'car_5', title: '2020 BMW 3 Series', brand: 'BMW', model: '3 Series', year: 2020, price: 16.8, mileage: 5.2, transmission: 'Automatic', fuelType: 'Gasoline', color: 'White', city: 'Hangzhou', image: '../images/cars/BMW-white.jpg', createdAt: '2025-01-25' },
        { id: 'car_6', title: '2023 Xiaomi SU7', brand: 'Xiaomi', model: 'SU7', year: 2023, price: 21.6, mileage: 0.8, transmission: 'Automatic', fuelType: 'Electric', color: 'Grey', city: 'Shanghai', image: '../images/cars/xiaomi-grey.jpg', createdAt: '2025-02-10' },
        { id: 'car_7', title: '2024 Mercedes-Benz S-Class', brand: 'Mercedes-Benz', model: 'S-Class', year: 2024, price: 196.8, mileage: 0.5, transmission: 'Automatic', fuelType: 'Gasoline', color: 'Black', city: 'Beijing', image: '../images/cars/car-1.jpg', createdAt: '2025-01-15' },
        { id: 'car_8', title: '2024 BMW X7', brand: 'BMW', model: 'X7', year: 2024, price: 137.0, mileage: 0.32, transmission: 'Automatic', fuelType: 'Gasoline', color: 'Silver', city: 'Shanghai', image: '../images/cars/hero-3.jpg', createdAt: '2025-01-18' },
        { id: 'car_9', title: '2024 Porsche 911 Turbo S', brand: 'Porsche', model: '911 Turbo S', year: 2024, price: 235.9, mileage: 0.15, transmission: 'Automatic', fuelType: 'Gasoline', color: 'Silver', city: 'Guangzhou', image: '../images/cars/car-3.jpg', createdAt: '2025-01-20' },
        { id: 'car_10', title: '2024 Tesla Model S Plaid', brand: 'Tesla', model: 'Model S Plaid', year: 2024, price: 129.9, mileage: 0.08, transmission: 'Automatic', fuelType: 'Electric', color: 'Blue', city: 'Shenzhen', image: '../images/cars/car-4.jpg', createdAt: '2025-01-22' },
        { id: 'car_11', title: '2024 Audi A8L', brand: 'Audi', model: 'A8L', year: 2024, price: 138.0, mileage: 0.41, transmission: 'Automatic', fuelType: 'Gasoline', color: 'Yellow', city: 'Chengdu', image: '../images/cars/car-5.jpg', createdAt: '2025-01-25' },
        { id: 'car_12', title: '2024 Land Rover Range Rover', brand: 'Land Rover', model: 'Range Rover', year: 2024, price: 186.2, mileage: 0.28, transmission: 'Automatic', fuelType: 'Gasoline', color: 'White', city: 'Chongqing', image: '../images/cars/hero-5.jpg', createdAt: '2025-01-28' },
        { id: 'car_13', title: '2024 Ferrari F8 Tributo', brand: 'Ferrari', model: 'F8 Tributo', year: 2024, price: 320.3, mileage: 0.05, transmission: 'Automatic', fuelType: 'Gasoline', color: 'Red', city: 'Shenzhen', image: '../images/cars/hero-1.jpg', createdAt: '2025-02-01' },
        { id: 'car_14', title: '2024 BYD Han EV', brand: 'BYD', model: 'Han EV', year: 2024, price: 27.85, mileage: 0.12, transmission: 'Automatic', fuelType: 'Electric', color: 'Blue', city: 'Changsha', image: '../images/cars/hero-2.jpg', createdAt: '2025-02-05' }
    ];

    if (!carId) {
        document.getElementById('detailContent').innerHTML = `
            <div style="text-align: center; padding: 4rem; grid-column: 1/-1;">
                <h3>No car selected</h3>
                <p>Please go back to the search page and select a car.</p>
                <a href="search.html" class="btn btn-primary">Browse Cars</a>
            </div>
        `;
        return;
    }

    function getCarImage(car) {
        if (car.images && car.images[0]) {
            return car.images[0];
        }
        if (car.image) {
            return car.image;
        }
        return '../images/cars/SUV-grey.jpg';
    }

    // Initialize car data in localStorage if not exists
    function initializeCarData() {
        const formattedDefault = DEFAULT_CARS.map(car => ({
            ...car,
            images: [car.image]
        }));
        
        const stored = localStorage.getItem('autohub_cars');
        let userCars = [];
        
        if (stored) {
            try {
                userCars = JSON.parse(stored);
            } catch(e) { 
                console.error('Error parsing stored cars:', e); 
            }
        }
        
        const defaultIds = DEFAULT_CARS.map(c => c.id);
        const newUserCars = userCars.filter(c => !defaultIds.includes(c.id));
        
        const allCars = [...formattedDefault, ...newUserCars];
        localStorage.setItem('autohub_cars', JSON.stringify(allCars));
        
        return allCars;
    }

    function loadCarDetail() {
        // Initialize data first
        let allCars = initializeCarData();
        
        const car = allCars.find(c => c.id === carId);
        
        if (!car) {
            document.getElementById('detailContent').innerHTML = `
                <div style="text-align: center; padding: 4rem; grid-column: 1/-1;">
                    <h3>Car not found</h3>
                    <p>The car you're looking for doesn't exist or has been removed.</p>
                    <a href="search.html" class="btn btn-primary">Back to Search</a>
                </div>
            `;
            return;
        }

        document.getElementById('breadcrumbTitle').textContent = car.title;

        let viewed = JSON.parse(localStorage.getItem('buyer_viewed_cars') || '[]');
        if (!viewed.includes(carId)) {
            viewed.push(carId);
            localStorage.setItem('buyer_viewed_cars', JSON.stringify(viewed));
        }

        renderCarDetail(car);
        loadRelatedCars(car, allCars);
    }

    function renderCarDetail(car) {
        const mainImage = getCarImage(car);
        const images = car.images && car.images.length > 0 ? car.images : [mainImage];

        const html = `
            <div class="gallery-section">
                <img src="${mainImage}" alt="${car.title}" class="main-image" id="mainImage" onerror="this.src='../images/cars/SUV-grey.jpg'">
                <div class="thumbnail-list" id="thumbnailList">
                    ${images.map((img, idx) => `
                        <img src="${img}" class="thumbnail ${idx === 0 ? 'active' : ''}" data-index="${idx}" onerror="this.src='../images/cars/SUV-grey.jpg'">
                    `).join('')}
                    ${images.length <= 1 ? '<div style="padding: 1rem; text-align: center; color: var(--gray);">Only 1 image available</div>' : ''}
                </div>
            </div>
            <div class="info-section">
            
                <h1 class="car-title">${car.title}</h1>
                
                <div class="car-price" style="color: var(--secondary); text-shadow: 1px 1px 2px rgba(0,0,0,0.15);">
                    ¥${Math.round(car.price * 10000).toLocaleString('en-US')} <small style="color: var(--gray); font-size: 0.5em; text-shadow: none;">RMB</small>
                </div>
                
                <div class="specs-grid">
                    <div class="spec-item"><span class="spec-label">Brand</span><span class="spec-value">${car.brand || 'N/A'}</span></div>
                    <div class="spec-item"><span class="spec-label">Model</span><span class="spec-value">${car.model || 'N/A'}</span></div>
                    <div class="spec-item"><span class="spec-label">Year</span><span class="spec-value">${car.year || 'N/A'}</span></div>
                    <div class="spec-item"><span class="spec-label">Mileage</span><span class="spec-value">${car.mileage ? car.mileage + '万 km' : 'N/A'}</span></div>
                    <div class="spec-item"><span class="spec-label">Transmission</span><span class="spec-value">${car.transmission || 'N/A'}</span></div>
                    <div class="spec-item"><span class="spec-label">Fuel Type</span><span class="spec-value">${car.fuelType || 'N/A'}</span></div>
                    <div class="spec-item"><span class="spec-label">Color</span><span class="spec-value">${car.color || 'N/A'}</span></div>
                    <div class="spec-item"><span class="spec-label">Location</span><span class="spec-value">${car.city || 'N/A'}</span></div>
                </div>
                <div class="description-section">
                    <h3>Description</h3>
                    <p>${car.description || 'No description provided. Contact seller for more information.'}</p>
                </div>
                <div class="seller-card">
                    <h3>📞 Seller Information</h3>
                    <div class="seller-info">Phone: ${car.contactPhone || 'Not provided'}</div>
                    <div class="seller-info">Listed on: ${car.createdAt ? new Date(car.createdAt).toLocaleDateString() : 'Recently'}</div>
                </div>
                <div class="action-buttons">
                    <button class="btn btn-primary" id="contactBtn">Contact Seller</button>
                    <button class="btn btn-secondary" id="saveCarBtn">♡ Save to Favorites</button>
                </div>
            </div>
        `;

        document.getElementById('detailContent').innerHTML = html;

        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImageEl = document.getElementById('mainImage');
        
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                mainImageEl.src = thumb.src;
            });
        });

        const savedCars = JSON.parse(localStorage.getItem('buyer_saved_cars') || '[]');
        const saveBtn = document.getElementById('saveCarBtn');
        
        if (savedCars.includes(car.id)) {
            saveBtn.innerHTML = '❤️ Saved';
            saveBtn.style.background = '#e53e3e';
            saveBtn.style.color = 'white';
            saveBtn.style.borderColor = '#e53e3e';
        }

        saveBtn.addEventListener('click', () => {
            let saved = JSON.parse(localStorage.getItem('buyer_saved_cars') || '[]');
            if (saved.includes(car.id)) {
                saved = saved.filter(id => id !== car.id);
                saveBtn.innerHTML = '♡ Save to Favorites';
                saveBtn.style.background = '';
                saveBtn.style.color = '';
                saveBtn.style.borderColor = '';
                showToast('Removed from favorites');
            } else {
                saved.push(car.id);
                saveBtn.innerHTML = '❤️ Saved';
                saveBtn.style.background = '#e53e3e';
                saveBtn.style.color = 'white';
                saveBtn.style.borderColor = '#e53e3e';
                showToast('Added to favorites');
            }
            localStorage.setItem('buyer_saved_cars', JSON.stringify(saved));
        });

        document.getElementById('contactBtn').addEventListener('click', () => {
            showToast('Contact seller at: ' + (car.contactPhone || 'Number not available'));
        });
    }

    function loadRelatedCars(currentCar, allCars) {
        const related = allCars.filter(car => 
            car.id !== currentCar.id && car.brand === currentCar.brand
        ).slice(0, 3);
        
        if (related.length === 0) {
            document.getElementById('relatedSection').style.display = 'none';
            return;
        }

        document.getElementById('relatedSection').style.display = 'block';
        
        const relatedGrid = document.getElementById('relatedGrid');
        
        function getRelatedImage(car) {
            if (car.images && car.images[0]) return car.images[0];
            if (car.image) return car.image;
            return '../images/cars/SUV-grey.jpg';
        }

        relatedGrid.innerHTML = related.map(car => `
            <div class="related-card">
                <img src="${getRelatedImage(car)}" alt="${car.title}" onerror="this.src='../images/cars/SUV-grey.jpg'">
                <div class="related-card-info">
                    <div class="related-card-title">${car.title}</div>
                    
                    <div class="related-card-price" style="color: var(--secondary); font-weight: 700; margin-bottom: 0.5rem;">
                        ¥${Math.round(car.price * 10000).toLocaleString('en-US')}
                    </div>
                    
                    <a href="car-detail.html?id=${car.id}" class="btn btn-primary btn-sm" style="width: 100%; text-align: center;">View Details</a>
                </div>
            </div>
        `).join('');
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }

    // Load car detail when page loads
    loadCarDetail();
})();