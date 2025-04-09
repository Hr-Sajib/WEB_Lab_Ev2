# Web Course Labs – Lab 3 & Lab 4

This repository contains two web development lab projects focused on server-side programming, database connectivity, and basic frontend design.

---

## 📌 Lab 3 – PHP Form Submission to MySQL

### ✅ Objective:
To build a simple PHP-based server that displays a form and inserts submitted data into a MySQL database.

### 🚀 Features:
- Built-in PHP development server (`php -S localhost:8000`)
- HTML form for inputting:
  - Name
  - Age
  - Email
  - Address
- Data submitted via `POST` method to `/insert` route
- Uses prepared statements to securely insert data into the `user_data` table
- Basic routing logic using `$_SERVER['REQUEST_URI']`
- MySQL connection handled via `config.php`


---

## 📌 Lab 4 – Node.js Express Server with Searchable Table

### ✅ Objective:
To create a Node.js application using Express that fetches and displays data from a MySQL database, with support for searching by name or email.

### 🚀 Features:
- Express.js web server (`node index.js`)
- HTML/CSS/JS-based frontend to display table data
- Connects to a MySQL database and retrieves user data
- Supports search functionality:
  - Query by `name`
  - Query by `email`
- User-friendly interface with styled table

