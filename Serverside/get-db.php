 <?php
$servername = "localhost";
$username = "root";
$password = "jetfire";
$dbname = "testdb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT Keyword FROM Doubt";
$result = $conn->query($sql);

if ($result->num_rows > 0) 
{
    //echo "<table><tr><th>ID</th><th>Name</th></tr>";
    // output data of each row
    while($row = $result->fetch_assoc()) 
    {
        echo $row["Keyword"]."\n";
    }
    
} 
else 
{
    echo "0 results";
}
$conn->close();
?> 
