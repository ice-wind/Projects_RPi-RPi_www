<?php
  echo "start"; 
  $servername = "localhost";
  $username = "forecast_user";
  $password = "forecast";
  $dbname = "forecast";

  
  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }
  // prepare and bind
  $stmt = $conn->prepare("INSERT INTO forecast_data (DT,DT_TXT,CLOUDS_ALL,GRND_LEVEL,HUMIDITY,PRESSURE,SEA_LEVEL,TEMPERATURE,TEMPERATURE_MAX,TEMPERATURE_MIN,RAIN,SNOW,WEATHER_DESCRIPTION,WEATHER_ICON,ICON_ID,WEATHER_MAIN,WIND_DEG,WIND_SPEED)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
  
$stmt->bind_param("ssssssssssssssssss",$DT,$DT_TXT,$CLOUDS_ALL,$GRND_LEVEL,$HUMIDITY,$PRESSURE,$SEA_LEVEL,$TEMPERATURE,$TEMPERATURE_MAX,$TEMPERATURE_MIN,$RAIN,$SNOW,$WEATHER_DESCRIPTION,$WEATHER_ICON,$ICON_ID,$WEATHER_MAIN,$WIND_DEG,$WIND_SPEED);
  
  $jsondata = file_get_contents('http://api.openweathermap.org/data/2.5/forecast?id=3060972&APPID=42b4a1a0b8ea3a847fedd3c183ab4f2b&units=metric&mode=json');
  $data = json_decode($jsondata, true);
  $RAIN = 0;
  $SNOW = 0;
  foreach($data['list'] as $item)
    {
      $DT = $item['dt'];
      $DT_TXT = $item['dt_txt'];
      $CLOUDS_ALL = $item['clouds']['all'];
      $GRND_LEVEL = $item['main']['grnd_level'];
      $HUMIDITY = $item['main']['humidity'];
      $PRESSURE = $item['main']['pressure'];
      $SEA_LEVEL = $item['main']['sea_level'];
      $TEMPERATURE = $item['main']['temp'] ;
      $TEMPERATURE = $TEMPERATURE-273.15;
      $TEMPERATURE_MAX = $item['main']['temp_max'];
      $TEMPERATURE_MAX = $TEMPERATURE_MAX-273.15;
      $TEMPERATURE_MIN = $item['main']['temp_min'];
      $TEMPERATURE_MIN = $TEMPERATURE_MIN - 273;
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
				$ICON_ID = $info['id']
                $WEATHER_MAIN = $info['main'];
echo($WEATHER_MAIN);
          }
       echo($stmt->execute());
    }
    $stmt->close();
    $conn->close();
    
        
?>

