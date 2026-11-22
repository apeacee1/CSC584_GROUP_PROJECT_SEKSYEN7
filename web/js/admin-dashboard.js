
/* ADMIN DASHBOARD */

document.addEventListener("DOMContentLoaded", function () {

    // SAMPLE TICKET DATA FOR STORYBOARD

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
            description: "Power outlet near the bed is not working."
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
            description: "The shower is not supplying water properly."
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
            description: "Several corridor lights are not functioning."
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
            description: "The ceiling fan does not rotate when switched on."
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
            description: "The electrical socket near the study table is not working."
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
            description: "Water is leaking from the pipe beneath the bathroom sink."
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
            description: "The study chair has a damaged backrest."
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
            description: "The ceiling light was flickering and has been repaired."
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
            description: "The wash basin was clogged and has been cleared."
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
            description: "The wardrobe door hinge was loose and has been repaired."
        }
    ];


    // SAMPLE TECHNICIAN INFORMATION

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


    function getResolutionHours(ticket) {

        if (!ticket.resolved) {
            return null;
        }

        const start = new Date(ticket.created);
        const end = new Date(ticket.resolved);

        return (end - start) / (1000 * 60 * 60);
    }


    function createCell(row, text, className = "") {

        const cell = document.createElement("td");

        cell.textContent = text;

        if (className) {
            cell.className = className;
        }

        row.appendChild(cell);

        return cell;
    }


    function createBadge(text, type) {

        const badge = document.createElement("span");

        badge.textContent = text;

        if (type === "priority") {

            badge.className = "priority-" + text.toLowerCase();

        } else if (text === "Pending") {

            badge.className = "status-pending";

        } else if (text === "In Progress") {

            badge.className = "status-progress";

        } else if (text === "Resolved") {

            badge.className = "status-resolved";
        }

        return badge;
    }


    // DASHBOARD SUMMARY

    function updateStatistics() {

        const total = tickets.length;

        const pending = tickets.filter(function (ticket) {
            return ticket.status === "Pending";
        }).length;

        const progress = tickets.filter(function (ticket) {
            return ticket.status === "In Progress";
        }).length;

        const resolvedTickets = tickets.filter(function (ticket) {
            return ticket.status === "Resolved" && ticket.resolved;
        });

        const totalHours = resolvedTickets.reduce(function (sum, ticket) {
            return sum + getResolutionHours(ticket);
        }, 0);

        document.getElementById("adminTotal").textContent = total;

        document.getElementById("adminPending").textContent = pending;

        document.getElementById("adminProgress").textContent = progress;

        document.getElementById("adminResolved").textContent =
            resolvedTickets.length;

        document.getElementById("adminAverage").textContent =
            resolvedTickets.length > 0
                ? (totalHours / resolvedTickets.length).toFixed(1) + " hrs"
                : "—";
    }


    // CREATE BAR CHART ROW

    function addChartRow(container, label, valueText, percent, colorClass) {

        const row = document.createElement("div");
        row.className = "admin-chart-row";

        const top = document.createElement("div");
        top.className = "admin-chart-top";

        const name = document.createElement("span");
        name.textContent = label;

        const value = document.createElement("span");
        value.textContent = valueText;

        top.appendChild(name);
        top.appendChild(value);

        const track = document.createElement("div");
        track.className = "admin-chart-track";

        const fill = document.createElement("div");
        fill.className = "admin-chart-fill " + colorClass;
        fill.style.width = percent + "%";

        track.appendChild(fill);

        row.appendChild(top);
        row.appendChild(track);

        container.appendChild(row);
    }


    // TICKET VOLUME BY CATEGORY

    function renderCategoryChart() {

        const container =
            document.getElementById("adminCategoryChart");

        container.replaceChildren();

        const categories = ["Electrical", "Plumbing", "Furniture"];

        const counts = categories.map(function (category) {

            return tickets.filter(function (ticket) {
                return ticket.category === category;
            }).length;

        });

        const maximum = Math.max(1, ...counts);

        categories.forEach(function (category, index) {

            const count = counts[index];
            const percent = (count / maximum) * 100;

            const colorClass = category.toLowerCase();

            addChartRow(
                container,
                category,
                count + " tickets",
                percent,
                colorClass
            );

        });
    }


    // AVERAGE RESOLUTION TIME BY BLOCK

    function renderBlockChart() {

        const container =
            document.getElementById("adminBlockChart");

        container.replaceChildren();

        const blocks = ["Block A", "Block B", "Block C"];

        const averages = blocks.map(function (block) {

            const resolved = tickets.filter(function (ticket) {

                return ticket.block === block &&
                       ticket.status === "Resolved" &&
                       ticket.resolved;

            });

            if (resolved.length === 0) {
                return null;
            }

            const totalHours = resolved.reduce(function (sum, ticket) {

                return sum + getResolutionHours(ticket);

            }, 0);

            return totalHours / resolved.length;

        });

        const maximum = Math.max(
            1,
            ...averages.filter(function (value) {
                return value !== null;
            })
        );

        blocks.forEach(function (block, index) {

            const average = averages[index];

            const percent = average === null
                ? 0
                : (average / maximum) * 100;

            const label = average === null
                ? "No resolved tickets"
                : average.toFixed(1) + " hrs";

            addChartRow(
                container,
                block,
                label,
                percent,
                "block"
            );

        });
    }


    // TECHNICIAN PERFORMANCE

    function renderTechnicianPerformance() {

        const tbody =
            document.getElementById("adminTechnicianTable");

        tbody.replaceChildren();

        technicians.forEach(function (technician) {

            const assigned = tickets.filter(function (ticket) {
                return ticket.technician === technician.name;
            });

            const resolved = assigned.filter(function (ticket) {
                return ticket.status === "Resolved";
            });

            const rate = assigned.length > 0
                ? (resolved.length / assigned.length) * 100
                : 0;

            const row = document.createElement("tr");

            createCell(
                row,
                technician.name,
                "admin-technician-name"
            );

            createCell(row, technician.department);
            createCell(row, String(assigned.length));
            createCell(row, String(resolved.length));

            const rateCell = document.createElement("td");

            const wrapper = document.createElement("div");
            wrapper.className = "admin-performance-rate";

            const track = document.createElement("div");
            track.className = "admin-performance-track";

            const fill = document.createElement("div");
            fill.className = "admin-performance-fill";
            fill.style.width = rate + "%";

            const percentage = document.createElement("span");
            percentage.textContent = Math.round(rate) + "%";

            track.appendChild(fill);
            wrapper.appendChild(track);
            wrapper.appendChild(percentage);

            rateCell.appendChild(wrapper);
            row.appendChild(rateCell);

            tbody.appendChild(row);
        });
    }


    // ALL TICKETS TABLE

    function renderTickets() {

        const tbody =
            document.getElementById("adminTicketTable");

        tbody.replaceChildren();

        tickets.forEach(function (ticket) {

            const row = document.createElement("tr");

            row.dataset.status = ticket.status;
            row.dataset.category = ticket.category;

            row.dataset.search = [
                ticket.id,
                ticket.title,
                ticket.student,
                ticket.block,
                ticket.room,
                ticket.category
            ].join(" ").toLowerCase();


            // TICKET ID

            createCell(row, "#" + ticket.id, "ticket-id");


            // COMPLAINT TITLE AND DATE

            const titleCell = document.createElement("td");

            const title = document.createElement("strong");
            title.className = "admin-ticket-title";
            title.textContent = ticket.title;

            const date = document.createElement("small");
            date.className = "admin-ticket-date";
            date.textContent = formatDate(ticket.created);

            titleCell.appendChild(title);
            titleCell.appendChild(date);
            row.appendChild(titleCell);


            // LOCATION AND CATEGORY

            createCell(row, ticket.block + ", " + ticket.room);
            createCell(row, ticket.category);


            // PRIORITY

            const priorityCell = document.createElement("td");

            priorityCell.appendChild(
                createBadge(ticket.priority, "priority")
            );

            row.appendChild(priorityCell);


            // STATUS

            const statusCell = document.createElement("td");

            statusCell.appendChild(
                createBadge(ticket.status, "status")
            );

            row.appendChild(statusCell);


            // VIEW DETAILS BUTTON

            const actionCell = document.createElement("td");

            const button = document.createElement("button");

            button.type = "button";
            button.className = "admin-view-button";
            button.textContent = "View Details";

            button.addEventListener("click", function () {
                openTicketDetails(ticket);
            });

            actionCell.appendChild(button);
            row.appendChild(actionCell);

            tbody.appendChild(row);

        });
    }


    // SEARCH AND FILTER

    const search = document.getElementById("adminSearch");
    const statusFilter = document.getElementById("adminStatusFilter");
    const categoryFilter = document.getElementById("adminCategoryFilter");
    const resetButton = document.getElementById("adminResetFilters");

    function filterTickets() {

        const keyword = search.value.trim().toLowerCase();

        const selectedStatus = statusFilter.value;
        const selectedCategory = categoryFilter.value;

        const rows =
            document.querySelectorAll("#adminTicketTable tr");

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

            const visible =
                matchesSearch &&
                matchesStatus &&
                matchesCategory;

            row.hidden = !visible;

            if (visible) {
                visibleCount++;
            }

        });

        document.getElementById("adminResultCount").textContent =
            "Showing " + visibleCount +
            " of " + tickets.length + " tickets";

        document.getElementById("adminEmpty").hidden =
            visibleCount !== 0;
    }


    search.addEventListener("input", filterTickets);

    statusFilter.addEventListener("change", filterTickets);

    categoryFilter.addEventListener("change", filterTickets);

    resetButton.addEventListener("click", function () {

        search.value = "";
        statusFilter.value = "All";
        categoryFilter.value = "All";

        filterTickets();

    });


    // TICKET DETAILS POPUP

    const dialog = document.getElementById("adminTicketDialog");

    function setDetail(id, value) {
        document.getElementById(id).textContent = value;
    }

    function openTicketDetails(ticket) {

        setDetail("adminDialogTitle", ticket.title);

        setDetail("adminDetailId", "#" + ticket.id);
        setDetail("adminDetailStudent", ticket.student);

        setDetail(
            "adminDetailLocation",
            ticket.block + ", " + ticket.room
        );

        setDetail("adminDetailCategory", ticket.category);
        setDetail("adminDetailPriority", ticket.priority);
        setDetail("adminDetailDepartment", ticket.department);

        setDetail(
            "adminDetailTechnician",
            ticket.technician || "Not assigned"
        );

        setDetail(
            "adminDetailCreated",
            formatDate(ticket.created)
        );

        setDetail(
            "adminDetailResolved",
            formatDate(ticket.resolved)
        );

        setDetail(
            "adminDetailDescription",
            ticket.description
        );


        // STATUS BADGE

        const badge =
            document.getElementById("adminDetailStatus");

        badge.textContent = ticket.status;

        if (ticket.status === "Pending") {

            badge.className = "status-pending";

        } else if (ticket.status === "In Progress") {

            badge.className = "status-progress";

        } else {

            badge.className = "status-resolved";

        }

        dialog.showModal();

    }


    // CLOSE POPUP

    document.getElementById("adminCloseDialog")
        .addEventListener("click", function () {
            dialog.close();
        });

    document.getElementById("adminDoneDialog")
        .addEventListener("click", function () {
            dialog.close();
        });


    // INITIALIZE ADMIN DASHBOARD

    updateStatistics();

    renderCategoryChart();

    renderBlockChart();

    renderTechnicianPerformance();

    renderTickets();

    filterTickets();

});
