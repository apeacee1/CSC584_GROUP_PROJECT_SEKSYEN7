
/* =====================================
   SAMPLE COMPLAINT DATA
===================================== */

var sampleTickets = [

    {
        id: "EK-1001",
        date: "2026-01-14",
        category: "Electrical",
        department: "Electrical Maintenance",
        priority: "High",
        status: "Resolved"
    },
    {
        id: "EK-1002",
        date: "2026-02-10",
        category: "Plumbing",
        department: "Plumbing Maintenance",
        priority: "Medium",
        status: "Resolved"
    },
    {
        id: "EK-1003",
        date: "2026-03-07",
        category: "Furniture",
        department: "Furniture Maintenance",
        priority: "Low",
        status: "Pending"
    },
    {
        id: "EK-1004",
        date: "2026-04-18",
        category: "Electrical",
        department: "Electrical Maintenance",
        priority: "High",
        status: "In Progress"
    },
    {
        id: "EK-1005",
        date: "2026-05-09",
        category: "Plumbing",
        department: "Plumbing Maintenance",
        priority: "Medium",
        status: "Resolved"
    },
    {
        id: "EK-1006",
        date: "2026-06-21",
        category: "Electrical",
        department: "Electrical Maintenance",
        priority: "High",
        status: "Pending"
    },
    {
        id: "EK-1007",
        date: "2026-07-03",
        category: "Furniture",
        department: "Furniture Maintenance",
        priority: "Low",
        status: "Resolved"
    },
    {
        id: "EK-1008",
        date: "2026-08-15",
        category: "Plumbing",
        department: "Plumbing Maintenance",
        priority: "Medium",
        status: "In Progress"
    },
    {
        id: "EK-1009",
        date: "2026-09-11",
        category: "Electrical",
        department: "Electrical Maintenance",
        priority: "High",
        status: "Resolved"
    },
    {
        id: "EK-1010",
        date: "2026-10-04",
        category: "Electrical",
        department: "Electrical Maintenance",
        priority: "High",
        status: "Pending"
    },
    {
        id: "EK-1011",
        date: "2026-10-17",
        category: "Plumbing",
        department: "Plumbing Maintenance",
        priority: "Medium",
        status: "Resolved"
    },
    {
        id: "EK-1012",
        date: "2026-10-23",
        category: "Furniture",
        department: "Furniture Maintenance",
        priority: "Low",
        status: "In Progress"
    },
    {
        id: "EK-1013",
        date: "2026-11-02",
        category: "Electrical",
        department: "Electrical Maintenance",
        priority: "High",
        status: "Pending"
    },
    {
        id: "EK-1014",
        date: "2026-11-06",
        category: "Plumbing",
        department: "Plumbing Maintenance",
        priority: "Medium",
        status: "Pending"
    },
    {
        id: "EK-1015",
        date: "2026-11-09",
        category: "Electrical",
        department: "Electrical Maintenance",
        priority: "High",
        status: "In Progress"
    },
    {
        id: "EK-1016",
        date: "2026-11-13",
        category: "Furniture",
        department: "Furniture Maintenance",
        priority: "Low",
        status: "Resolved"
    },
    {
        id: "EK-1017",
        date: "2026-11-18",
        category: "Plumbing",
        department: "Plumbing Maintenance",
        priority: "Medium",
        status: "Resolved"
    },
    {
        id: "EK-1018",
        date: "2026-11-20",
        category: "Electrical",
        department: "Electrical Maintenance",
        priority: "High",
        status: "Pending"
    }

];


/* =====================================
   DEPARTMENT INFORMATION
===================================== */

var departments = [
    "Electrical Maintenance",
    "Plumbing Maintenance",
    "Furniture Maintenance"
];


/* =====================================
   GET FILTERED RECORDS
===================================== */

function getFilteredTickets() {

    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;
    var category = document.getElementById("categoryFilter").value;
    var status = document.getElementById("statusFilter").value;

    var filtered = [];

    for (var i = 0; i < sampleTickets.length; i++) {

        var ticket = sampleTickets[i];

        if (startDate !== "" && ticket.date < startDate) {
            continue;
        }

        if (endDate !== "" && ticket.date > endDate) {
            continue;
        }

        if (category !== "all" && ticket.category !== category) {
            continue;
        }

        if (status !== "all" && ticket.status !== status) {
            continue;
        }

        filtered.push(ticket);
    }

    return filtered;
}


