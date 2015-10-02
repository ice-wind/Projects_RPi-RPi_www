
<?php

header('Content-Type: application/json');

$con = mysqli_connect("localhost","Temp_user","temp","graph_data");

// Check connection
if (mysqli_connect_errno($con))
{
    echo "Failed to connect to DataBase: " . mysqli_connect_error();
}else
{
    $data_points = array();
	$result = $con -> query("SELECT * FROM forecast_data ORDER BY DT_TXT desc LIMIT 110");
    
    //$result = mysqli_query($con, "SELECT * FROM data");
    //echo $result;
    while($row = mysqli_fetch_array($result))
    {        
        $point = array("time"=>(1000*(strtotime($row['DT_TXT']))) , "Temperature"=>$row['TEMPERATURE'] , "Humidity"=>$row['HUMIDITY'],"Pressure"=>$row['PRESSURE'],"Sea_level"=>$row['SEA_LEVEL'],"Grnd_level"=>$row['GRND_LEVEL'],"Clouds"=>$row['CLOUDS_ALL'],"Rain"=>$row['RAIN'],"Weather_description"=>$row['WEATHER_DESCRIPTION'],"Weather_icon"=>$row['WEATHER_ICON'],"Weather_main"=>$row['WEATHER_MAIN'],"Wind_deg"=>$row['WIND_DEG'],"Wind_speed"=>$row['WIND_SPEED']);//,"Snow"=>$row['SNOW'],"Weather_id"=>$row['WEATHER_ID']convert from milisecond
        
	array_push($data_points, $point);        
    }
	
    echo json_encode(array_reverse($data_points), JSON_NUMERIC_CHECK);
}
mysqli_close($con);

?>