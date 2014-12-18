<?php
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

$sql = "SELECT Rank, Name, Score FROM highscore";
$result = $conn->query($sql);
echo "<table>
<tr>
<th>Name</th>
<th>Score</th>
</tr>";
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
    	echo "<tr>";
  		echo "<td>" . $row["Name"] . "</td>";
  		echo "<td>" . $row["Score"] . "</td>";
  		echo "</tr>";
    }
	echo "</table>";
} else {
    echo "0 results";
}

$conn->close();
?>