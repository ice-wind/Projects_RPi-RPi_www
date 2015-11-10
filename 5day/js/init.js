//Global variable:
	var data = (function(){
		
		function data(){
			
		}
		
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
			
			data.prototype.setTemperature = function(myTemperature){Temperature.push(myTemperature)};
			data.prototype.setHumidity = function(myHumidity){Humidity.push(myHumidity)};
			data.prototype.setClouds = function(myClouds){Clouds.push(myClouds)};
			data.prototype.setRain = function(myRain){Rain.push(myRain)};
			data.prototype.setSnow = function(mySnow){Snow.push(mySnow)};
			data.prototype.setWeather_description = function(myWeather_description){Weather_description.push(myWeather_description)};
			data.prototype.setWeather_icon = function(myWeather_icon){Weather_icon.push(myWeather_icon)};
			data.prototype.setIcon_id = function(myIcon_id){Icon_id.push(myIcon_id)};
			data.prototype.setWeather_main = function(myWeather_main){Weather_main.push(myWeather_main)};
			data.prototype.setPressure = function(myPressure){Pressure.push(myPressure)};
			data.prototype.setWind_speed = function(myWind_speed){Wind_speed.push(myWind_speed)};
			data.prototype.setWind_deg = function(myWind_deg){Wind_deg.push(myWind_deg)};
			
			data.prototype.getTemperaturPrivileged = function(){return Temperature};
			data.prototype.getHumidity = function(){return Humidity};
			data.prototype.getClouds = function(){return Clouds};
			data.prototype.getRain = function(){return Rain};
			data.prototype.getSnow = function(){return Snow};
			data.prototype.getWeather_description = function(){return Weather_description};
			data.prototype.getWeather_icon = function(){return Weather_icon};
			data.prototype.getIcon_id = function(){return Icon_id};
			data.prototype.getWeather_main = function(){return Weather_main};
			data.prototype.getPressure = function(){return Pressure};
			data.prototype.getWind_speed = function(){return Wind_speed};
			data.prototype.getWind_deg = function(){return Wind_deg};
			
			data.prototype.init=function(){
				console.log("data init!");
				Temperature=[];
				Humidity=[];
				Clouds=[];
				Rain=[];
				Snow=[];
				Weather_description=[];
				Weather_icon=[];
				Icon_id=[];
				Weather_main=[];
				Pressure=[];
				Wind_speed=[];
				Wind_deg=[];
				
			};
			
			return data;
	})();
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
	
	
	
	 
//	var data5Day = new data();
	data5Day.prototype = new data;
	data5Day.prototype.setGrnd_level=function(myGrnd_level){
		 data5Day.Grnd_level.push(myGrnd_level);
	}
	data5Day.prototype.getGrnd_level=function(){
		 return this.Grnd_level;
	}
	function data5Day(){
		var Grnd_level=[];
	}
	var data16Day = new data5Day();
	
	console.log(data16Day.Temperature);
	
	data16Day.Sea_level=[];
	data16Day.getSea_level=function(){
		return this.Sea_level;
	}
	data16Day.setSea_level=function(Sea_level){
		var Sea_level=Sea_level;
	}
	
	


	function fillVariables(data){
		console.log(data);
			$.each(data,function(i,field){
					var Clouds_array=[];
					data16Day.setTemperature({x:field.time,y:field.Temperature});
					data16Day.setHumidity({x:field.time,y:field.Humidity});
					data16Day.setSea_level({x:field.time,y:field.Sea_level});
					data16Day.setGrnd_level({x:field.time,y:field.Grnd_level});
					Clouds_array.push(field.time);
					Clouds_array.push(field.Clouds);
					Clouds_array.push(-field.Clouds);
					data16Day.setClouds(Clouds_array);
					data16Day.setRain({x:field.time,y:field.Rain});
					data16Day.setSnow({x:field.time,y:field.Snow});
					data16Day.setWeather_description({x:field.time,y:field.Weather_description});
					data16Day.setWeather_icon({x:field.time,y:field.Weather_icon});
					data16Day.setIcon_id({x:field.time,y:field.Icon_id});
					data16Day.setWeather_main({x:field.time,y:field.Weather_main});
					data16Day.setPressure({x:field.time,y:field.Pressure});
					data16Day.setWind_speed({x:field.time,y:field.Wind_speed});
					data16Day.setWind_deg({x:field.time,y:0,wind_deg:field.Wind_deg});
				})
				console.log(data16Day.getPressure());
		return data16Day;
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