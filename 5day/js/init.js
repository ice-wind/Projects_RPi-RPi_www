//Global variable:
	var baseData = (function(){
		
		function baseData(){
			
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
			
			baseData.prototype.setTemperature = function(myTemperature){Temperature.push(myTemperature)};
			baseData.prototype.setHumidity = function(myHumidity){Humidity.push(myHumidity)};
			baseData.prototype.setClouds = function(myClouds){Clouds.push(myClouds)};
			baseData.prototype.setRain = function(myRain){Rain.push(myRain)};
			baseData.prototype.setSnow = function(mySnow){Snow.push(mySnow)};
			baseData.prototype.setWeather_description = function(myWeather_description){Weather_description.push(myWeather_description)};
			baseData.prototype.setWeather_icon = function(myWeather_icon){Weather_icon.push(myWeather_icon)};
			baseData.prototype.setIcon_id = function(myIcon_id){Icon_id.push(myIcon_id)};
			baseData.prototype.setWeather_main = function(myWeather_main){Weather_main.push(myWeather_main)};
			baseData.prototype.setPressure = function(myPressure){Pressure.push(myPressure)};
			baseData.prototype.setWind_speed = function(myWind_speed){Wind_speed.push(myWind_speed)};
			baseData.prototype.setWind_deg = function(myWind_deg){Wind_deg.push(myWind_deg)};
			
			baseData.prototype.getTemperaturPrivileged = function(){return Temperature};
			baseData.prototype.getHumidity = function(){return Humidity};
			baseData.prototype.getClouds = function(){return Clouds};
			baseData.prototype.getRain = function(){return Rain};
			baseData.prototype.getSnow = function(){return Snow};
			baseData.prototype.getWeather_description = function(){return Weather_description};
			baseData.prototype.getWeather_icon = function(){return Weather_icon};
			baseData.prototype.getIcon_id = function(){return Icon_id};
			baseData.prototype.getWeather_main = function(){return Weather_main};
			baseData.prototype.getPressure = function(){return Pressure};
			baseData.prototype.getWind_speed = function(){return Wind_speed};
			baseData.prototype.getWind_deg = function(){return Wind_deg};
			
			baseData.prototype.init=function(){
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
			baseData.prototype.fillVariables = function(JSONdata){
				
				$.each(JSONdata,function(i,field){
					var Clouds_array=[];
					Temperature.push({x:field.time,y:field.Temperature});
					Humidity.push({x:field.time,y:field.Humidity});
					Clouds_array.push(field.time);
					Clouds_array.push(field.Clouds);
					Clouds_array.push(-field.Clouds);
					Clouds.push(Clouds_array);
					Rain.push({x:field.time,y:field.Rain});
					Snow.push({x:field.time,y:field.Snow});
					Weather_description.push({x:field.time,y:field.Weather_description});
					Weather_icon.push({x:field.time,y:field.Weather_icon});
					Icon_id.push({x:field.time,y:field.Icon_id});
					Weather_main.push({x:field.time,y:field.Weather_main});
					Pressure.push({x:field.time,y:field.Pressure});
					Wind_speed.push({x:field.time,y:field.Wind_speed});
					Wind_deg.push({x:field.time,y:0,wind_deg:field.Wind_deg});
				});
			};
			
			return baseData;
	})();
	
	//*******************************************************************************
	


	
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
	//data.prototype = new data;

	//var data16Day = new data;
	
	console.log(baseData);
	var prepare_data5Day=function (){
		baseData.call(this);
		console.log();
		var Grnd_level=[];
		var Sea_level=[];
		
		prepare_data5Day.prototype.setGrnd_level=function(myGrnd_level){
		Grnd_level.push(myGrnd_level);
		}
		
		prepare_data5Day.prototype.getGrnd_level=function(){
		return Grnd_level;
		}
		
		prepare_data5Day.prototype.getSea_level=function(){
		return Sea_level;
		}
		
		prepare_data5Day.prototype.setSea_level=function(mySea_level){
			Sea_level.push(mySea_level);
		}

		prepare_data5Day.prototype.fillVariables = function(externalJSONdata){
			
			baseData.prototype.fillVariables(externalJSONdata);
			
			$.each(externalJSONdata,function(i,field){
				prepare_data5Day.prototype.setSea_level({x:field.time,y:field.Sea_level});
				prepare_data5Day.prototype.setGrnd_level({x:field.time,y:field.Grnd_level});
			});
		}
		prepare_data5Day.prototype.init=function(){
			baseData.prototype.init();
			Grnd_level=[];
			Sea_level=[];
		}
		
	}
	console.log(prepare_data5Day);
	prepare_data5Day.prototype = new baseData;
	var data5Day = new prepare_data5Day;

	
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