/* MANAGE TICKETS PAGE */

document.addEventListener("DOMContentLoaded", function () {

    // SAMPLE TICKET RECORDS

    const tickets = [

        {
            id: "EK-1010",
            title: "Faulty Power Outlet",
            student: "Student D",
            block: "Block A",
            room: "A-210",
            category: "Electrical",
            priority: "High",
            department: "Electrical Maintenance",
            technician: null,
            status: "Pending",
            created: "2026-11-04T10:00:00",
            resolved: null,
            description: "Power outlet near the bed is not working.",
            isDuplicate: false
        },

        {
            id: "EK-1009",
            title: "Broken Shower",
            student: "Student E",
            block: "Block B",
            room: "B-104",
            category: "Plumbing",
            priority: "Medium",
            department: "Plumbing Maintenance",
            technician: null,
            status: "Pending",
            created: "2026-11-03T11:00:00",
            resolved: null,
            description: "The shower is not supplying water properly.",
            isDuplicate: false
        },

        {
            id: "EK-1008",
            title: "Faulty Corridor Lighting",
            student: "Student B",
            block: "Block B",
            room: "Level 2",
            category: "Electrical",
            priority: "High",
            department: "Electrical Maintenance",
            technician: "Aiman",
            status: "Pending",
            created: "2026-11-03T09:00:00",
            resolved: null,
            description: "Several corridor lights are not functioning.",
            isDuplicate: false
        },

        {
            id: "EK-1007",
            title: "Ceiling Fan Not Working",
            student: "Student C",
            block: "Block C",
            room: "C-204",
            category: "Electrical",
            priority: "High",
            department: "Electrical Maintenance",
            technician: "Aiman",
            status: "In Progress",
            created: "2026-11-01T09:00:00",
            resolved: null,
            description: "The ceiling fan does not rotate when switched on.",
            isDuplicate: false
        },

        {
            id: "EK-1006",
            title: "Damaged Electrical Socket",
            student: "Student A",
            block: "Block A",
            room: "A-203",
            category: "Electrical",
            priority: "High",
            department: "Electrical Maintenance",
            technician: "Aiman",
            status: "Pending",
            created: "2026-11-04T08:00:00",
            resolved: null,
            description: "The electrical socket near the study table is not working.",
            isDuplicate: false
        },

        {
            id: "EK-1005",
            title: "Leaking Bathroom Pipe",
            student: "Student A",
            block: "Block B",
            room: "B-105",
            category: "Plumbing",
            priority: "Medium",
            department: "Plumbing Maintenance",
            technician: "Siti",
            status: "In Progress",
            created: "2026-11-02T10:00:00",
            resolved: null,
            description: "Water is leaking from the pipe beneath the bathroom sink.",
            isDuplicate: false
        },

        {
            id: "EK-1004",
            title: "Broken Study Chair",
            student: "Student A",
            block: "Block A",
            room: "A-210",
            category: "Furniture",
            priority: "Low",
            department: "Furniture Maintenance",
            technician: null,
            status: "Pending",
            created: "2026-10-30T08:00:00",
            resolved: null,
            description: "The study chair has a damaged backrest.",
            isDuplicate: false
        },

        {
            id: "EK-1003",
            title: "Faulty Ceiling Light",
            student: "Student A",
            block: "Block C",
            room: "C-301",
            category: "Electrical",
            priority: "High",
            department: "Electrical Maintenance",
            technician: "Aiman",
            status: "Resolved",
            created: "2026-10-26T10:00:00",
            resolved: "2026-10-27T13:00:00",
            description: "The ceiling light was flickering and has been repaired.",
            isDuplicate: false
        },

        {
            id: "EK-1002",
            title: "Blocked Wash Basin",
            student: "Student A",
            block: "Block B",
            room: "B-108",
            category: "Plumbing",
            priority: "Medium",
            department: "Plumbing Maintenance",
            technician: "Siti",
            status: "Resolved",
            created: "2026-10-20T09:00:00",
            resolved: "2026-10-20T18:00:00",
            description: "The wash basin was clogged and has been cleared.",
            isDuplicate: false
        },

        {
            id: "EK-1001",
            title: "Damaged Wardrobe Door",
            student: "Student A",
            block: "Block C",
            room: "C-204",
            category: "Furniture",
            priority: "Low",
            department: "Furniture Maintenance",
            technician: "Kumar",
            status: "Resolved",
            created: "2026-10-16T10:00:00",
            resolved: "2026-10-18T12:00:00",
            description: "The wardrobe door hinge was loose and has been repaired.",
            isDuplicate: false
        }

    ];


    // SAMPLE TECHNICIAN ACCOUNTS

    const technicians = [

        {
            name: "Aiman",
            department: "Electrical Maintenance"
        },

        {
            name: "Siti",
            department: "Plumbing Maintenance"
        },

        {
            name: "Kumar",
            department: "Furniture Maintenance"
        }

    ];


    // SELECT HTML ELEMENTS

    const search = document.getElementById("manageSearch");

    const statusFilter = document.getElementById("manageStatus");

    const categoryFilter = document.getElementById("manageCategory");

    const blockFilter = document.getElementById("manageBlock");

    const recordFilter = document.getElementById("manageRecord");

    const resetButton = document.getElementById("manageReset");

    const tbody = document.getElementById("manageTicketTable");

    const emptyMessage = document.getElementById("manageEmpty");

    const resultCount = document.getElementById("manageResultCount");

    const dialog = document.getElementById("manageTicketDialog");

    const technicianSelect =
        document.getElementById("manageTechnician");

    const statusSelect =
        document.getElementById("manageNewStatus");

    const saveButton =
        document.getElementById("manageSave");

    const duplicateButton =
        document.getElementById("manageMarkDuplicate");

    const message =
        document.getElementById("manageMessage");

    let selectedTicket = null;


    // HELPER FUNCTIONS

    function formatDate(dateValue) {

        if (!dateValue) {
            return "Not resolved";
        }

        return new Date(dateValue).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

    }


    function createCell(row, text, className) {

        const cell = document.createElement("td");

        cell.textContent = text;

        if (className) {
            cell.className = className;
        }

        row.appendChild(cell);

        return cell;

    }


    function createBadge(text, className) {

        const badge = document.createElement("span");

        badge.textContent = text;

        badge.className = className;

        return badge;

    }


    function getLocalDateTime() {

        const date = new Date();

        const year = date.getFullYear();

        const month = String(date.getMonth() + 1).padStart(2, "0");

        const day = String(date.getDate()).padStart(2, "0");

        const hour = String(date.getHours()).padStart(2, "0");

        const minute = String(date.getMinutes()).padStart(2, "0");

        return year + "-" + month + "-" + day +
               "T" + hour + ":" + minute;

    }


    // UPDATE SUMMARY CARDS

    function updateSummary() {

        const activeTickets = tickets.filter(function (ticket) {
            return !ticket.isDuplicate;
        });

        const pending = activeTickets.filter(function (ticket) {
            return ticket.status === "Pending";
        }).length;

        const unassigned = activeTickets.filter(function (ticket) {
            return ticket.technician === null;
        }).length;

        const duplicates = tickets.filter(function (ticket) {
            return ticket.isDuplicate;
        }).length;

        document.getElementById("manageTotal").textContent =
            tickets.length;

        document.getElementById("managePending").textContent =
            pending;

        document.getElementById("manageUnassigned").textContent =
            unassigned;

        document.getElementById("manageDuplicates").textContent =
            duplicates;

    }


    // DISPLAY TICKETS IN TABLE

    function renderTickets() {

        tbody.replaceChildren();

        tickets.forEach(function (ticket) {

            const row = document.createElement("tr");

            if (ticket.isDuplicate) {
                row.classList.add("manage-duplicate-row");
            }

            // SEARCH DATA

            row.dataset.search = [

                ticket.id,
                ticket.title,
                ticket.student,
                ticket.block,
                ticket.room,
                ticket.category,
                ticket.technician || ""

            ].join(" ").toLowerCase();

            row.dataset.status = ticket.status;
            row.dataset.category = ticket.category;
            row.dataset.block = ticket.block;

            row.dataset.record =
                ticket.isDuplicate ? "Duplicate" : "Active";


            // TICKET ID

            createCell(
                row,
                "#" + ticket.id,
                "ticket-id"
            );


            // COMPLAINT TITLE AND DATE

            const titleCell = document.createElement("td");

            const title = document.createElement("strong");

            title.className = "manage-ticket-title";

            title.textContent = ticket.title;

            const date = document.createElement("small");

            date.className = "manage-ticket-date";

            date.textContent = formatDate(ticket.created);

            titleCell.appendChild(title);
            titleCell.appendChild(date);

            row.appendChild(titleCell);


            // LOCATION

            createCell(
                row,
                ticket.block + ", " + ticket.room
            );


            // CATEGORY

            createCell(row, ticket.category);


            // ASSIGNED TECHNICIAN

            const technicianCell =
                document.createElement("td");

            if (ticket.technician) {

                technicianCell.textContent = ticket.technician;

                technicianCell.className =
                    "manage-assignment-name";

            } else {

                technicianCell.textContent = "Not assigned";

                technicianCell.className =
                    "manage-unassigned";

            }

            row.appendChild(technicianCell);


            // PRIORITY

            const priorityCell = document.createElement("td");

            priorityCell.appendChild(
                createBadge(
                    ticket.priority,
                    "priority-" + ticket.priority.toLowerCase()
                )
            );

            row.appendChild(priorityCell);


            // REPAIR STATUS

            const statusCell = document.createElement("td");

            let statusClass = "status-pending";

            if (ticket.status === "In Progress") {

                statusClass = "status-progress";

            } else if (ticket.status === "Resolved") {

                statusClass = "status-resolved";

            }

            statusCell.appendChild(
                createBadge(ticket.status, statusClass)
            );

            row.appendChild(statusCell);


            // RECORD STATUS

            const recordCell = document.createElement("td");

            if (ticket.isDuplicate) {

                recordCell.appendChild(
                    createBadge(
                        "Duplicate",
                        "manage-record-badge manage-record-duplicate"
                    )
                );

            } else {

                recordCell.appendChild(
                    createBadge(
                        "Active",
                        "manage-record-badge manage-record-active"
                    )
                );

            }

            row.appendChild(recordCell);


            // MANAGE BUTTON

            const actionCell = document.createElement("td");

            const button = document.createElement("button");

            button.type = "button";

            button.className = "manage-view-button";

            button.textContent = "Manage";

            button.addEventListener("click", function () {

                openManageDialog(ticket);

            });

            actionCell.appendChild(button);

            row.appendChild(actionCell);

            tbody.appendChild(row);

        });

    }


    // SEARCH AND FILTER TICKETS

    function filterTickets() {

        const keyword = search.value.trim().toLowerCase();

        const selectedStatus = statusFilter.value;

        const selectedCategory = categoryFilter.value;

        const selectedBlock = blockFilter.value;

        const selectedRecord = recordFilter.value;

        const rows = tbody.querySelectorAll("tr");

        let visibleCount = 0;

        rows.forEach(function (row) {

            const matchesSearch =
                row.dataset.search.includes(keyword);

            const matchesStatus =
                selectedStatus === "All" ||
                row.dataset.status === selectedStatus;

            const matchesCategory =
                selectedCategory === "All" ||
                row.dataset.category === selectedCategory;

            const matchesBlock =
                selectedBlock === "All" ||
                row.dataset.block === selectedBlock;

            const matchesRecord =
                selectedRecord === "All" ||
                row.dataset.record === selectedRecord;

            const visible =
                matchesSearch &&
                matchesStatus &&
                matchesCategory &&
                matchesBlock &&
                matchesRecord;

            row.hidden = !visible;

            if (visible) {
                visibleCount++;
            }

        });

        resultCount.textContent =
            "Showing " + visibleCount +
            " of " + tickets.length + " tickets";

        emptyMessage.hidden = visibleCount !== 0;

    }


    // RESET FILTERS

    resetButton.addEventListener("click", function () {

        search.value = "";

        statusFilter.value = "All";

        categoryFilter.value = "All";

        blockFilter.value = "All";

        recordFilter.value = "All";

        filterTickets();

    });


    search.addEventListener("input", filterTickets);

    statusFilter.addEventListener("change", filterTickets);

    categoryFilter.addEventListener("change", filterTickets);

    blockFilter.addEventListener("change", filterTickets);

    recordFilter.addEventListener("change", filterTickets);


    // POPULATE TECHNICIAN DROPDOWN

    function populateTechnicians(ticket) {

        technicianSelect.replaceChildren();

        const unassignedOption =
            document.createElement("option");

        unassignedOption.value = "";

        unassignedOption.textContent = "Not Assigned";

        technicianSelect.appendChild(unassignedOption);


        // Only show technicians from the ticket's department

        const availableTechnicians = technicians.filter(function (tech) {

            return tech.department === ticket.department;

        });


        availableTechnicians.forEach(function (tech) {

            const option = document.createElement("option");

            option.value = tech.name;

            option.textContent = tech.name;

            technicianSelect.appendChild(option);

        });

        technicianSelect.value = ticket.technician || "";

        document.getElementById("manageDepartmentNote").textContent =
            "Only technicians from " + ticket.department +
            " can be assigned to this ticket.";

    }


    // OPEN MANAGEMENT POPUP

    function openManageDialog(ticket) {

        selectedTicket = ticket;

        document.getElementById("manageDialogTitle").textContent =
            ticket.title;

        document.getElementById("manageDetailId").textContent =
            "#" + ticket.id;

        document.getElementById("manageDetailStudent").textContent =
            ticket.student;

        document.getElementById("manageDetailLocation").textContent =
            ticket.block + ", " + ticket.room;

        document.getElementById("manageDetailCategory").textContent =
            ticket.category;

        document.getElementById("manageDetailPriority").textContent =
            ticket.priority;

        document.getElementById("manageDetailDepartment").textContent =
            ticket.department;

        document.getElementById("manageDetailDate").textContent =
            formatDate(ticket.created);

        document.getElementById("manageDetailResolved").textContent =
            formatDate(ticket.resolved);

        document.getElementById("manageDetailDescription").textContent =
            ticket.description;


        // POPULATE DROPDOWNS

        populateTechnicians(ticket);

        statusSelect.value = ticket.status;


        // RESET MESSAGE

        message.hidden = true;

        message.className = "manage-message";


        // UPDATE DIALOG RECORD INFORMATION

        updateDialogState();

        dialog.showModal();

    }


    // ENABLE OR DISABLE MANAGEMENT CONTROLS

    function updateDialogState() {

        if (!selectedTicket) {
            return;
        }

        const isDuplicate = selectedTicket.isDuplicate;

        technicianSelect.disabled = isDuplicate;

        statusSelect.disabled = isDuplicate;

        saveButton.disabled = isDuplicate;


        if (isDuplicate) {

            duplicateButton.textContent = "Restore Ticket";

            duplicateButton.classList.add("restore");

            document.getElementById("manageDetailRecord").textContent =
                "Duplicate Record";

            document.getElementById("manageDepartmentNote").textContent =
                "Restore this ticket before making changes.";

        } else {

            duplicateButton.textContent = "Mark as Duplicate";

            duplicateButton.classList.remove("restore");

            document.getElementById("manageDetailRecord").textContent =
                "Active Record";

        }

    }


    // SAVE TICKET CHANGES

    document.getElementById("manageTicketForm")
        .addEventListener("submit", function (event) {

            event.preventDefault();

            if (!selectedTicket) {
                return;
            }

            if (selectedTicket.isDuplicate) {
                return;
            }


            const newTechnician = technicianSelect.value;

            const newStatus = statusSelect.value;


            // CHECK TECHNICIAN ASSIGNMENT

            if (!newTechnician && newStatus !== "Pending") {

                message.hidden = false;

                message.className =
                    "manage-message error";

                message.textContent =
                    "Please assign a technician before moving " +
                    "the ticket to In Progress or Resolved.";

                return;

            }


            // SAVE ASSIGNMENT

            selectedTicket.technician =
                newTechnician || null;


            // SAVE REPAIR STATUS

            if (newStatus === "Resolved") {

                if (!selectedTicket.resolved) {

                    selectedTicket.resolved =
                        getLocalDateTime();

                }

            } else {

                selectedTicket.resolved = null;

            }

            selectedTicket.status = newStatus;


            // REFRESH PAGE DATA

            updateSummary();

            renderTickets();

            filterTickets();


            // UPDATE POPUP INFORMATION

            document.getElementById("manageDetailResolved").textContent =
                formatDate(selectedTicket.resolved);

            message.hidden = false;

            message.className = "manage-message";

            message.textContent =
                "Ticket changes have been updated successfully " +
                "in this storyboard preview.";

        });


    // MARK OR RESTORE DUPLICATE TICKET

    duplicateButton.addEventListener("click", function () {

        if (!selectedTicket) {
            return;
        }

        const isCurrentlyDuplicate =
            selectedTicket.isDuplicate;

        if (!isCurrentlyDuplicate) {

            const confirmed = window.confirm(
                "Are you sure you want to mark ticket #" +
                selectedTicket.id + " as a duplicate?"
            );

            if (!confirmed) {
                return;
            }

            selectedTicket.isDuplicate = true;

        } else {

            const confirmed = window.confirm(
                "Do you want to restore ticket #" +
                selectedTicket.id + "?"
            );

            if (!confirmed) {
                return;
            }

            selectedTicket.isDuplicate = false;

        }


        // REFRESH DASHBOARD

        updateSummary();

        renderTickets();

        filterTickets();


        // UPDATE POPUP

        message.hidden = false;

        message.className = "manage-message";

        if (selectedTicket.isDuplicate) {

            message.textContent =
                "This ticket has been marked as a duplicate. " +
                "Its original complaint information has been retained.";

        } else {

            message.textContent =
                "This ticket has been restored and is now active.";

        }

        updateDialogState();

    });


    // CLOSE POPUP

    document.getElementById("manageCloseDialog")
        .addEventListener("click", function () {

            dialog.close();

        });

    document.getElementById("manageCancel")
        .addEventListener("click", function () {

            dialog.close();

        });


    // INITIALIZE PAGE

    updateSummary();

    renderTickets();

    filterTickets();

});