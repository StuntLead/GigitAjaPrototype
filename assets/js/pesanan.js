document.addEventListener('DOMContentLoaded', () => {
    const orderListContainer = document.getElementById('order-list-container');
    const emptyState = document.getElementById('empty-order-state');
    
    const orders = JSON.parse(localStorage.getItem('gigitAjaOrders')) || [];

    if (orders.length === 0) {
        emptyState.style.display = 'flex';
    } else {
        emptyState.style.display = 'none';

        const formatCurrency = (value) => {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
        };
        
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('id-ID', {
                day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
            }) + ' WIB';
        };

        orders.forEach(order => {
            const orderCard = document.createElement('article');
            orderCard.className = 'order-card';
            
            orderCard.innerHTML = `
                <div class="order-card-image">
                    <img src="${order.img}" alt="Gambar pesanan">
                </div>
                <div class="order-card-details">
                    <span class="order-status">Berhasil</span>
                    <h3>${order.store}</h3>
                    <p>${order.item}</p>
                    <div class="order-card-footer">
                        <span class="order-date">${formatDate(order.date)}</span>
                        <span class="order-price">${formatCurrency(order.price)}</span>
                    </div>
                </div>
            `;

            orderCard.addEventListener('click', () => {
                window.location.href = `order-detail.html?id=${order.id}`;
            });

            orderListContainer.appendChild(orderCard);
        });
    }
});

