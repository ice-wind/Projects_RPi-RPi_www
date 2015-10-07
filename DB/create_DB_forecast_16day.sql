CREATE TABLE graph_data.forecast_data_16day(ID int not null auto_increment,CITY_ID char(20),DT char(20),CLOUDS double(4,2),HUMIDITY double(3,1),PRESSURE char(20),TEMPERATURE_DAY char(20),TEMPERATURE_NIGHT char(20),TEMPERATURE_MAX char(20),TEMPERATURE_MIN char(20),TEMPERATURE_MORNING char(20),TEMPERATURE_EVE char(20),RAIN double(8,3),SNOW double(8,3),WEATHER_DESCRIPTION char(20),WEATHER_ICON char(6),ICON_ID char(6),WEATHER_MAIN char(20),WIND_DEG double(5,5),WIND_SPEED double(3,2) , primary key (ID));