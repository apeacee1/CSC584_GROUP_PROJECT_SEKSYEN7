# E-Aduan Kolej -- Hostel Maintenance Complaint System

## 1. Project Overview

**E-Aduan Kolej** is a web-based hostel maintenance complaint system
prototype. It is designed to help students report hostel maintenance
problems, allow technicians to view assigned complaints and update
repair progress, and allow administrators to manage maintenance tickets,
technician records and reports.

The system demonstrates three user roles:

- **Student** -- accesses the student dashboard, submits maintenance
  complaints and views sample ticket information.
- **Technician** -- accesses assigned sample tickets and updates their
  repair status.
- **Administrator** -- views maintenance summaries, manages sample
  tickets and technician records, and views reports and statistics.

> **Project status:** This project is currently a front-end prototype
> built with HTML, CSS and JavaScript in a NetBeans Java Web / Ant
> project. It does not yet contain a connected database, Java Servlet
> implementation or DAO classes. Some functions use sample data, and
> demo login accounts are hardcoded in JavaScript. Registration pages
> demonstrate the user interface and form validation; they do not yet
> create persistent accounts. Do not use this prototype to store real
> student information or passwords.

## 2. Demo Login Accounts

Use the following accounts on `login.html` to preview each user role.

User Role Email / Login ID Password

---

Administrator `admin@eaduan.com` `admin123`
Student `student@eaduan.com` `student123`
Student (alternative login) `2025345678` `student123`
Technician `technician@eaduan.com` `tech123`

### Login notes

- The login page accepts an email address or user ID, depending on the
  demo account.
- The demo accounts are stored in `web/js/login.js`.
- Successful demo login redirects the user to the dashboard for that
  role.
- These are demonstration credentials only, not secure production
  accounts.

### Registration flow

The registration flow provides separate choices and forms for all three
roles:

1.  `role-selection.html` lets the user choose Student, Technician or
    Administrator.
2.  Student selection opens `register.html`.
3.  Technician selection opens `technician-register.html`.
4.  Administrator selection opens `admin-register.html`.

The registration pages provide front-end form validation, including
password confirmation. They do **not** save new accounts to a database
or add new login credentials. Use the demo accounts above to test the
dashboards.

## 3. Main Pages and Functions

All page files are located in the `web/` folder.

---

Page File Main functions

---

Login `login.html` Accepts the demo email /
user ID and password,
then redirects by role.

Role Selection `role-selection.html` Lets the user choose
Student, Technician or
Administrator
registration.

Student Registration `register.html` Demonstrates the student
registration form and
front-end validation.

Technician Registration `technician-register.html` Demonstrates the
technician registration
form and front-end
validation.

Administrator `admin-register.html` Demonstrates the
Registration administrator
registration form and
front-end validation.

Student Dashboard `student-dashboard.html` Displays the student
dashboard and sample
maintenance information.

Create Ticket `create-ticket.html` Provides a maintenance
complaint form. Selecting
a category automatically
fills the suggested
priority and department.

My Tickets `my-tickets.html` Displays sample student
tickets, supports search
and filters, and opens a
ticket-details dialog.

Technician Dashboard `technician-dashboard.html` Displays sample assigned
tickets, supports search
and status filtering, and
opens a dialog to update
a ticket's repair status.

Admin Dashboard `admin-dashboard.html` Displays sample complaint
statistics, charts,
ticket information and
ticket details.

Manage Tickets `manage-tickets.html` Displays sample tickets,
supports
searching/filtering,
technician assignment and
repair-status management.

Manage Technicians `manage-technicians.html` Supports adding, editing,
activating/deactivating
and deleting technician
records in the browser
prototype.

Reports & Statistics `reports-statistics.html` Displays sample reports,
date/status/category
filters, statistics and
report export.

---

### Ticket status flow

The technician dashboard demonstrates this repair-status progression:

1.  **Pending**
2.  **In Progress**
3.  **Resolved**

The available next status depends on the ticket's current status.

## 4. Technology and Development Environment

---

Technology / Tool Purpose

---

HTML5 Page structure and forms

CSS3 Page layouts, dashboard design and
responsive styling

JavaScript Demo login, form validation, page
interactions, filtering, sample
reports and modal dialogs

NetBeans IDE Project development and management

Apache Ant Project build process through
`build.xml`

GlassFish Server Local web application deployment
and testing

---

This project is configured as a **NetBeans Java Web / Ant project**. It
is not a Maven project.

### Requirements

