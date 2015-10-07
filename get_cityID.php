<?php
  echo "start"; 
  $servername = "localhost";
  $username = "Temp_user";
  $password = "temp";
  $dbname = "graph_data";

  
  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }
  // prepare and bind
  $stmt = $conn->prepare("INSERT INTO cityid (ID,NAME,COUNTRY,COORD_LON,COORD_LAT)VALUES ( ?, ?, ?, ?, ?)");
  
$stmt->bind_param("sssss",$ID,$NAME,$COUNTRY,$COORD_LON,$COORD_LAT);
//----------------------------INIT-----------------------------------------
	ini_set('memory_limit', '-1');
	ini_set('max_execution_time', 15000);  // time of possible execution  - 300 is 5 min
//-------------------------------END INIT------------------------------------
  $json = file_get_contents('C:\Users\vargar\Downloads\city.list (2).json\city.list.json');
  
  //echo $json;
  $jsondata = json_decode($json,true);
 // $jsondata = str_replace('&quot;', '"', $jsondata);

  foreach($jsondata['city'] as $item)
    {
      $ID = $item['_id'];
      $NAME = $item['name'];
      $COUNTRY = $item['country'];
      $COORD_LON = $item['coord']['lon'];
      $COORD_LAT = $item['coord']['lat'];
      
       echo($stmt->execute());
	   

    }
    $stmt->close();
    $conn->close();
    
        
?>

