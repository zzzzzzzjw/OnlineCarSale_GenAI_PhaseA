(function() {
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

    let allCars = [];
    let filteredCars = [];
    let currentPage = 1;
    let debounceTimer = null;
    let showOnlyFavourites = false; 
    const ITEMS_PER_PAGE = 6;

    const modelSearch = document.getElementById('modelSearch');
    const yearSearch = document.getElementById('yearSearch');
    const brandFilter = document.getElementById('brandFilter');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    const fuelFilter = document.getElementById('fuelFilter');
    const transmissionFilter = document.getElementById('transmissionFilter');
    const sortSelect = document.getElementById('sortSelect');
    const searchBtn = document.getElementById('searchBtn');
    const resetBtn = document.getElementById('resetFilters');
    const favouriteFilterBtn = document.getElementById('favouriteFilterBtn');  

    function loadCars() {
        const formattedDefault = DEFAULT_CARS.map(car => ({
            ...car,
            images: [car.image]
        }));
        
        const stored = localStorage.getItem('autohub_cars');
        let userCars = [];
        
        if (stored) {
            try {
                userCars = JSON.parse(stored);
            } catch(e) { console.error(e); }
        }
        
        const defaultIds = DEFAULT_CARS.map(c => c.id);
        const newUserCars = userCars.filter(c => !defaultIds.includes(c.id));
        
        allCars = [...formattedDefault, ...newUserCars];
        localStorage.setItem('autohub_cars', JSON.stringify(allCars));
        
        filteredCars = [...allCars];
        applySort();
        updateURL();
    }

    function updateURL() {
        const params = new URLSearchParams();
        const model = modelSearch.value.trim();
        const year = yearSearch.value.trim();
        const brand = brandFilter.value;
        const min = minPrice.value;
        const max = maxPrice.value;
        const fuel = fuelFilter.value;
        const transmission = transmissionFilter.value;
        const sort = sortSelect.value;

        if (model) params.set('model', model);
        if (year) params.set('year', year);
        if (brand) params.set('brand', brand);
        if (min) params.set('minPrice', min);
        if (max) params.set('maxPrice', max);
        if (fuel && fuel !== '') params.set('fuel', fuel);
        if (transmission && transmission !== '') params.set('transmission', transmission);
        if (sort && sort !== 'newest') params.set('sort', sort);
        if (showOnlyFavourites) params.set('favourites', 'true');  
        const newUrl = params.toString() ? window.location.pathname + '?' + params.toString() : window.location.pathname;
        window.history.pushState({}, '', newUrl);
    }

    function loadParamsFromURL() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('model')) modelSearch.value = params.get('model');
        if (params.has('year')) yearSearch.value = params.get('year');
        if (params.has('brand')) brandFilter.value = params.get('brand');
        if (params.has('minPrice')) minPrice.value = params.get('minPrice');
        if (params.has('maxPrice')) maxPrice.value = params.get('maxPrice');
        if (params.has('fuel')) fuelFilter.value = params.get('fuel');
        if (params.has('transmission')) transmissionFilter.value = params.get('transmission');
        if (params.has('sort')) sortSelect.value = params.get('sort');
        if (params.has('favourites') && params.get('favourites') === 'true') {
            showOnlyFavourites = true;
            if (favouriteFilterBtn) {
                favouriteFilterBtn.classList.add('active');
                favouriteFilterBtn.innerHTML = '❤️ Favourites (ON)';
            }
        }
    }

    function hasSearchCriteria() {
        return modelSearch.value.trim() !== '' || 
               yearSearch.value.trim() !== '' || 
               brandFilter.value !== '' || 
               (minPrice.value !== '' && minPrice.value !== '0') || 
               (maxPrice.value !== '' && maxPrice.value !== '') ||
               fuelFilter.value !== '' ||
               transmissionFilter.value !== '' ||
               showOnlyFavourites;  
    }

    function applyFilters() {
        const modelKeyword = modelSearch.value.trim().toLowerCase();
        const yearValue = yearSearch.value.trim();
        const brand = brandFilter.value;
        const min = parseFloat(minPrice.value) || 0;
        const max = parseFloat(maxPrice.value) || Infinity;
        const fuel = fuelFilter.value;
        const transmission = transmissionFilter.value;
        
        const savedCars = JSON.parse(localStorage.getItem('buyer_saved_cars') || '[]');  

        filteredCars = allCars.filter(car => {
            if (showOnlyFavourites && !savedCars.includes(car.id)) {
                return false;
            }
            if (modelKeyword) {
                const searchable = (car.title + ' ' + car.model + ' ' + car.brand).toLowerCase();
                if (!searchable.includes(modelKeyword)) return false;
            }
            if (yearValue && car.year !== parseInt(yearValue)) return false;
            if (brand && car.brand !== brand) return false;
            if (car.price < min) return false;
            if (car.price > max) return false;
            if (fuel && car.fuelType !== fuel) return false;
            if (transmission && car.transmission !== transmission) return false;
            return true;
        });

        applySort();
        updateURL();
    }

    function applySort() {
        const sortBy = sortSelect.value;
        switch(sortBy) {
            case 'newest':
                filteredCars.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'price_asc':
                filteredCars.sort((a, b) => a.price - b.price);
                break;
            case 'price_desc':
                filteredCars.sort((a, b) => b.price - a.price);
                break;
            case 'mileage':
                filteredCars.sort((a, b) => (a.mileage || 0) - (b.mileage || 0));
                break;
        }
        currentPage = 1;
        renderResults();
    }

    function renderResults() {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        const pageCars = filteredCars.slice(start, end);
        const container = document.getElementById('carsContainer');
        const countSpan = document.getElementById('resultsCount');
        
        if (hasSearchCriteria()) {
            countSpan.textContent = `${filteredCars.length} car${filteredCars.length !== 1 ? 's' : ''} found`;
        } else {
            countSpan.textContent = '';
        }
        
        if (pageCars.length === 0) {
            container.innerHTML = `<div class="no-results"><div class="no-results-icon">🔍</div><h3>No cars found</h3><p>Try adjusting your search terms or filters</p><button class="btn btn-primary" id="clearFiltersBtn">Clear All Filters</button></div>`;
            const clearBtn = document.getElementById('clearFiltersBtn');
            if (clearBtn) clearBtn.addEventListener('click', resetAllFilters);
            document.getElementById('pagination').innerHTML = '';
            return;
        }
        
        const savedCars = JSON.parse(localStorage.getItem('buyer_saved_cars') || '[]');
        const imagePath = (car) => {
            if (car.images && car.images[0]) return car.images[0];
            if (car.image) return car.image;
            return '../images/cars/SUV-grey.jpg';
        };
        
        container.innerHTML = pageCars.map(car => `
            <div class="car-card">
                <img src="${imagePath(car)}" class="car-image" onerror="this.src='../images/cars/SUV-grey.jpg'">
                <div class="car-info">
                    <h3 class="car-title">${car.title}</h3>
                    <div class="car-price">¥${car.price}万</div>
                    <div class="car-details">
                        <span>📅 ${car.year}</span>
                        <span>📷 ${car.mileage || 0}万 km</span>
                        <span>⚙️ ${car.transmission || 'Auto'}</span>
                        <span>⛽ ${car.fuelType || 'Gasoline'}</span>
                    </div>
                    <div class="card-footer">
                        <span class="car-city">📍 ${car.city || 'China'}</span>
                        <button class="save-btn ${savedCars.includes(car.id) ? 'saved' : ''}" data-id="${car.id}">
                            ${savedCars.includes(car.id) ? '❤️' : '🤍'}
                        </button>
                    </div>
                    <a href="car-detail.html?id=${car.id}" class="btn btn-primary btn-sm" style="width: 100%; margin-top: 0.75rem;">View Details</a>
                </div>
            </div>
        `).join('');
        
        document.querySelectorAll('.save-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const carId = btn.dataset.id;
                let saved = JSON.parse(localStorage.getItem('buyer_saved_cars') || '[]');
                if (saved.includes(carId)) {
                    saved = saved.filter(id => id !== carId);
                    btn.textContent = '🤍';
                    btn.classList.remove('saved');
                    showToast('Removed from favorites');
                    if (showOnlyFavourites) {
                        applyFilters();
                    }
                } else {
                    saved.push(carId);
                    btn.textContent = '❤️';
                    btn.classList.add('saved');
                    showToast('Added to favorites');
                }
                localStorage.setItem('buyer_saved_cars', JSON.stringify(saved));
            });
        });
        
        renderPagination();
    }

    function renderPagination() {
        const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);
        const paginationDiv = document.getElementById('pagination');
        if (totalPages <= 1) {
            paginationDiv.innerHTML = '';
            return;
        }
        let html = '';
        for (let i = 1; i <= Math.min(totalPages, 5); i++) {
            html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }
        paginationDiv.innerHTML = html;
        document.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                currentPage = parseInt(btn.dataset.page);
                renderResults();
                window.scrollTo({ top: 400, behavior: 'smooth' });
            });
        });
    }

    function resetAllFilters() {
        modelSearch.value = '';
        yearSearch.value = '';
        brandFilter.value = '';
        minPrice.value = '';
        maxPrice.value = '';
        fuelFilter.value = '';
        transmissionFilter.value = '';
        sortSelect.value = 'newest';

        if (showOnlyFavourites) {
            showOnlyFavourites = false;
            if (favouriteFilterBtn) {
                favouriteFilterBtn.classList.remove('active');
                favouriteFilterBtn.innerHTML = '❤️ Favourites';
            }
        }
        
        filteredCars = [...allCars];
        applySort();
        updateURL();
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }

    if (favouriteFilterBtn) {
        favouriteFilterBtn.addEventListener('click', () => {
            showOnlyFavourites = !showOnlyFavourites;
            if (showOnlyFavourites) {
                favouriteFilterBtn.classList.add('active');
                favouriteFilterBtn.innerHTML = '❤️ Favourites (ON)';
            } else {
                favouriteFilterBtn.classList.remove('active');
                favouriteFilterBtn.innerHTML = '❤️ Favourites';
            }
            applyFilters();
        });
    }

    brandFilter.addEventListener('change', applyFilters);
    minPrice.addEventListener('input', applyFilters);
    maxPrice.addEventListener('input', applyFilters);
    fuelFilter.addEventListener('change', applyFilters);
    transmissionFilter.addEventListener('change', applyFilters);
    sortSelect.addEventListener('change', applyFilters);
    
    searchBtn.addEventListener('click', () => {
        if (!hasSearchCriteria()) {
            showToast('Please enter at least one search term');
            return;
        }
        applyFilters();
    });
    
    resetBtn.addEventListener('click', resetAllFilters);
    
    window.addEventListener('popstate', () => {
        loadParamsFromURL();
        if (hasSearchCriteria()) {
            applyFilters();
        } else {
            filteredCars = [...allCars];
            applySort();
            renderResults();
        }
    });

    loadParamsFromURL();
    loadCars();
})();
