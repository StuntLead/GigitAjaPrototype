document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    const store = urlParams.get('store');
    const item = urlParams.get('item');
    const price = urlParams.get('price');
    const originalPrice = urlParams.get('originalPrice');
    const img = urlParams.get('img');
    const rating = urlParams.get('rating');
    const lat = parseFloat(urlParams.get('lat'));
    const lon = parseFloat(urlParams.get('lon'));

    if (!store) {
        window.location.href = 'home.html';
        return;
    }

    const storeAddresses = {
        "Dunkin'": "SPBU Pos Pengumben, Jl. Raya Pos Pengumben No.28, RT.5/RW.5, Sukabumi Sel., Kb. Jeruk, Kota Jakarta Barat",
        "SaladStop!": "Central Park Mall, Lantai LG, Jl. Letjen S. Parman Kav. 28, Tanjung Duren Sel., Grogol petamburan, Kota Jakarta Barat",
        "Starbucks": "Jl. Kemanggisan Raya No.3, RT.1/RW.9, Kemanggisan, Palmerah, Kota Jakarta Barat",
        "Paris Baguette": "Central Park Mall, Lantai GF, Jl. Letjen S. Parman No.Kav.28, Tanjung Duren Sel., Grogol petamburan, Kota Jakarta Barat"
    };

    const mapFrame = document.getElementById('map-frame');
    const detailAddress = document.getElementById('detail-address');

    if (lat && lon) {
        const bboxLon1 = lon - 0.005;
        const bboxLat1 = lat - 0.0025;
        const bboxLon2 = lon + 0.005;
        const bboxLat2 = lat + 0.0025;
        const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bboxLon1},${bboxLat1},${bboxLon2},${bboxLat2}&layer=mapnik&marker=${lat},${lon}`;
        mapFrame.src = mapUrl;
    }
    if (storeAddresses[store]) {
        detailAddress.textContent = storeAddresses[store];
    }

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
    };
    
    document.getElementById('detail-img').src = img;
    document.getElementById('detail-store-name').textContent = store;
    document.getElementById('detail-rating').textContent = rating;
    document.getElementById('detail-item-name').textContent = item;
    
    const formattedPrice = formatCurrency(price);
    const formattedOriginalPrice = formatCurrency(originalPrice);
    const discountAmount = formatCurrency(originalPrice - price);

    document.getElementById('summary-original-price').textContent = formattedOriginalPrice;
    document.getElementById('summary-discount').textContent = `- ${discountAmount}`;
    document.getElementById('summary-total-price').textContent = formattedPrice;
    document.getElementById('footer-price').textContent = formattedPrice;
    
    const buyButton = document.getElementById('buy-now-button');
    const successOverlay = document.getElementById('payment-success-overlay');

    buyButton.addEventListener('click', () => {
        successOverlay.classList.add('visible');

        const newOrder = {
            id: Date.now(),
            store: store,
            item: item,
            price: price,
            img: img,
            date: new Date().toISOString(),
            lat: lat,
            lon: lon
        };

        let orders = JSON.parse(localStorage.getItem('gigitAjaOrders')) || [];
        orders.unshift(newOrder);
        localStorage.setItem('gigitAjaOrders', JSON.stringify(orders));

        setTimeout(() => {
            window.location.href = 'pesanan.html';
        }, 2500);
    });
});

