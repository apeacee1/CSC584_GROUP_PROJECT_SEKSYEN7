
document.addEventListener("DOMContentLoaded", function () {

    const STORAGE_KEY = "eaduanTechnicians";

    // HTML ELEMENTS
    const totalTechnicians = document.getElementById("totalTechnicians");
    const activeTechnicians = document.getElementById("activeTechnicians");
    const inactiveTechnicians = document.getElementById("inactiveTechnicians");
    const totalDepartments = document.getElementById("totalDepartments");

    const pageMessage = document.getElementById("pageMessage");
    const searchInput = document.getElementById("searchInput");
    const departmentFilter = document.getElementById("departmentFilter");
    const statusFilter = document.getElementById("statusFilter");

    const tableBody = document.getElementById("technicianTableBody");
    const emptyState = document.getElementById("emptyState");
    const resultCount = document.getElementById("resultCount");

    const openAddModal = document.getElementById("openAddModal");
    const modal = document.getElementById("technicianModal");
    const modalTitle = document.getElementById("modalTitle");
    const closeModalButton = document.getElementById("closeModal");
    const cancelModalButton = document.getElementById("cancelModal");

    const technicianForm = document.getElementById("technicianForm");
    const technicianId = document.getElementById("technicianId");
    const staffId = document.getElementById("staffId");
    const technicianName = document.getElementById("technicianName");
    const technicianEmail = document.getElementById("technicianEmail");
    const technicianPhone = document.getElementById("technicianPhone");
    const technicianDepartment = document.getElementById("technicianDepartment");
    const saveButton = document.getElementById("saveTechnician");

    // CHECK REQUIRED HTML ELEMENTS
    const elements = [
        totalTechnicians, activeTechnicians, inactiveTechnicians,
        totalDepartments, pageMessage, searchInput, departmentFilter,
        statusFilter, tableBody, emptyState, resultCount, openAddModal,
        modal, modalTitle, closeModalButton, cancelModalButton,
        technicianForm, technicianId, staffId, technicianName,
        technicianEmail, technicianPhone, technicianDepartment, saveButton
    ];

    if (elements.some(element => !element)) {
        console.error("Manage Technicians: Some HTML element IDs are missing.");
        return;
    }

    // CHECK ACCOUNT STATUS
    function isActive(value) {
        return value === true ||
            value === "true" ||
            value === 1 ||
            (typeof value === "string" &&
                value.trim().toLowerCase() === "active");
    }

    // LOAD TECHNICIANS
    function loadTechnicians() {
        try {
            const savedData = localStorage.getItem(STORAGE_KEY);

            if (!savedData) {
                return [];
            }

            const data = JSON.parse(savedData);

            if (!Array.isArray(data)) {
                return [];
            }

            return data.map(function (tech, index) {
                return {
                    ...tech,
                    id: String(
                        tech.id || tech.staffId ||
                        tech.email || ("legacy-" + index)
                    ),
                    staffId: String(tech.staffId || ""),
                    name: String(tech.name || ""),
                    email: String(tech.email || ""),
                    phone: String(tech.phone || ""),
                    department: String(tech.department || ""),
                    assignedTickets: Number(tech.assignedTickets) || 0,
                    active: isActive(tech.active)
                };
            });

        } catch (error) {
            console.error("Error loading technicians:", error);
            return [];
        }
    }

    let technicians = loadTechnicians();

    // SAVE TECHNICIANS
    function saveTechnicians(data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            return true;

        } catch (error) {
            console.error("Error saving technicians:", error);
            showMessage("Unable to save technician information.", "error");
            return false;
        }
    }

    // GENERATE TECHNICIAN ID
    function generateId() {
        return "TECH-" + Date.now();
    }

    // DISPLAY MESSAGE
    function showMessage(message, type) {
        pageMessage.textContent = message;
        pageMessage.className =
            type === "error" ? "mt-message error" : "mt-message";
        pageMessage.hidden = false;
    }

    function clearMessage() {
        pageMessage.textContent = "";
        pageMessage.hidden = true;
    }

    // UPDATE SUMMARY CARDS
    function updateSummary() {
        const activeCount = technicians.filter(
            tech => tech.active
        ).length;

        const inactiveCount = technicians.length - activeCount;

        const departments = new Set(
            technicians
                .map(tech => tech.department.trim().toLowerCase())
                .filter(Boolean)
        );

        totalTechnicians.textContent = technicians.length;
        activeTechnicians.textContent = activeCount;
        inactiveTechnicians.textContent = inactiveCount;
        totalDepartments.textContent = departments.size;
    }

    // CREATE ACTION BUTTON
    function createActionButton(text, action, id, className) {
        const button = document.createElement("button");

        button.type = "button";
        button.textContent = text;
        button.className = "mt-table-action " + className;
        button.dataset.action = action;
        button.dataset.id = id;

        return button;
    }

    // CREATE TECHNICIAN TABLE ROW
    function createTechnicianRow(tech) {
        const row = document.createElement("tr");

        // Technician information
        const personCell = document.createElement("td");
        const personWrapper = document.createElement("div");
        const avatar = document.createElement("div");
        const details = document.createElement("div");
        const name = document.createElement("strong");
        const staff = document.createElement("small");

        personWrapper.className = "mt-person-cell";
        avatar.className = "mt-person-avatar";

        avatar.textContent = tech.name
            .split(" ")
            .map(word => word[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();

        name.textContent = tech.name;
        staff.textContent = tech.staffId;

        details.appendChild(name);
        details.appendChild(staff);

        personWrapper.appendChild(avatar);
        personWrapper.appendChild(details);
        personCell.appendChild(personWrapper);
        row.appendChild(personCell);

        // Department
        const departmentCell = document.createElement("td");
        const departmentLabel = document.createElement("span");

        departmentLabel.className = "mt-department-label";
        departmentLabel.textContent = tech.department;

        departmentCell.appendChild(departmentLabel);
        row.appendChild(departmentCell);

        // Email
        const emailCell = document.createElement("td");
        emailCell.textContent = tech.email;
        row.appendChild(emailCell);

        // Assigned tickets
        const ticketCell = document.createElement("td");
        ticketCell.textContent = tech.assignedTickets;
        row.appendChild(ticketCell);

        // Account status
        const statusCell = document.createElement("td");
        const statusBadge = document.createElement("span");

        statusBadge.className = tech.active
            ? "mt-status-badge mt-status-active"
            : "mt-status-badge mt-status-inactive";

        statusBadge.textContent = tech.active ? "Active" : "Inactive";

        statusCell.appendChild(statusBadge);
        row.appendChild(statusCell);

        // Action buttons
        const actionsCell = document.createElement("td");
        actionsCell.className = "mt-actions-cell";

        actionsCell.appendChild(
            createActionButton(
                "Edit", "edit", tech.id, "mt-edit-button"
            )
        );

        if (tech.active) {
            actionsCell.appendChild(
                createActionButton(
                    "Deactivate", "toggle", tech.id,
                    "mt-deactivate-button"
                )
            );
        } else {
            actionsCell.appendChild(
                createActionButton(
                    "Activate", "toggle", tech.id,
                    "mt-activate-button"
                )
            );
        }

        actionsCell.appendChild(
            createActionButton(
                "Delete", "delete", tech.id, "mt-delete-button"
            )
        );

        row.appendChild(actionsCell);

        return row;
    }

    // DISPLAY TECHNICIANS
    function renderTechnicians() {
        tableBody.replaceChildren();

        const keyword = searchInput.value.trim().toLowerCase();
        const selectedDepartment = departmentFilter.value;
        const selectedStatus = statusFilter.value;

        const filtered = technicians.filter(function (tech) {

            const searchableText = [
                tech.name,
                tech.staffId,
                tech.email,
                tech.phone,
                tech.department
            ].join(" ").toLowerCase();

            const matchesSearch = searchableText.includes(keyword);

            const matchesDepartment =
                !selectedDepartment ||
                tech.department === selectedDepartment;

            const matchesStatus =
                !selectedStatus ||
                (selectedStatus === "active" && tech.active) ||
                (selectedStatus === "inactive" && !tech.active);

            return matchesSearch &&
                matchesDepartment &&
                matchesStatus;
        });

        filtered.forEach(function (tech) {
            tableBody.appendChild(createTechnicianRow(tech));
        });

        emptyState.hidden = filtered.length > 0;

        resultCount.textContent =
            "Showing " + filtered.length +
            " of " + technicians.length + " technicians";

        updateSummary();
    }

    // OPEN MODAL
    function openModalWindow() {
        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
    }

    // CLOSE MODAL
    function closeModalWindow() {
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");

        technicianForm.reset();
        technicianId.value = "";
    }

    // ADD TECHNICIAN MODAL
    openAddModal.addEventListener("click", function () {
        technicianForm.reset();
        technicianId.value = "";

        clearMessage();

        modalTitle.textContent = "Add Technician";
        saveButton.textContent = "Create Technician";

        openModalWindow();
    });

    // EDIT TECHNICIAN MODAL
    function editTechnician(tech) {
        technicianId.value = tech.id;
        staffId.value = tech.staffId;
        technicianName.value = tech.name;
        technicianEmail.value = tech.email;
        technicianPhone.value = tech.phone;
        technicianDepartment.value = tech.department;

        clearMessage();

        modalTitle.textContent = "Edit Technician";
        saveButton.textContent = "Save Changes";

        openModalWindow();
    }

    // ADD OR UPDATE TECHNICIAN
    technicianForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const editingId = technicianId.value;

        const newStaffId = staffId.value.trim();
        const newName = technicianName.value.trim();
        const newEmail = technicianEmail.value.trim();
        const newPhone = technicianPhone.value.trim();
        const newDepartment = technicianDepartment.value;

        if (!newStaffId || !newName || !newEmail || !newDepartment) {
            showMessage("Please complete all required fields.", "error");
            return;
        }

        // CHECK DUPLICATE STAFF ID
        const duplicateStaffId = technicians.some(function (tech) {
            return tech.id !== editingId &&
                tech.staffId.toLowerCase() === newStaffId.toLowerCase();
        });

        if (duplicateStaffId) {
            showMessage("Staff ID already exists.", "error");
            return;
        }

        // CHECK DUPLICATE EMAIL
        const duplicateEmail = technicians.some(function (tech) {
            return tech.id !== editingId &&
                tech.email.toLowerCase() === newEmail.toLowerCase();
        });

        if (duplicateEmail) {
            showMessage("Email address already exists.", "error");
            return;
        }

        let updatedTechnicians = [...technicians];

        if (editingId) {

            // UPDATE EXISTING TECHNICIAN
            const index = updatedTechnicians.findIndex(
                tech => tech.id === editingId
            );

            if (index === -1) {
                showMessage("Technician not found.", "error");
                return;
            }

            updatedTechnicians[index] = {
                ...updatedTechnicians[index],
                staffId: newStaffId,
                name: newName,
                email: newEmail,
                phone: newPhone,
                department: newDepartment
            };

        } else {

            // ADD NEW TECHNICIAN
            const newTechnician = {
                id: generateId(),
                staffId: newStaffId,
                name: newName,
                email: newEmail,
                phone: newPhone,
                department: newDepartment,
                assignedTickets: 0,
                active: true
            };

            updatedTechnicians.push(newTechnician);
        }

        if (!saveTechnicians(updatedTechnicians)) {
            return;
        }

        technicians = updatedTechnicians;

        closeModalWindow();
        renderTechnicians();

        showMessage(
            editingId
                ? "Technician updated successfully."
                : "Technician added successfully.",
            "success"
        );
    });

    // EDIT, ACTIVATE, DEACTIVATE AND DELETE
    tableBody.addEventListener("click", function (event) {

        const button = event.target.closest("button[data-action]");

        if (!button) {
            return;
        }

        const action = button.dataset.action;
        const id = button.dataset.id;

        const selectedTech = technicians.find(
            tech => tech.id === id
        );

        if (!selectedTech) {
            showMessage("Technician not found.", "error");
            return;
        }

        // EDIT
        if (action === "edit") {
            editTechnician(selectedTech);
            return;
        }

        // ACTIVATE / DEACTIVATE
        if (action === "toggle") {

            const newStatus = !selectedTech.active;

            if (selectedTech.active) {
                const confirmation = confirm(
                    "Are you sure you want to deactivate " +
                    selectedTech.name + "?"
                );

                if (!confirmation) {
                    return;
                }
            }

            const updatedTechnicians = technicians.map(function (tech) {
                if (tech.id === id) {
                    return {
                        ...tech,
                        active: newStatus
                    };
                }

                return tech;
            });

            if (!saveTechnicians(updatedTechnicians)) {
                return;
            }

            technicians = updatedTechnicians;
            renderTechnicians();

            showMessage(
                newStatus
                    ? selectedTech.name + " activated successfully."
                    : selectedTech.name + " deactivated successfully.",
                "success"
            );

            return;
        }

        // DELETE
        if (action === "delete") {

            let message =
                "Are you sure you want to permanently delete " +
                selectedTech.name + "?";

            if (selectedTech.assignedTickets > 0) {
                message +=
                    "\n\nThis technician has assigned tickets. " +
                    "Their ticket records will not be deleted.";
            }

            if (!confirm(message)) {
                return;
            }

            const updatedTechnicians = technicians.filter(
                tech => tech.id !== id
            );

            if (!saveTechnicians(updatedTechnicians)) {
                return;
            }

            technicians = updatedTechnicians;
            renderTechnicians();

            showMessage(
                selectedTech.name + " deleted successfully.",
                "success"
            );
        }
    });

    // MODAL BUTTONS
    closeModalButton.addEventListener("click", closeModalWindow);
    cancelModalButton.addEventListener("click", closeModalWindow);

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModalWindow();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (
            event.key === "Escape" &&
            modal.classList.contains("show")
        ) {
            closeModalWindow();
        }
    });

    // SEARCH AND FILTER
    searchInput.addEventListener("input", renderTechnicians);
    departmentFilter.addEventListener("change", renderTechnicians);
    statusFilter.addEventListener("change", renderTechnicians);

    // UPDATE WHEN STORAGE CHANGES IN ANOTHER TAB
    window.addEventListener("storage", function (event) {
        if (event.key === STORAGE_KEY) {
            technicians = loadTechnicians();
            renderTechnicians();
        }
    });

    // INITIAL DISPLAY
    renderTechnicians();

});
