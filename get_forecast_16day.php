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
	$CITY_ID = "3060972";
	$RAIN = 0;
	$SNOW = 0;
  
	$select_city = $conn->prepare("SELECT CITY_ID,NAME from cityid WHERE COUNTRY='SK'");
	  
	$delete_old = $conn->prepare("DELETE FROM forecast_data_16day WHERE CITY_ID=?");
	$stmt = $conn->prepare("INSERT INTO forecast_data_16day (CITY_ID,DT,CLOUDS,HUMIDITY,PRESSURE,TEMPERATURE_DAY,TEMPERATURE_MIN,TEMPERATURE_MAX,TEMPERATURE_NIGHT,TEMPERATURE_EVE,TEMPERATURE_MORNING,WEATHER_DESCRIPTION,WEATHER_ICON,ICON_ID,WEATHER_MAIN,WIND_DEG,WIND_SPEED,RAIN,SNOW)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
	
	if ($select_city->execute()) { 
				   echo "select success   ";
				} else {
				   echo "select failed   ";
				}
	$select_city->bind_result($CITY_ID,$C_NAME);
	$select_city->store_result();  //SELECT HAVE to be stored , but just SELECT,SHOW, DESCRIBE, EXPLAIN
	while($select_city->fetch()){
		
		$delete_old->bind_param("s",$CITY_ID);
		$stmt->bind_param("sssssssssssssssssss",$CITY_ID,$DT,$CLOUDS,$HUMIDITY,$PRESSURE,$TEMPERATURE_DAY,$TEMPERATURE_MIN,$TEMPERATURE_MAX,$TEMPERATURE_NIGHT,$TEMPERATURE_EVE,$TEMPERATURE_MORNING,$WEATHER_DESCRIPTION,$WEATHER_ICON,$ICON_ID,$WEATHER_MAIN,$WIND_DEG,$WIND_SPEED,$RAIN,$SNOW);
  
		$url = 'http://api.openweathermap.org/data/2.5/forecast/daily?id=';
		$url.= $CITY_ID;
		$url.= '&APPID=42b4a1a0b8ea3a847fedd3c183ab4f2b&units=metric&mode=json&cnt=16'
		
		$jsondata = file_get_contents($url);
		$data = json_decode($jsondata, true);
		//----------------------------DELETE old data--------------------------------------------
		$delete_old->execute();
	
		foreach($data['list'] as $item)
		{
		  $DT = $item['dt'];       
			$TEMPERATURE_DAY = $item['temp']['day'];
			$TEMPERATURE_MIN = $item['temp']['min'];
			$TEMPERATURE_MAX = $item['temp']['max'];
			$TEMPERATURE_NIGHT= $item['temp']['night'];
			$TEMPERATURE_EVE = $item['temp']['eve'];
			$TEMPERATURE_MORNING = $item['temp']['morn'];
		 
		  $PRESSURE = $item['pressure'];
		  $HUMIDITY = $item['humidity'];
		   foreach($item['weather'] as $info)
			  {
					$ICON_ID = $info['id'];
					$WEATHER_MAIN = $info['main'];
					$WEATHER_DESCRIPTION = $info['description'];
					$WEATHER_ICON = $info['icon'];
				echo($WEATHER_MAIN);
			  }
		  $WIND_SPEED = $item['speed'];
		  $WIND_DEG = $item['deg'];
		  $CLOUDS = $item['clouds'];
		  if(array_key_exists('rain',$item)){
			  $RAIN = $item['rain'];
		  }else{
			  $RAIN = 0;
		  }
		  if(array_key_exists('snow',$item)){
		  $SNOW = $item['snow'];
		  }else{
			  $SNOW = 0;
		  }
		   echo($stmt->execute());
		}
	}
	$select_city->free_result();
	$select_city->close();
	$delete_old->close();
    $stmt->close();
    $conn->close();
    
        
?>

