document.addEventListener("DOMContentLoaded", () => {
    // Sidebar Aktif Sayfa Belirleme
    highlightActiveSidebar();

    // Detay, Yeni Rezervasyon ve Silme İşlevlerini Ayarlama
    setupModalFunctions();

    // Silme İşlevlerini Aktif Et
    setupDeleteFunctions();
});

function highlightActiveSidebar() {
    const currentPage = window.location.pathname.split("/").pop();
    const menuItems = document.querySelectorAll(".sidebar-menu li a");

    menuItems.forEach((item) => {
        if (item.getAttribute("href") === currentPage) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
}

// Modal İşlevleri
function setupModalFunctions() {
    // Tüm modalları seç
    const modals = document.querySelectorAll(".modal");
    const modalCloseButtons = document.querySelectorAll(".modal-close");

    // Modal açma işlevi
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add("show");
        }
    }

    // Modal kapama işlevi
    function closeModal(modal) {
        if (modal) {
            modal.classList.remove("show");
        }
    }

    // Tüm kapatma butonları için olay dinleyici ekle
    modalCloseButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const modal = event.target.closest(".modal");
            closeModal(modal);
        });
    });

    // Detay butonlarına olay dinleyicisi ekle
    const detailButtons = document.querySelectorAll(".btn-detail");
    detailButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const row = event.target.closest("tr"); // Hangi satıra tıklandığını bul
            const rowData = {
                id: row.dataset.id,
                customerName: row.cells[1].textContent,
                roomNumber: row.cells[2].textContent,
                checkIn: row.cells[3].textContent,
                checkOut: row.cells[4].textContent,
                status: row.cells[5].textContent.trim(),
            };

            // Modal içeriği güncelle
            const detailModal = document.getElementById("modal-detail");
            detailModal.querySelector(".modal-body").innerHTML = `
                <p><strong>ID:</strong> ${rowData.id}</p>
                <p><strong>Müşteri Adı:</strong> ${rowData.customerName}</p>
                <p><strong>Oda No:</strong> ${rowData.roomNumber}</p>
                <p><strong>Giriş Tarihi:</strong> ${rowData.checkIn}</p>
                <p><strong>Çıkış Tarihi:</strong> ${rowData.checkOut}</p>
                <p><strong>Durum:</strong> ${rowData.status}</p>
            `;
            openModal("modal-detail");
        });
    });

    // Yeni Rezervasyon butonuna olay dinleyici ekle
    const addReservationButton = document.querySelector(".btn-primary");
    if (addReservationButton) {
        addReservationButton.addEventListener("click", () => {
            openModal("modal-add");
        });
    }

    // Modalların dışına tıklanırsa kapatma işlevi
    modals.forEach((modal) => {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });
}

// Silme İşlevleri
function setupDeleteFunctions() {
    // Tüm "Sil" butonlarını seç
    const deleteButtons = document.querySelectorAll(".btn-danger");

    // Her bir "Sil" butonuna tıklama olayını ekle
    deleteButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const row = event.target.closest("tr"); // Tıklanan butona ait tablo satırını bul

            // Silme işlemine onay almak için confirm penceresi
            const confirmDelete = confirm("Bu rezervasyonu silmek istediğinize emin misiniz?");
            if (confirmDelete) {
                if (row) {
                    row.remove(); // Satırı DOM'dan kaldır
                    alert("Rezervasyon başarıyla silindi!");
                }
            }
        });
    });
}
