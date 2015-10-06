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
  $stmt = $conn->prepare("INSERT INTO forecast_data_16day (DT,CLOUDS,HUMIDITY,PRESSURE,TEMPERATURE_DAY,TEMPERATURE_MIN,TEMPERATURE_MAX,TEMPERATURE_NIGHT,TEMPERATURE_EVE,TEMPERATURE_MORNING,WEATHER_DESCRIPTION,WEATHER_ICON,ICON_ID,WEATHER_MAIN,WIND_DEG,WIND_SPEED,RAIN,SNOW)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
  
$stmt->bind_param("ssssssssssssssssss",$DT,$CLOUDS,$HUMIDITY,$PRESSURE,$TEMPERATURE_DAY,$TEMPERATURE_MIN,$TEMPERATURE_MAX,$TEMPERATURE_NIGHT,$TEMPERATURE_EVE,$TEMPERATURE_MORNING,$WEATHER_DESCRIPTION,$WEATHER_ICON,$ICON_ID,$WEATHER_MAIN,$WIND_DEG,$WIND_SPEED,$RAIN,$SNOW);
  
  $jsondata = file_get_contents('http://api.openweathermap.org/data/2.5/forecast/daily?id=3060972&APPID=42b4a1a0b8ea3a847fedd3c183ab4f2b&units=metric&mode=json&cnt=16');
  $data = json_decode($jsondata, true);
  $RAIN = 0;
  $SNOW = 0;
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
    $stmt->close();
    $conn->close();
    
        
?>

