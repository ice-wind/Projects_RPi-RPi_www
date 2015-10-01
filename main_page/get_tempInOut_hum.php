
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
	$result = $con -> query("SELECT * FROM data ORDER BY time desc LIMIT 50");
    
    //$result = mysqli_query($con, "SELECT * FROM data");
    //echo $result;
    while($row = mysqli_fetch_array($result))
    {        
        $point = array("time"=>(1000*(strtotime($row['time']))) , "Temp_in"=>$row['TEMPERATURE'] , "Hum"=>$row['Humidity'], "Temp_out"=>$row['TEMPERATURE_BMP'],"Pressure"=>$row['PRESSURE'],"Sea_level"=>$row['SEA_LEVEL'],"Altitude"=>$row['ALTITUDE']);//convert from milisecond
        
	array_push($data_points, $point);        
    }
	
    echo json_encode(array_reverse($data_points), JSON_NUMERIC_CHECK);
}
mysqli_close($con);

?>