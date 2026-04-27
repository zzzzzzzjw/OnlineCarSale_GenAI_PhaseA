(function() {
    let selectedImages = [];
    const MAX_IMAGES = 6;

    const imageUploadArea = document.getElementById('imageUploadArea');
    const imageFileInput = document.getElementById('carImages');
    const previewContainer = document.getElementById('imagePreviewContainer');

    function renderImagePreviews() {
        previewContainer.innerHTML = '';
        if (selectedImages.length === 0) {
            previewContainer.innerHTML = '<div style="font-size: 0.8rem; color: var(--gray); width: 100%; text-align: center;">No images yet, click above to upload</div>';
            return;
        }
        selectedImages.forEach((src, idx) => {
            const div = document.createElement('div');
            div.className = 'preview-item';
            const img = document.createElement('img');
            img.src = src;
            const removeBtn = document.createElement('div');
            removeBtn.className = 'remove-img';
            removeBtn.innerHTML = '×';
            removeBtn.addEventListener('click', () => {
                selectedImages.splice(idx, 1);
                renderImagePreviews();
            });
            div.appendChild(img);
            div.appendChild(removeBtn);
            previewContainer.appendChild(div);
        });
    }

    function handleImageUpload(files) {
        if (!files || files.length === 0) return;
        const remainingSlots = MAX_IMAGES - selectedImages.length;
        if (files.length > remainingSlots) {
            showToast(`Maximum ${MAX_IMAGES} images. You can add ${remainingSlots} more`, 'error');
            return;
        }
        Array.from(files).forEach(file => {
            if (!file.type.match('image.*')) {
                showToast(`${file.name} is not an image`, 'error');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                showToast(`${file.name} exceeds 5MB`, 'error');
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                selectedImages.push(e.target.result);
                renderImagePreviews();
            };
            reader.readAsDataURL(file);
        });
        imageFileInput.value = '';
    }

    imageUploadArea.addEventListener('click', () => imageFileInput.click());
    imageUploadArea.addEventListener('dragover', (e) => { e.preventDefault(); imageUploadArea.style.borderColor = 'var(--primary)'; });
    imageUploadArea.addEventListener('dragleave', () => { imageUploadArea.style.borderColor = 'var(--gray-light)'; });
    imageUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        imageUploadArea.style.borderColor = 'var(--gray-light)';
        handleImageUpload(e.dataTransfer.files);
    });
    imageFileInput.addEventListener('change', (e) => handleImageUpload(e.target.files));

    function generateTitle() {
        const year = document.getElementById('year').value.trim();
        const brand = document.getElementById('brand').value.trim();
        const model = document.getElementById('model').value.trim();
        return `${year} ${brand} ${model}`;
    }

    function setError(fieldId, message) {
        const errorDiv = document.querySelector(`.error-msg[data-for="${fieldId}"]`);
        if (errorDiv) errorDiv.textContent = message || '';
    }
    
    function clearErrors() {
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    }

    function validateForm() {
        let isValid = true;
        clearErrors();
        
        const brand = document.getElementById('brand').value.trim();
        const model = document.getElementById('model').value.trim();
        const year = document.getElementById('year').value.trim();
        const price = document.getElementById('price').value.trim();
        const contactPhone = document.getElementById('contactPhone').value.trim();

        if (!brand) { setError('brand', 'Please enter brand'); isValid = false; }
        if (!model) { setError('model', 'Please enter model'); isValid = false; }
        if (!year) { setError('year', 'Please enter year'); isValid = false; }
        else if (parseInt(year) < 1990 || parseInt(year) > 2026) { 
            setError('year', 'Year must be between 1990-2026'); 
            isValid = false; 
        }
        if (!price) { setError('price', 'Please enter price'); isValid = false; }
        else if (parseFloat(price) <= 0) { setError('price', 'Price must be positive'); isValid = false; }
        if (!contactPhone) { 
            setError('contactPhone', 'Please enter contact phone'); 
            isValid = false; 
        }
        else if (!/^\d+$/.test(contactPhone)) { 
            setError('contactPhone', 'Please enter numbers only'); 
            isValid = false; 
        }

        if (selectedImages.length === 0) {
            showToast('Please upload at least one vehicle image', 'error');
            isValid = false;
        }
        
        return isValid;
    }

    function getCarFormData() {
        return {
            id: 'car_' + Date.now() + '_' + Math.random().toString(36).substr(2, 8),
            title: generateTitle(),
            brand: document.getElementById('brand').value.trim(),
            model: document.getElementById('model').value.trim(),
            year: parseInt(document.getElementById('year').value.trim()),
            price: parseFloat(document.getElementById('price').value.trim()),
            mileage: document.getElementById('mileage').value ? parseFloat(document.getElementById('mileage').value) : null,
            transmission: document.getElementById('transmission').value,
            fuelType: document.getElementById('fuelType').value,
            color: document.getElementById('color').value.trim(),
            city: document.getElementById('city').value.trim(),
            contactPhone: document.getElementById('contactPhone').value.trim(),
            description: document.getElementById('description').value.trim(),
            images: selectedImages,
            image: selectedImages[0] || '',
            createdAt: new Date().toISOString(),
            status: 'active',
            views: 0
        };
    }

    function saveCarToStorage(carData) {
        let cars = JSON.parse(localStorage.getItem('autohub_cars') || '[]');
        cars.unshift(carData);
        localStorage.setItem('autohub_cars', JSON.stringify(cars));
        return true;
    }

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    const form = document.getElementById('addCarForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        const carData = getCarFormData();
        saveCarToStorage(carData);
        showToast('Car listed successfully! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = `car-detail.html?id=${carData.id}`;
        }, 1500);
    });

    document.getElementById('cancelBtn').addEventListener('click', () => {
        if (confirm('Cancel listing? All entered information will be lost.')) {
            window.location.href = 'index.html';
        }
    });

    renderImagePreviews();
})();