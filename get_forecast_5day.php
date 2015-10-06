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
  $CITY_ID = "3060972";
  // prepare and bind
	$delete = $conn->prepare("DELETE FROM forecast_data_5day WHERE cityid=?");
	$stmt = $conn->prepare("INSERT INTO forecast_data_5day (DT,DT_TXT,CLOUDS_ALL,GRND_LEVEL,HUMIDITY,PRESSURE,SEA_LEVEL,TEMPERATURE,TEMPERATURE_MAX,TEMPERATURE_MIN,RAIN,SNOW,WEATHER_DESCRIPTION,WEATHER_ICON,ICON_ID,WEATHER_MAIN,WIND_DEG,WIND_SPEED)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
  
	$delete->bind_param("s",$CITY_ID);
	$stmt->bind_param("ssssssssssssssssss",$DT,$DT_TXT,$CLOUDS_ALL,$GRND_LEVEL,$HUMIDITY,$PRESSURE,$SEA_LEVEL,$TEMPERATURE,$TEMPERATURE_MAX,$TEMPERATURE_MIN,$RAIN,$SNOW,$WEATHER_DESCRIPTION,$WEATHER_ICON,$ICON_ID,$WEATHER_MAIN,$WIND_DEG,$WIND_SPEED);
  
  $url = 'http://api.openweathermap.org/data/2.5/forecast?id=';
  $url .= '3060972';
  $url .= '&APPID=42b4a1a0b8ea3a847fedd3c183ab4f2b&units=metric&mode=json';
  
  $jsondata = file_get_contents($url);
  $data = json_decode($jsondata, true);
  $RAIN = 0;
  $SNOW = 0;
  //----------------------DELETE PREVIOUS DATA----------------------------
  $delete->execute();
  
  foreach($data['list'] as $item)
    {
      $DT = $item['dt'];
      $DT_TXT = $item['dt_txt'];
      $CLOUDS_ALL = $item['clouds']['all'];
      $GRND_LEVEL = $item['main']['grnd_level'];
      $HUMIDITY = $item['main']['humidity'];
      $PRESSURE = $item['main']['pressure'];
      $SEA_LEVEL = $item['main']['sea_level'];
      $TEMPERATURE = $item['main']['temp'];
      $TEMPERATURE_MAX = $item['main']['temp_max'];
      $TEMPERATURE_MIN = $item['main']['temp_min'];
	if(array_key_exists('rain',$item)){
		if(array_key_exists('3h',$item['rain']))
		{
		$RAIN = $item['rain']['3h'];
		}else
		{
		$RAIN = 0;
		}
	}else
	{
	$RAIN = 0;
	} 	
	if(array_key_exists('snow',$item)){
		if(array_key_exists('3h',$item['snow']))
		{
		$SNOW = $item['snow']['3h'];
		}else
		{
		$SNOW = 0;
		}
	}else
	{
	$SNOW = 0;
	}

      $WIND_DEG = $item['wind']['deg'];
      $WIND_SPEED = $item['wind']['speed'];
        foreach($item['weather'] as $info)
          {
                $WEATHER_DESCRIPTION = $info['description'];
                $WEATHER_ICON = $info['icon'];
				$ICON_ID = $info['id'];
                $WEATHER_MAIN = $info['main'];
echo($WEATHER_MAIN);
          }
       echo($stmt->execute());
    }
    $stmt->close();
    $conn->close();
    
        
?>

