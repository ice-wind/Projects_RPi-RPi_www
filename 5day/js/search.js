
$(document).ready(function () {
	$('body').on('click','*',function(){
		$("#livesearch").slideUp();
	});
	
	$("form").submit(function(e){
		e.preventDefault();
	});
	/*
	$("body").on("change",".search",function(){
		var city_name = $(".search").val();
		var city_id = $(".city").val(city_name);
		var city_id = $(city_id[0].outerHTML)[0].getAttribute("data-ID");
		console.log(" id: "+city_id+" city :"+city_name);
		//$("#livesearch").slideUp("fast",getForecastData(city_id,city_name));
	});
	*/
});
		
function handle_key(e){
	if(e.which === 13){
		var city_name = $(".search").val();
		if($(".city")[0]){
			var city_id = $(".city").val(city_name);
			var city_id = $(city_id[0].outerHTML)[0].getAttribute("data-ID");
			$("#livesearch").slideUp("fast",getForecastData(city_id,city_name));
		}
	}else 
		if(e.which == 8){// <-
			$(".search").val("");
	}else{
		showSearchSugestionResult();
	}
}

function passCityData(object){
	var city_id = object.getAttribute("data-ID");
	var city_name = object.innerHTML;
	$(".search").val(city_name);
	$("#livesearch").slideUp("fast",getForecastData(city_id,city_name));
}
function isMenuChoice5Day(){
	if(getMenuSelection()==='2'){
		return true;
	}else
		return false;
}
			
function getForecastData(city_id,city_name){
	console.log("ajax request data");
	if(isMenuChoice5Day()){
		var url = "php/getDBdata_5Day.php";
	}
	else{
		var url = "php/getDBdata_16Day.php";
	}
		$.ajax({
			type: 	"GET",
			url:	url,
			dataType: "json",
			data:	{city_id:city_id},
			success:function(response){
						update5DayCharts(response);
					
			},
			error: function(jqXHR, exception) {
				console.log(jqXHR);
				if (jqXHR.status === 0) {
					alert('Not connect.\n Verify Network.');
				} else if (jqXHR.status == 404) {
					alert('Requested page not found. [404]');
				} else if (jqXHR.status == 500) {
					alert('Internal Server Error [500].');
				} else if (exception === 'parsererror') {
					alert('Requested JSON parse failed.');
				} else if (exception === 'timeout') {
					alert('Time out error.');
				} else if (exception === 'abort') {
					alert('Ajax request aborted.');
				} else {
					alert('Uncaught Error.\n' + jqXHR.responseText);
				}
			  
			},
			stop:function(){
				alert("Ajax exit with status: --Stop");
			}
		});
		return false;
}
function update5DayCharts(response){
	data5Day.variableFree();
	data5Day.fillVariables(response);			
	
	var container = $('#container').highcharts();
	container.series[0].setData(data5Day.getTemperaturPrivileged());
	container.series[1].setData(data5Day.getHumidity());
	container.series[2].setData(data5Day.getRain());
	container.series[3].setData(data5Day.getSnow());
	container.series[4].setData(data5Day.getClouds());
	
	var wind = $('#graph_windSpeed').highcharts();
	wind.series[0].setData(data5Day.getWind_speed());
	wind.series[1].setData(data5Day.getWind_deg());
	
	var pressure = $('#2graph_pressure').highcharts();
	pressure.series[0].setData(data5Day.getPressure());
	pressure.series[1].setData(data5Day.getGrnd_level());
	
	var sea_level = $('#3graph_sealevel').highcharts();
	sea_level.series[0].setData(data5Day.getSea_level());
	console.log(data5Day.Sea_level);
}
function update16DayCharts(response){
	data16Day.variableFree();
	data16Day.fillVariables(response);			
	
	var container = $('#container').highcharts();
	container.series[0].setData(data16Day.getTemperaturPrivileged());
	container.series[1].setData(data16Day.getHumidity());
	container.series[2].setData(data16Day.getRain());
	container.series[3].setData(data16Day.getSnow());
	container.series[4].setData(data16Day.getClouds());
	
	var wind = $('#graph_windSpeed').highcharts();
	wind.series[0].setData(data16Day.getWind_speed());
	wind.series[1].setData(data16Day.getWind_deg());
	
	var pressure = $('#2graph_pressure').highcharts();
	pressure.series[0].setData(data16Day.getPressure());

}

function showSearchSugestionResult(){
	var cityList="";
	var wrapper_cityList;
	var firstCity="";
	var searchBox = document.getElementsByClassName("search")[0];
	
	var str = $(".search").val();
	console.log(str);
	if(str!=null){
		$.ajax({
			type: 	"GET",
			url:	"php/livesearch.php",
			data: 	{search_string:str},
			success:function(response){
				if(response!=null){
					response=JSON.parse(response);
					$.each(response,function(i,data){
						if(i==0){firstCity=data.NAME}
						cityList+='<div class="city" onclick="passCityData(this)" data-ID="'+data.ID+'";>'+data.NAME+'</div>'
					});
					
					var suggestion =firstCity;
					console.log(suggestion);
					searchBox.value = suggestion;
					
					searchBox.setSelectionRange(str.length,suggestion.length);
					searchBox.focus();
				}
				wrapper_cityList='<div class="wrapper_cityList">'+cityList+'</div>';
				$("#livesearch").slideDown();
				$("#livesearch").html(wrapper_cityList);
			},
			send:	function(event,xhr,option){
				$("#livesearch").slideDown();
				$("#livesearch").append("<img src='img/loading.gif'>");
			},
			error:  function(event,xhr,options,exception){
				console.log("xhr: "+xhr+"  options: "+options+"  Exception: "+exception);
				alert(xhr);
			}
		});
	}
	return false;
}
			 