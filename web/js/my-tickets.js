
/* MY TICKETS PAGE */

document.addEventListener("DOMContentLoaded", function () {

    const search = document.getElementById("ticketSearch");
    const statusFilter = document.getElementById("statusFilter");
    const categoryFilter = document.getElementById("categoryFilter");
    const resetButton = document.getElementById("resetFilters");

    const rows = document.querySelectorAll("#ticketTableBody tr");
    const resultCount = document.getElementById("ticketResultCount");
    const emptyTickets = document.getElementById("emptyTickets");

    // SEARCH AND FILTER

    function filterTickets() {

        const searchValue = search.value.trim().toLowerCase();
        const selectedStatus = statusFilter.value;
        const selectedCategory = categoryFilter.value;

        let visibleCount = 0;

        rows.forEach(function (row) {

            const ticketId = row.querySelector(".ticket-id")
                .textContent.toLowerCase();

            const title = row.querySelector(".my-ticket-title")
                .textContent.toLowerCase();

            const status = row.dataset.status;
            const category = row.dataset.category;

            const matchesSearch =
                ticketId.includes(searchValue) ||
                title.includes(searchValue);

            const matchesStatus =
                selectedStatus === "All" ||
                status === selectedStatus;

            const matchesCategory =
                selectedCategory === "All" ||
                category === selectedCategory;

            if (matchesSearch && matchesStatus && matchesCategory) {
                row.hidden = false;
                visibleCount++;
            } else {
                row.hidden = true;
            }

        });

        resultCount.textContent =
            "Showing " + visibleCount + " of " +
            rows.length + " tickets";

        emptyTickets.hidden = visibleCount !== 0;

    }

    search.addEventListener("input", filterTickets);
    statusFilter.addEventListener("change", filterTickets);
    categoryFilter.addEventListener("change", filterTickets);


    // RESET FILTERS

    resetButton.addEventListener("click", function () {

        search.value = "";
        statusFilter.value = "All";
        categoryFilter.value = "All";

        filterTickets();

    });


    // TICKET DETAILS POPUP

    const dialog = document.getElementById("ticketDetailsDialog");

    const viewButtons = document.querySelectorAll(".my-ticket-view");

    viewButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            document.getElementById("detailId").textContent =
                "#" + button.dataset.id;

            document.getElementById("detailTitle").textContent =
                button.dataset.title;

            document.getElementById("detailBlock").textContent =
                button.dataset.block;

            document.getElementById("detailRoom").textContent =
                button.dataset.room;

            document.getElementById("detailCategory").textContent =
                button.dataset.category;

            document.getElementById("detailPriority").textContent =
                button.dataset.priority;

            document.getElementById("detailDepartment").textContent =
                button.dataset.department;

            document.getElementById("detailDate").textContent =
                button.dataset.date;

            document.getElementById("detailDescription").textContent =
                button.dataset.description;


            // Set ticket status style

            const statusElement = document.getElementById("detailStatus");

            statusElement.textContent = button.dataset.status;
            statusElement.className = "";

            if (button.dataset.status === "Pending") {

                statusElement.className = "status-pending";

            } else if (button.dataset.status === "In Progress") {

                statusElement.className = "status-progress";

            } else if (button.dataset.status === "Resolved") {

                statusElement.className = "status-resolved";

            }

            dialog.showModal();

        });

    });


    // CLOSE POPUP

    document.getElementById("closeTicketDetails")
        .addEventListener("click", function () {

            dialog.close();

        });

    document.getElementById("doneTicketDetails")
        .addEventListener("click", function () {

            dialog.close();

        });


    // Set initial result count
    filterTickets();

});
