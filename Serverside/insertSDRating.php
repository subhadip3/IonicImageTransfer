 <?php
$sid = $_POST['sid'];
$keyword = $_POST['keyword'];
$rating = $_POST['rating'];
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




echo $sid.$keyword.$rating;

$sql = "insert into SDR(SID,Keyword,Rating) values ('$sid', '$keyword','$rating')";
  if(mysqli_query($conn,$sql)){
    echo 'success';
  }
  else{
    echo 'failure';
  }
  mysqli_close($conn);
?>
