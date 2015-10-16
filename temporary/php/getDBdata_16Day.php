
<?php

header('Content-Type: application/json');

$CITY_ID = $_GET["city_id"];

$conn = mysqli_connect("localhost","Temp_user","temp","graph_data");

// Check connection
if (mysqli_connect_errno($conn))
{
    echo "Failed to connect to DataBase: " . mysqli_connect_error();
}else
{
	
    $data_points = array();
	$select_city = $conn->prepare("SELECT DT,CLOUDS,HUMIDITY,PRESSURE,TEMPERATURE_DAY,TEMPERATURE_NIGHT,TEMPERATURE_MAX,TEMPERATURE_MIN,TEMPERATURE_MORNING,TEMPERATURE_EVE,RAIN,SNOW,WEATHER_DESCRIPTION,WEATHER_ICON,ICON_ID,WEATHER_MAIN,WIND_DEG,WIND_SPEED FROM forecast_data_16day WHERE CITY_ID=? ORDER BY DT_TXT desc LIMIT 110");
    $select_city->bind_param("s",$CITY_ID);
	$select_city->execute();
	$select_city->bind_result($DT,$CLOUDS,$HUMIDITY,$PRESSURE,$TEMPERATURE_DAY,$TEMPERATURE_NIGHT,$TEMPERATURE_MAX,$TEMPERATURE_MIN,$TEMPERATURE_MORNING,$TEMPERATURE_EVE,$RAIN,$SNOW,$WEATHER_DESCRIPTION,$WEATHER_ICON,$ICON_ID,$WEATHER_MAIN,$WIND_DEG,$WIND_SPEED);
	$select_city->store_result();
	
    while($select_city->fetch())
    {        
        $point = array("time"=>(1000*(strtotime($DT))) , "Temperature_day"=>$TEMPERATURE_DAY,"Temperature_night"=>$TEMPERATURE_NIGHT,"Temperature_morning"=>$TEMPERATURE_MORNING,"Temperature_eve"=>$TEMPERATURE_EVE , "Humidity"=>$HUMIDITY,"Pressure"=>$PRESSURE,"Clouds"=>$CLOUDS,"Rain"=>$RAIN,"Snow"=>$SNOW,"Weather_description"=>$WEATHER_DESCRIPTION,"Weather_icon"=>$WEATHER_ICON,"Icon_id"=>$ICON_ID,"Weather_main"=>$WEATHER_MAIN,"Wind_deg"=>$WIND_DEG,"Wind_speed"=>$WIND_SPEED);//,"Snow"=>$row['SNOW'],"Weather_id"=>$row['WEATHER_ID']convert from milisecond
        
	array_push($data_points, $point);        
    }
	$select_city->close();
	
    echo json_encode(array_reverse($data_points), JSON_NUMERIC_CHECK);
}
mysqli_close($conn);

?>