/* =====================================
   COUNT COMPLAINT STATUS
===================================== */

function countStatus(tickets, selectedStatus) {

    var count = 0;

    for (var i = 0; i < tickets.length; i++) {

        if (tickets[i].status === selectedStatus) {
            count++;
        }

    }

    return count;
}


/* =====================================
   UPDATE SUMMARY CARDS
===================================== */

function updateSummary(tickets) {

    document.getElementById("totalComplaints").textContent =
        tickets.length;

    document.getElementById("pendingComplaints").textContent =
        countStatus(tickets, "Pending");

    document.getElementById("progressComplaints").textContent =
        countStatus(tickets, "In Progress");

    document.getElementById("resolvedComplaints").textContent =
        countStatus(tickets, "Resolved");
}


/* =====================================
   MONTHLY COMPLAINT CHART
===================================== */

function updateMonthlyChart(tickets) {

    var chart = document.getElementById("monthlyChart");

    var months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov"
    ];

    var monthlyCounts = [];

    for (var i = 0; i < months.length; i++) {
        monthlyCounts.push(0);
    }

    for (var j = 0; j < tickets.length; j++) {

        var monthNumber = parseInt(
            tickets[j].date.substring(5, 7),
            10
        );

        if (monthNumber >= 1 && monthNumber <= 11) {
            monthlyCounts[monthNumber - 1]++;
        }
    }

    var maxCount = 1;

    for (var k = 0; k < monthlyCounts.length; k++) {

        if (monthlyCounts[k] > maxCount) {
            maxCount = monthlyCounts[k];
        }

    }

    var html = "";

    for (var m = 0; m < months.length; m++) {

        var count = monthlyCounts[m];
        var height = (count / maxCount) * 100;

        html +=
            '<div class="bar-column">' +
                '<span class="bar-value">' + count + '</span>' +
                '<div class="bar-track">' +
                    '<div class="bar-fill" style="height:' +
                    height + '%"></div>' +
                '</div>' +
                '<span class="bar-month">' +
                    months[m] +
                '</span>' +
            '</div>';
    }

    chart.innerHTML = html;
}


/* =====================================
   CATEGORY STATISTICS
===================================== */

function updateCategoryStats(tickets) {

    var container = document.getElementById("categoryStats");

    var categories = [
        "Electrical",
        "Plumbing",
        "Furniture"
    ];

    var html = "";

    for (var i = 0; i < categories.length; i++) {

        var categoryCount = 0;

        for (var j = 0; j < tickets.length; j++) {

            if (tickets[j].category === categories[i]) {
                categoryCount++;
            }

        }

        var percentage = 0;

        if (tickets.length > 0) {
            percentage = (categoryCount / tickets.length) * 100;
        }

        html +=
            '<div class="category-item">' +
                '<div class="category-info">' +
                    '<span>' + categories[i] + '</span>' +
                    '<span>' + categoryCount + ' complaints</span>' +
                '</div>' +
                '<div class="progress-background">' +
                    '<div class="progress-fill" style="width:' +
                    percentage + '%"></div>' +
                '</div>' +
            '</div>';
    }

    container.innerHTML = html;
}


/* =====================================
   DEPARTMENT PERFORMANCE
===================================== */

function updateDepartmentStats(tickets) {

    var container = document.getElementById("departmentStats");

    var html = "";

    for (var i = 0; i < departments.length; i++) {

        var departmentName = departments[i];
        var total = 0;
        var resolved = 0;

        for (var j = 0; j < tickets.length; j++) {

            if (tickets[j].department === departmentName) {

                total++;

                if (tickets[j].status === "Resolved") {
                    resolved++;
                }

            }

        }

        var percentage = 0;

        if (total > 0) {
            percentage = Math.round((resolved / total) * 100);
        }

        html +=
            '<div class="department-card">' +
                '<h3>' + departmentName + '</h3>' +

                '<div class="department-numbers">' +
                    '<strong>' + total + '</strong>' +
                    '<span>Total complaints</span>' +
                '</div>' +

                '<div class="progress-background">' +
                    '<div class="progress-fill" style="width:' +
                    percentage + '%"></div>' +
                '</div>' +

                '<p>' + resolved + ' resolved (' +
                percentage + '%)</p>' +
            '</div>';
    }

    container.innerHTML = html;
}


