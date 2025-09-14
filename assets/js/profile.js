document.addEventListener('DOMContentLoaded', () => {
    const clearHistoryButton = document.getElementById('clear-history-button');

    if (clearHistoryButton) {
        clearHistoryButton.addEventListener('click', (event) => {
            event.preventDefault();
            const userConfirmed = confirm(
                'Anda yakin ingin menghapus semua riwayat pesanan?\n\nAksi ini akan mereset simulasi dan tidak dapat diurungkan.'
            );

            if (userConfirmed) {
                localStorage.removeItem('gigitAjaOrders');
                alert('Riwayat pesanan telah berhasil dihapus!');
                window.location.href = 'pesanan.html';
            }
        });
    }
});
