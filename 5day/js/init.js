//Global variable:
	function data(a){
			var Temperature=[];
			var Humidity=[];
			var Clouds=[];
			var Rain=[];
			var Snow=[];
			var Weather_description=[];
			var Weather_icon=[];
			var Icon_id=[];
			var Weather_main=[];
			var Pressure=[];
			var Wind_speed=[];
			var Wind_deg=[];
			
			//var that = this;
			
			this.getTemperaturPrivileged = function(){return Temperature};
			this.setTemperature = function(myTemperature){Temperature.push(myTemperature)};
			this.setHumidity = function(myHumidity){Humidity.push(myHumidity)};
			this.setClouds = function(myClouds){Clouds.push(myClouds)};
			this.setRain = function(myRain){Rain.push(myRain)};
			this.setSnow = function(mySnow){Snow.push(mySnow)};
			this.setWeather_description = function(myWeather_description){Weather_description.push(myWeather_description)};
			this.setWeather_icon = function(myWeather_icon){Weather_icon.push(myWeather_icon)};
			this.setIcon_id = function(myIcon_id){Icon_id.push(myIcon_id)};
			this.setWeather_main = function(myWeather_main){Weather_main.push(myWeather_main)};
			this.setPressure = function(myPressure){Pressure.push(myPressure)};
			this.setWind_speed = function(myWind_speed){Wind_speed.push(myWind_speed)};
			this.setWind_deg = function(myWind_deg){Wind_deg.push(myWind_deg)};
	}
	/*
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
	}*/
	
	
	
	 
	//var data5Day = Object.create(data);
	var data5Day = new data();
	var data16Day = new data(89);
	
	data16Day.Temperature=78;
	
	console.log(data16Day.getTemperaturPrivileged());
	console.log(data16Day.Temperature);
	
	data5Day.Sea_level=[];
	data5Day.getSea_level=function(){
		return this.Sea_level;
	}
	data5Day.setSea_level=function(Sea_level){
		var Sea_level=Sea_level;
	}
	data5Day.Grnd_level=[];
	
	data5Day.setGrnd_level=function(myGrnd_level){
		 Grnd_level.push(myGrnd_level);
	}


	function fillVariables(data){
			$.each(data,function(i,field){
					var Clouds_array=[];
					data5Day.setTemperature({x:field.time,y:field.Temperature});
					data5Day.setHumidity({x:field.time,y:field.Humidity});
					data5Day.setSea_level({x:field.time,y:field.Sea_level});
					data5Day.setGrnd_level.push({x:field.time,y:field.Grnd_level});
					Clouds_array.push(field.time);
					Clouds_array.push(field.Clouds);
					Clouds_array.push(-field.Clouds);
					data5Day.setClouds(Clouds_array);
					data5Day.setRain({x:field.time,y:field.Rain});
					data5Day.setSnow({x:field.time,y:field.Snow});
					data5Day.setWeather_description({x:field.time,y:field.Weather_description});
					data5Day.setWeather_icon({x:field.time,y:field.Weather_icon});
					data5Day.setIcon_id({x:field.time,y:field.Icon_id});
					data5Day.setWeather_main({x:field.time,y:field.Weather_main});
					data5Day.setPressure({x:field.time,y:field.Pressure});
					data5Day.setWind_speed({x:field.time,y:field.Wind_speed});
					data5Day.setWind_deg({x:field.time,y:0,wind_deg:field.Wind_deg});
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