- NetBeans IDE with Java Web project support.
- A compatible GlassFish Server registered in NetBeans.
- A modern web browser such as Google Chrome, Microsoft Edge or
  Firefox.
- JavaScript enabled in the browser.

## 5. How to Open and Run the Project in NetBeans

1.  Extract the project ZIP file.
2.  Open NetBeans IDE.
3.  Select **File → Open Project**.
4.  Select the extracted **`E-Aduan Kolej`** project folder. Choose the
    folder that contains `build.xml` and `nbproject`.
5.  If NetBeans asks for a server, select your installed GlassFish
    Server.
6.  Right-click the project in the Projects panel.
7.  Select **Clean and Build**.
8.  After the build succeeds, right-click the project and select
    **Run**.
9.  The application should open in your browser at the login page.

### Default local URL

The GlassFish configuration sets the context root to `/E-Aduan_Kolej`.

If GlassFish uses the default HTTP port `8080`, open:

```text
http://localhost:8080/E-Aduan_Kolej/login.html
```

If your GlassFish server uses a different port, replace `8080` with the
configured HTTP port.

## 6. Project Folder Structure

The project is organized into the following main folders and files:

- **Project root**
  - `build.xml` – Ant build file used by NetBeans.
    - `README.md` – project documentation.
- **`nbproject/`**
  - `project.xml` – NetBeans project configuration.
  - `project.properties` – NetBeans project properties.
- **`src/`**
  - `conf/` – project configuration files.
  - `java/` – intended location for Java source files; the backend has not been implemented yet.
- **`web/`**
  - `login.html`
  - `role-selection.html`
  - `register.html`
  - `technician-register.html`
  - `admin-register.html`
  - `student-dashboard.html`
  - `create-ticket.html`
  - `my-tickets.html`
  - `technician-dashboard.html`
  - `admin-dashboard.html`
  - `manage-tickets.html`
  - `manage-technicians.html`
  - `reports-statistics.html`
  - **`css/`** – shared dashboard styling and page-specific stylesheets.
  - **`js/`** – JavaScript files for login, registration and page interactions.
  - **`Images/`** – E-Aduan Kolej icon and other image assets.
  - **`WEB-INF/`**
    - `glassfish-web.xml` – GlassFish web application configuration and context root.

## 7. Important Prototype and Data Limitations

Please read this section before testing or presenting the application.

### 7.1 No database connection yet

The current project does not include a database connection, Java Servlet
implementation, DAO classes or implemented Java backend source files.
The pages use sample data and front-end interactions.

### 7.2 Sample ticket data is separate between pages

The Admin Dashboard, Manage Tickets, Technician Dashboard, My Tickets
and Reports & Statistics use sample data in their own page files or
JavaScript. They are not connected to one shared ticket database.

As a result, changing a ticket status on one page does not automatically
update the ticket shown on another page.

### 7.3 Create Ticket form

The Create Ticket page automatically suggests a priority and maintenance
department when a category is selected:

Category Suggested Priority Assigned Department

---

Electrical High Electrical Maintenance
Plumbing Medium Plumbing Maintenance
Furniture Low Furniture Maintenance

The current JavaScript handles the category-based priority and
department selection. It does not save the submitted complaint to a
database or shared ticket store.

### 7.4 Technician records

The Manage Technicians page stores technician records in the browser's
`localStorage` using this key:

```text
eaduanTechnicians
```

These records are stored in the browser for the same website origin.
They are not stored in a central database and are not automatically
shared with another browser or computer.

Adding a technician in Manage Technicians does not create a new login
account. The demo Technician login remains the hardcoded account listed
in Section 2.

### 7.5 Demo authentication and security

The demo email addresses and passwords are stored in client-side
JavaScript. There is no server-side authentication, password hashing or
real login session management.

The Logout link returns the browser to the login page; it does not
invalidate a server session because this prototype does not currently
create one.

**Do not use real passwords, personal information or confidential
student data in this prototype.**

## 8. Troubleshooting

| Problem                     | Suggested action                                                                                                                                                |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cannot create a new account | Account creation is not available yet. This project is currently a front-end prototype only, so users can log in using the demo accounts provided in Section 2. |
| Demo login does not work    | Use the exact demo email/username and password listed in Section 2.                                                                                             |

## 9. Project Notes

- Project name: **E-Aduan Kolej**
- Project type: NetBeans Java Web / Ant project
- Deployment server: GlassFish
- Application context root: `/E-Aduan_Kolej`
- Main entry page: `login.html`
- User roles: Student, Technician and Administrator
- Current implementation: HTML, CSS and JavaScript front-end prototype