/* =====================================
   FORMAT DATE
===================================== */

function formatDate(dateValue) {

    var parts = dateValue.split("-");

    return parts[2] + "/" + parts[1] + "/" + parts[0];
}


/* =====================================
   UPDATE COMPLAINT TABLE
===================================== */

function updateReportTable(tickets) {

    var tableBody = document.getElementById("reportTableBody");
    var emptyState = document.getElementById("emptyState");

    document.getElementById("recordCount").textContent =
        tickets.length;

    var html = "";

    for (var i = 0; i < tickets.length; i++) {

        var ticket = tickets[i];

        var statusClass = ticket.status.toLowerCase().replace(/\s+/g, "-");
        var priorityClass = ticket.priority.toLowerCase();

        html +=
            '<tr>' +

                '<td class="ticket-id">' +
                    ticket.id +
                '</td>' +

                '<td>' +
                    formatDate(ticket.date) +
                '</td>' +

                '<td>' +
                    ticket.category +
                '</td>' +

                '<td>' +
                    ticket.department +
                '</td>' +

                '<td>' +
                    '<span class="priority-badge priority-' +
                    priorityClass + '">' +
                        ticket.priority +
                    '</span>' +
                '</td>' +

                '<td>' +
                    '<span class="status-badge status-' +
                    statusClass + '">' +
                        ticket.status +
                    '</span>' +
                '</td>' +

            '</tr>';
    }

    tableBody.innerHTML = html;

    if (tickets.length === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
    }
}


/* =====================================
   REFRESH ALL REPORTS
===================================== */

function refreshReports() {

    var filteredTickets = getFilteredTickets();

    updateSummary(filteredTickets);

    updateMonthlyChart(filteredTickets);

    updateCategoryStats(filteredTickets);

    updateDepartmentStats(filteredTickets);

    updateReportTable(filteredTickets);
}


/* =====================================
   RESET FILTERS
===================================== */

function resetFilters() {

    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";

    document.getElementById("categoryFilter").value = "all";
    document.getElementById("statusFilter").value = "all";

    refreshReports();
}


/* =====================================
   EXPORT REPORT TO CSV
===================================== */

function exportReport() {

    var tickets = getFilteredTickets();

    if (tickets.length === 0) {
        alert("There are no records available to export.");
        return;
    }

    var csv = [];

    csv.push([
        "Ticket ID",
        "Date",
        "Category",
        "Department",
        "Priority",
        "Status"
    ].join(","));

    for (var i = 0; i < tickets.length; i++) {

        var ticket = tickets[i];

        var row = [
            ticket.id,
            ticket.date,
            ticket.category,
            ticket.department,
            ticket.priority,
            ticket.status
        ];

        csv.push(row.join(","));
    }

    var csvContent = csv.join("\r\n");

    var blob = new Blob(
        [csvContent],
        { type: "text/csv;charset=utf-8;" }
    );

    var url = window.URL.createObjectURL(blob);

    var downloadLink = document.createElement("a");

    downloadLink.href = url;
    downloadLink.download = "E-Aduan-Kolej-Report.csv";

    document.body.appendChild(downloadLink);

    downloadLink.click();

    document.body.removeChild(downloadLink);

    window.URL.revokeObjectURL(url);
}


/* =====================================
   EVENT LISTENERS
===================================== */

document.getElementById("applyFilters").addEventListener(
    "click",
    refreshReports
);

document.getElementById("resetFilters").addEventListener(
    "click",
    resetFilters
);

document.getElementById("exportReport").addEventListener(
    "click",
    exportReport
);


/* =====================================
   INITIAL PAGE LOAD
===================================== */

refreshReports();
