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

$sql = "insert into Doubt (Keyword,Weight) values ('$keyword', 0)";
  if(mysqli_query($conn,$sql)){
    echo 'success';
  }
  else{
    echo 'failure';
  }
  mysqli_close($conn);
?>
