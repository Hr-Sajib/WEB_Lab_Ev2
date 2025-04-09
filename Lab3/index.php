
<?php
$request = $_SERVER['REQUEST_URI'];

switch ($request) {
    case '/':
        echo "
            <h2>Welcome to WEB Lab 3 Form</h2>
            <form action='/insert' method='POST'>
                <label for='name'>Name:</label><br>
                <input type='text' id='name' name='name' required style='padding: 10px; margin: 5px; width: 300px;'><br><br>
                <label for='age'>Age:</label><br>
                <input type='number' id='age' name='age' required style='padding: 10px; margin: 5px; width: 300px;'><br><br>
                <label for='email'>Email:</label><br>
                <input type='email' id='email' name='email' required style='padding: 10px; margin: 5px; width: 300px;'><br><br>
                <label for='address'>Address:</label><br>
                <textarea id='address' name='address' style='padding: 10px; margin: 5px; width: 300px; height: 100px;' required></textarea><br><br>
                <input type='submit' value='Submit' style='padding: 10px 20px; background-color: #4CAF50; color: white; border: none; cursor: pointer;'>
            </form>
        ";
        break;

    case '/insert':
        include 'insert.php';
        break;

    default:
        http_response_code(404);
        echo "❓ Route Not Found";
        break;
}
?> 
