//Global variable:
	function data(){
			this.Temperature=[],
			this.Humidity=[],
			this.Clouds=[],
			this.Rain=[],
			this.Snow=[],
			this.Weather_description=[],
			this.Weather_icon=[],
			this.Icon_id=[],
			this.Weather_main=[],
			this.Pressure=[],
			this.Wind_speed=[],
			this.Wind_deg=[];
	}
	data.prototype = {
		constructor:data,
		getTemperature:function(){
			return this.Temperature;
		},
		getHumidity:function(){
			return this.Humidity;
		},
		getClouds:function(){
			return this.Clouds;
		},
		getRain:function(){
			return this.Rain;
		},
		getSnow:function(){
			return this.Snow;
		},
		getWeather_description:function(){
			return this.Weather_description;
		},
		getWeather_icon:function(){
			return this.Weather_icon;
		},
		getIcon_id:function(){
			return this.Icon_id;
		},
		getWeather_main:function(){
			return this.Weather_main;
		},
		getPressure:function(){
			return this.Pressure;
		},
		getWind_speed:function(){
			return this.Wind_speed;
		},
		getWind_deg:function(){
			return this.Wind_deg;
		},
		
		
		setTemperature:function(Temperature){
			this.Temperature=Temperature;
		},
		setData:function(Temperature,Humidity,Clouds,Rain,Snow,Weather_description,Weather_icon,Icon_id,Weather_main,Pressure,Wind_speed,Wind_deg){
			this.Temperature=Temperature,
			this.Humidity=Humidity,
			this.Clouds=Clouds,
			this.Rain=Rain,
			this.Snow=Snow,
			this.Weather_description=Weather_description,
			this.Weather_icon=Weather_icon,
			this.Icon_id=Icon_id,
			this.Weather_main=Weather_main,
			this.Pressure=Pressure,
			this.Wind_speed=Wind_speed,
			this.Wind_deg=Wind_deg;
		}
	}
	
	var data5Day = new data();
	var data16Day = new data();
	
	data5Day.Sea_level=[];
	data5Day.getSea_level=function(){
		return this.Sea_level;
	}
	data5Day.setSea_level=function(Sea_level){
		this.Sea_level=Sea_level;
	}
	data5Day.Grnd_level=[];
	data5Day.getGrnd_level=function(){
		return this.Grnd_level;
	}
	data5Day.setGrnd_level=function(Grnd_level){
		this.Grnd_level=Grnd_level;
	}


	function fillVariables(data,var5day){
			$.each(data,function(i,field){
					var Clouds_array=[];
					var5day.Temperature.push({x:field.time,y:field.Temperature});
					var5day.Humidity.push({x:field.time,y:field.Humidity});
					var5day.Sea_level.push({x:field.time,y:field.Sea_level});
					var5day.Grnd_level.push({x:field.time,y:field.Grnd_level});
					Clouds_array.push(field.time);
					Clouds_array.push(field.Clouds);
					Clouds_array.push(-field.Clouds);
					var5day.Clouds.push(Clouds_array);
					var5day.Rain.push({x:field.time,y:field.Rain});
					var5day.Snow.push({x:field.time,y:field.Snow});
					var5day.Weather_description.push({x:field.time,y:field.Weather_description});
					var5day.Weather_icon.push({x:field.time,y:field.Weather_icon});
					var5day.Icon_id.push({x:field.time,y:field.Icon_id});
					var5day.Weather_main.push({x:field.time,y:field.Weather_main});
					var5day.Pressure.push({x:field.time,y:field.Pressure});
					var5day.Wind_speed.push({x:field.time,y:field.Wind_speed});
					var5day.Wind_deg.push({x:field.time,y:0,wind_deg:field.Wind_deg});
				})
		return var5day;
	}
	
//-----------------------------------FUNCTION SECTION--------------------------------------------------------------------------

//-------------------------------round corner in gauge-----------------------------------------		
function round_corner(){
	var svg;
		svg = document.getElementsByTagName('svg');
		if (svg.length > 0) {
			$.each(svg,function(i,field){
				var path = field.getElementsByTagName('path')
					if (path.length > 1) {
						// First path is gauge background
						path[0].setAttributeNS(null, 'stroke-linejoin', 'round');
						// Second path is gauge value
						path[1].setAttributeNS(null, 'stroke-linejoin', 'round');
						//path[2].setAttributeNS(null, 'stroke-linejoin', 'round');
						path[2].setAttributeNS(null, 'stroke-linejoin', 'round');
				}
			})
		}
}
function getMenuSelection(){
	return $('input[name="accordion"]:checked').val();
}
function loadJSON5Day(callback){
		
	$.getJSON("php/getDBdata_5Day.php?city_id=3056508",function(result){
		console.log(result);
		callback(result);
	});
}
/*function loadScript(url, callback){
			// Adding the script tag to the head as suggested before
			var head = document.getElementsByTagName('head')[0];
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = url;

			// Then bind the event to the callback function.
			// There are several events for cross browser compatibility.
			script.onreadystatechange = callback;
			script.onload = callback;

			// Fire the loading
			head.appendChild(script);
}*/
//-------------------------------end round corner----------------------------------------
//-----------------------------------FUNCTION SECTION END--------------------------------------------------------------------------
//-------------------------------DOCUMENT READY SECTION----------------------------------------------------------------------------
//------------------------------scroll to top--------------------------------------------
$(document).ready(function(){
    
   $(window).scroll(function(){
      if ($(this).scrollTop() > 120) {
         $('.scrollToTop').fadeIn();
      } else {
         $('.scrollToTop').fadeOut();
      }
   });
    
   $('.scrollToTop').on("click",function(){
      $('html, body').animate({scrollTop : 0},800);
      return false;
   });
   
   //-------------------------------fade out search---------------------------------------------
   $('#accordion input').on("change",function(){
		var selected = getMenuSelection();
		if(selected==='1')
		{
			$('#search').fadeOut();
		}else
		{
			$('#search').fadeIn();
		}
	   
   });
    
});
//-------------------------------DOCUMENT READY SECTION END------------------------------------------------------------------------