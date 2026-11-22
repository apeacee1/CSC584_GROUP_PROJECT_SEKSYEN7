
/* TECHNICIAN DASHBOARD */

document.addEventListener("DOMContentLoaded", function () {

    const search = document.getElementById("techSearch");
    const statusFilter = document.getElementById("techStatusFilter");
    const resetButton = document.getElementById("techReset");

    const rows = document.querySelectorAll("#technicianTicketBody tr");
    const resultCount = document.getElementById("techResultCount");
    const emptyMessage = document.getElementById("techEmpty");

    const dialog = document.getElementById("techDialog");
    const statusSelect = document.getElementById("techNewStatus");
    const statusNote = document.getElementById("techStatusNote");
    const saveButton = document.getElementById("saveTechStatus");
    const updateMessage = document.getElementById("techUpdateMessage");

    let selectedRow = null;


    // SEARCH AND FILTER TICKETS

    function filterTickets() {

        const keyword = search.value.trim().toLowerCase();
        const selectedStatus = statusFilter.value;

        let visibleCount = 0;

        rows.forEach(function (row) {

            const ticketText = (
                row.dataset.id + " " +
                row.dataset.title + " " +
                row.dataset.location
            ).toLowerCase();

            const matchesSearch = ticketText.includes(keyword);

            const matchesStatus =
                selectedStatus === "All" ||
                row.dataset.status === selectedStatus;

            if (matchesSearch && matchesStatus) {
                row.hidden = false;
                visibleCount++;
            } else {
                row.hidden = true;
            }

        });

        resultCount.textContent =
            "Showing " + visibleCount +
            " of " + rows.length + " tickets";

        emptyMessage.hidden = visibleCount !== 0;

    }

    search.addEventListener("input", filterTickets);
    statusFilter.addEventListener("change", filterTickets);


    // RESET FILTER

    resetButton.addEventListener("click", function () {

        search.value = "";
        statusFilter.value = "All";

        filterTickets();

    });


    // UPDATE DASHBOARD STATISTICS

    function updateStatistics() {

        let pending = 0;
        let progress = 0;
        let resolved = 0;

        rows.forEach(function (row) {

            if (row.dataset.status === "Pending") {
                pending++;
            } else if (row.dataset.status === "In Progress") {
                progress++;
            } else if (row.dataset.status === "Resolved") {
                resolved++;
            }

        });

        document.getElementById("techTotal").textContent =
            rows.length;

        document.getElementById("techPending").textContent =
            pending;

        document.getElementById("techProgress").textContent =
            progress;

        document.getElementById("techResolved").textContent =
            resolved;

    }


    // OPEN TICKET DETAILS

    const manageButtons =
        document.querySelectorAll(".tech-manage-button");

    manageButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            selectedRow = button.closest("tr");

            document.getElementById("techDialogTitle").textContent =
                selectedRow.dataset.title;

            document.getElementById("techDetailId").textContent =
                "#" + selectedRow.dataset.id;

            document.getElementById("techDetailStudent").textContent =
                selectedRow.dataset.student;

            document.getElementById("techDetailLocation").textContent =
                selectedRow.dataset.location;

            document.getElementById("techDetailPriority").textContent =
                selectedRow.dataset.priority;

            document.getElementById("techDetailDescription").textContent =
                selectedRow.dataset.description;

            updateMessage.hidden = true;

            // Allow only forward status transitions
            const currentStatus = selectedRow.dataset.status;

            let availableStatuses = [];

            if (currentStatus === "Pending") {

                availableStatuses = ["Pending", "In Progress"];

            } else if (currentStatus === "In Progress") {

                availableStatuses = ["In Progress", "Resolved"];

            } else {

                availableStatuses = ["Resolved"];

            }

            statusSelect.innerHTML = "";

            availableStatuses.forEach(function (status) {

                const option = document.createElement("option");

                option.value = status;
                option.textContent = status;

                statusSelect.appendChild(option);

            });

            statusSelect.value = currentStatus;

            if (currentStatus === "Resolved") {

                statusSelect.disabled = true;
                saveButton.disabled = true;

                statusNote.textContent =
                    "This repair has been completed.";

            } else {

                statusSelect.disabled = false;
                saveButton.disabled = false;

                statusNote.textContent =
                    "Select the next repair status and save.";

            }

            dialog.showModal();

        });

    });


    // SAVE NEW STATUS

    document.getElementById("techUpdateForm")
        .addEventListener("submit", function (event) {

            event.preventDefault();

            if (!selectedRow) {
                return;
            }

            const oldStatus = selectedRow.dataset.status;
            const newStatus = statusSelect.value;

            if (oldStatus === newStatus) {

                updateMessage.hidden = false;
                updateMessage.textContent =
                    "Please select the next repair status.";

                return;
            }

            // Update ticket data
            selectedRow.dataset.status = newStatus;

            // Update status badge in table
            const statusBadge =
                selectedRow.querySelector(".tech-status");

            statusBadge.textContent = newStatus;

            if (newStatus === "Pending") {

                statusBadge.className =
                    "status-pending tech-status";

            } else if (newStatus === "In Progress") {

                statusBadge.className =
                    "status-progress tech-status";

            } else if (newStatus === "Resolved") {

                statusBadge.className =
                    "status-resolved tech-status";

            }

            // Change action button when completed
            const actionButton =
                selectedRow.querySelector(".tech-manage-button");

            if (newStatus === "Resolved") {
                actionButton.textContent = "View Details";
            } else {
                actionButton.textContent = "Manage";
            }

            // Refresh dashboard numbers and filters
            updateStatistics();
            filterTickets();

            // Close popup
            dialog.close();

        });


    // CLOSE POPUP

    document.getElementById("closeTechDialog")
        .addEventListener("click", function () {

            dialog.close();

        });

    document.getElementById("cancelTechUpdate")
        .addEventListener("click", function () {

            dialog.close();

        });


    // INITIAL DASHBOARD

    updateStatistics();
    filterTickets();

});
