document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');

    if (!orderId) {
        window.location.href = 'pesanan.html';
        return;
    }
    
    const storeAddresses = {
        "Dunkin'": "SPBU Pos Pengumben, Jl. Raya Pos Pengumben No.28, RT.5/RW.5, Sukabumi Sel., Kb. Jeruk, Kota Jakarta Barat",
        "SaladStop!": "Central Park Mall, Lantai LG, Jl. Letjen S. Parman Kav. 28, Tanjung Duren Sel., Grogol petamburan, Kota Jakarta Barat",
        "Starbucks": "Jl. Kemanggisan Raya No.3, RT.1/RW.9, Kemanggisan, Palmerah, Kota Jakarta Barat",
        "Paris Baguette": "Central Park Mall, Lantai GF, Jl. Letjen S. Parman No.Kav.28, Tanjung Duren Sel., Grogol petamburan, Kota Jakarta Barat"
    };

    const storeGoogleMapsLinks = {
        "Dunkin'": "https://maps.app.goo.gl/EcTPPgH6WVwtWZXk8",
        "SaladStop!": "https://maps.app.goo.gl/PrnyockxPbEvfDuKA",
        "Starbucks": "https://maps.app.goo.gl/32cvd9azukLUUPVn8",
        "Paris Baguette": "https://maps.app.goo.gl/qp9pE8aMbQqk4dLE6"
    };

    const allOrders = JSON.parse(localStorage.getItem('gigitAjaOrders')) || [];
    const order = allOrders.find(o => o.id == orderId);

    if (!order) {
        alert('Pesanan tidak ditemukan!');
        window.location.href = 'pesanan.html';
        return;
    }

    const mapFrame = document.getElementById('order-map-frame');
    const routeButton = document.getElementById('route-button');
    const detailAddress = document.getElementById('order-detail-address');
    
    if (storeAddresses[order.store]) {
        detailAddress.textContent = storeAddresses[order.store];
    }

    if (order.lat && order.lon) {
        const lat = parseFloat(order.lat);
        const lon = parseFloat(order.lon);
        
        const bboxLon1 = lon - 0.005;
        const bboxLat1 = lat - 0.0025;
        const bboxLon2 = lon + 0.005;
        const bboxLat2 = lat + 0.0025;
        const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bboxLon1},${bboxLat1},${bboxLon2},${bboxLat2}&layer=mapnik&marker=${lat},${lon}`;
        mapFrame.src = mapUrl;

        let googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`; // Fallback URL
        if (storeGoogleMapsLinks[order.store]) {
            googleMapsUrl = storeGoogleMapsLinks[order.store];
        }
        routeButton.href = googleMapsUrl;
    }

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
    };
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
        }) + ' WIB';
    };

    document.getElementById('order-detail-id').textContent = order.id;
    document.getElementById('order-detail-img').src = order.img;
    document.getElementById('order-detail-store').textContent = order.store;
    document.getElementById('order-detail-item').textContent = order.item;
    document.getElementById('order-detail-date').textContent = formatDate(order.date);
    document.getElementById('order-detail-price').textContent = formatCurrency(order.price);
});

