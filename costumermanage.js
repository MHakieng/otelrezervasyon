document.addEventListener("DOMContentLoaded", () => {
    // Sidebar Aktif Sayfa Belirleme
    highlightActiveSidebar();

    // Modal İşlevlerini Ayarla
    setupModalFunctions();
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

function setupModalFunctions() {
    const modals = document.querySelectorAll(".modal");
    const modalCloseButtons = document.querySelectorAll(".modal-close");

    // Modal Açma İşlevi
    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add("show");
        }
    };

    // Modal Kapatma İşlevi
    const closeModal = (modal) => {
        if (modal) {
            modal.classList.remove("show");
        }
    };

    // Modal dışına tıklayarak kapatma
    modals.forEach((modal) => {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Modal Kapatma Butonlarına Tıklama
    modalCloseButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const modal = event.target.closest(".modal");
            closeModal(modal);
        });
    });

    // Düzenleme Detaylarını Açma
    const detailButtons = document.querySelectorAll(".btn-detail");
    detailButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const row = event.target.closest("tr");
            const rowData = {
                id: row.dataset.id || "N/A",
                roomNumber: row.cells[1].textContent,
                roomType: row.cells[2].textContent,
                status: row.cells[3].textContent.trim(),
                price: row.cells[4].textContent.trim().replace("₺", ""),
            };

            const editModal = document.getElementById("modal-detail");
            if (editModal) {
                editModal.querySelector(".modal-body").innerHTML = `
                    <form id="editRoomForm">
                        <div>
                            <label for="editRoomNumber">Adı Soyadı:</label>
                            <input type="text" id="editRoomNumber" name="roomNumber" value="${rowData.roomNumber}" required>
                        </div>
                        <div>
                            <label for="editRoomType">E-Posta:</label>
                            <input type="text" id="editRoomType" name="roomType" value="${rowData.roomType}" required>
                        </div>
                        <div>
                            <label for="editRoomStatus">Telefon:</label>
                           <div>

                            <input type="text" id="editRoomNumber" name="roomNumber" value="${rowData.status}" required>
                        </div>
                        </div>
                        <div>
                            <label for="editPrice">Son Rezervasyon:</label>
                            <input type="number" id="editPrice" name="price" value="${rowData.price}" required>
                        </div>
                    </form>
                `;

                const saveButton = editModal.querySelector(".btn-primary");
                saveButton.onclick = () => {
                    const form = document.getElementById("editRoomForm");
                    const updatedData = {
                        roomNumber: form.roomNumber.value,
                        roomType: form.roomType.value,
                        status: form.roomStatus.value,
                        price: form.price.value,
                    };

                    row.cells[1].textContent = updatedData.roomNumber;
                    row.cells[2].textContent = updatedData.roomType;
                    row.cells[3].innerHTML = `<span class="badge ${getBadgeClass(updatedData.status)}">${updatedData.status}</span>`;
                    row.cells[4].textContent = `${updatedData.price}₺`;

                    closeModal(editModal);
                };

                openModal("modal-detail");
            }
        });
    });

    // "Sil" Butonu İşlevi
    const deleteButtons = document.querySelectorAll(".btn-danger");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const row = event.target.closest("tr"); // Tıklanan satırı al
            if (confirm("Bu odayı silmek istediğinize emin misiniz?")) {
                row.remove(); // Satırı sil
            }
        });
    });

    // Yeni Oda Ekleme
    const addRoomButton = document.querySelector(".btn-primary");
    if (addRoomButton) {
        addRoomButton.addEventListener("click", () => {
            openModal("modal-add");
        });
    }

   
}
