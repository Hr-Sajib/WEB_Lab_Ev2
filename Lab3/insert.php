<!-- insert.php -->

<?php
include 'config.php';  // Include the database connection

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST['name'];
    $age = $_POST['age'];
    $email = $_POST['email'];
    $address = $_POST['address'];

    // Prepare an SQL statement to insert data into the table
    $sql = "INSERT INTO user_data (name, age, email, address) VALUES (?, ?, ?, ?)";

    // Use prepared statements to avoid SQL injection
    if ($stmt = $conn->prepare($sql)) {
        // Bind parameters
        $stmt->bind_param("siss", $name, $age, $email, $address);  // "siss" means string, integer, string, string
        
        // Execute the query
        if ($stmt->execute()) {
            echo "Data inserted successfully!";
        } else {
            echo "Error: " . $stmt->error;
        }
        
        // Close the statement
        $stmt->close();
    } else {
        echo "Error preparing statement: " . $conn->error;
    }
}

// Close the connection
$conn->close();
?>
