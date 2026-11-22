document.addEventListener("DOMContentLoaded", function () {

    const category = document.getElementById("damageCategory");
    const priority = document.getElementById("ticketPriority");
    const department = document.getElementById("ticketDepartment");

    function assignTicket() {

        if (category.value === "Electrical") {

            priority.value = "High";
            department.value = "Electrical Maintenance";

        } else if (category.value === "Plumbing") {

            priority.value = "Medium";
            department.value = "Plumbing Maintenance";

        } else if (category.value === "Furniture") {

            priority.value = "Low";
            department.value = "Furniture Maintenance";

        } else {

            priority.value = "";
            department.value = "";

        }
    }

    if (category && priority && department) {

        category.addEventListener("change", assignTicket);

        // Set the values if a category is already selected
        assignTicket();

    }

});



