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

$sql = "SELECT avg(Rating),Keyword FROM SDR group by Keyword ORDER by avg(Rating) DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    //echo "<table><tr><th>ID</th><th>Name</th></tr>";
    // output data of each row
    echo "Keyword"."\t\t\t"."avg(Rating)"."\n";
    while($row = $result->fetch_assoc()) 
    {
        echo $row["Keyword"]."\t\t\t".$row["avg(Rating)"]."\n";

	}
    
} 
else 
{
    echo "0 results";
}
$conn->close();
?> 
