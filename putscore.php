<?php
$name="player";
$score=$_GET["Score"];

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bubblegame";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO `bubblegame`.`highscore` (`Rank`, `Name`, `Score`) VALUES (NULL, '$name', '$score')";

if ($conn->query($sql) === TRUE) {
    // echo "New score added successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>