 <?php
$keyword = $_POST['keyword'];
$weight=10;
//$address = $_POST['add']; 
//$name=mysql_real_escape_string($name);
//$address=mysql_real_escape_string($address);
echo "data successful";


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
echo "Connected successfully";




echo $keyword;
$sql ="delete from Doubt";
if(mysqli_query($conn,$sql)){
    echo 'deleted keywords from prev doc';
  }
  else{
    echo 'failure';
  }
  
mysqli_close($conn);
?>
