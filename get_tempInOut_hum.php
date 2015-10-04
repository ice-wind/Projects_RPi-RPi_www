
<?php

header('Content-Type: application/json');

$con = mysqli_connect("localhost","root","oracle","test");

// Check connection
if (mysqli_connect_errno($con))
{
    echo "Failed to connect to DataBase: " . mysqli_connect_error();
}else
{
    $data_points = array();
	$result = $con -> query("SELECT * FROM SENSOR ORDER BY time desc LIMIT 240");
    
    //$result = mysqli_query($con, "SELECT * FROM data");
    //echo $result;
    while($row = mysqli_fetch_array($result))
    {        
        $point = array("time"=>(1000*(strtotime($row['TIME']))) , "Temp_in"=>$row['TEMPERATURE'] , "Hum"=>$row['HUMIDITY'], "Temp_out"=>$row['TEMPERATURE_BMP'],"Pressure"=>$row['PRESSURE'],"Sea_level"=>$row['SEALEVEL'],"Altitude"=>$row['ALTITUDE']);//convert from milisecond
        
	array_push($data_points, $point);        
    }
	
    echo json_encode(array_reverse($data_points), JSON_NUMERIC_CHECK);
}
mysqli_close($con);

?>
