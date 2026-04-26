(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');

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

    function loadCarDetail() {
        const stored = localStorage.getItem('autohub_cars');
        let allCars = stored ? JSON.parse(stored) : [];
        
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
                        <div class="car-price">¥${car.price}万 <small>RMB</small></div>
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
                            <div class="related-card-price">¥${car.price}万</div>
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

    loadCarDetail();
})();