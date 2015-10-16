<?php

  $servername = "localhost";
  $username = "Temp_user";
  $password = "temp";
  $dbname = "graph_data";

  $q=$_GET["search_string"];
  $response=[];
	
	
		$conn = new mysqli($servername, $username, $password, $dbname);
		if ($conn->connect_error) {
			  die("Connection failed: " . $conn->connect_error);
		}
		$select_city = $conn->prepare("SELECT CITY_ID,NAME from cityid WHERE COUNTRY='SK'");
		if ($select_city->execute()) { 
					} else {
					   echo "Failde to connect to DB CITY  ";
					}
		
		$select_city->bind_result($CITY_ID,$CITY_NAME);
		$select_city->store_result();
		$count=0;
		if(strlen($q)==0){
			while($select_city->fetch()){
				$a=array("NAME"=>$CITY_NAME,"ID"=>$CITY_ID);
				array_push($response,$a);	
			}
		
		}else{
		
			while($select_city->fetch()){
			
				if (!stristr($CITY_NAME,$q)==false){
					
					$a=array("NAME"=>$CITY_NAME,"ID"=>$CITY_ID);
					//$a=array($count++ => $a);
					array_push($response,$a);
				}		
			}
		}
		//$response.="";
		echo (json_encode($response));
		$select_city->free_result();
		$select_city->close();
	
	
	
	//pass cities from DB
?>

