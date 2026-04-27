(function() {
    const protectedRoutes = ['add-car.html', 'seller-dashboard.html', 'seller.html'];
    const currentPath = window.location.pathname.toLowerCase();
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';


    const isProtected = protectedRoutes.some(route => currentPath.includes(route));
    if (isProtected && !isLoggedIn) {
        alert('Access Restricted: Please log in to access the seller dashboard.');
        window.location.href = 'login.html';
        return; 
    }

    document.addEventListener('DOMContentLoaded', () => {
        
        const loginNavLinks = document.querySelectorAll('a[href="login.html"]');
        if (isLoggedIn) {
            loginNavLinks.forEach(link => {
                if (!currentPath.includes('login.html')) {
                    link.innerHTML = 'Logout';
                    link.href = '#';
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        sessionStorage.setItem('isLoggedIn', 'false');
                        sessionStorage.removeItem('currentUser');
                        alert('You have been logged out.');
                        window.location.href = 'index.html'; 
                    });
                }
            });
        }

        const allLinks = document.querySelectorAll('a');
        allLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && protectedRoutes.some(route => href.toLowerCase().includes(route))) {
                    if (!isLoggedIn) {
                        e.preventDefault();
                        alert('Access Restricted: Please log in first.');
                        window.location.href = 'login.html'; 
                    }
                }
            });
        });
        
    });
})();