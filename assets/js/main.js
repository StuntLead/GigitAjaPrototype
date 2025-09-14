console.log("GigitAja v3!");

document.addEventListener('DOMContentLoaded', function() {
    
    const userLocation = { lat: -6.201709731459739, lon: 106.78239754435715 }; // BINUS Anggrek
    const storeCoordinates = {
        "Dunkin'": { lat: -6.216421216316474, lon: 106.76718753499887 },
        "SaladStop!": { lat: -6.176269965321287, lon: 106.79197000273065 },
        "Starbucks": { lat: -6.197408336069787, lon: 106.78377270534874 },
        "Paris Baguette": { lat: -6.171039303360259, lon: 106.79570223607178 }
    };

    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; 
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            0.5 - Math.cos(dLat) / 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            (1 - Math.cos(dLon)) / 2;
        return (R * 2 * Math.asin(Math.sqrt(a))).toFixed(1); 
    }

    const filterChips = document.querySelectorAll('.chip');
    if (filterChips.length > 0) {

        const offerCards = document.querySelectorAll('.offer-card');

        offerCards.forEach(card => {
            const storeName = card.dataset.store;
            const storeLocation = storeCoordinates[storeName];
            if (storeLocation) {
                const distance = getDistance(userLocation.lat, userLocation.lon, storeLocation.lat, storeLocation.lon);
                const distanceEl = document.createElement('div');
                distanceEl.className = 'distance-info';
                distanceEl.innerHTML = `<i class="fa-solid fa-person-walking"></i> ${distance} km`;

                card.querySelector('.card-details').appendChild(distanceEl);

                card.dataset.lat = storeLocation.lat;
                card.dataset.lon = storeLocation.lon;
            }
        });

        const slideshowWrapper = document.querySelector('.slideshow-wrapper');
        const slides = document.querySelectorAll('.slide');
        const paginationDotsContainer = document.querySelector('.pagination-dots');
        if (slides.length > 0) {
            let currentIndex = 0;
            const totalSlides = slides.length;

            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.addEventListener('click', () => goToSlide(i));
                paginationDotsContainer.appendChild(dot);
            }
            const dots = document.querySelectorAll('.dot');
            
            function updateDots(index) {
                dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
            }

            function goToSlide(index) {
                slideshowWrapper.style.transform = `translateX(-${index * 100}%)`;
                currentIndex = index;
                updateDots(currentIndex);
            }
            
            goToSlide(0);

            setInterval(() => {
                let nextIndex = (currentIndex + 1) % totalSlides;
                goToSlide(nextIndex);
            }, 4000);
        }

        filterChips.forEach(chip => {
            chip.addEventListener('click', function() {
                filterChips.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                
                const selectedFilter = this.dataset.filter;
                offerCards.forEach(card => {
                    const cardCategory = card.dataset.category;
                    if (selectedFilter === 'semua' || selectedFilter === cardCategory) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });

        offerCards.forEach(card => {
            card.addEventListener('click', function() {
                const data = this.dataset;
                const params = new URLSearchParams({
                    store: data.store,
                    item: data.item,
                    price: data.price,
                    originalPrice: data.originalPrice,
                    rating: data.rating,
                    img: data.img,
                    lat: data.lat, 
                    lon: data.lon  
                });
                
                window.location.href = `detail.html?${params.toString()}`;
            });
        });
    }
});

