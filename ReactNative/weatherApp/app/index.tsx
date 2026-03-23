import { Button, Text, TextInput, View, StyleSheet, ImageBackground, Alert } from "react-native";
import { ProgressBarAndroid } from "react-native";
import { useState } from 'react';
import { useEffect } from 'react';
import Icon from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';

import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import ForecastCard from "../components/forecast";
import StatCard from "../components/statCard";


interface WeatherData {
  city: string
 temp: number;
 temp_min: number;
 temp_max: number;
 description: string;
 humidity: number;
 windSpeed: number;
 visibility: number;

}

interface ForecastData {
  day: string;
  temp: number;
  temp_min: number;
  temp_max: number;
  description: string;
  main: string;
 
}

interface iconCode {
  icon: string;
  color: string
}



export default function Index() {

  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState<WeatherData | null>( null);
  const [forecast, setForecast] = useState<ForecastData[] | null>(null);
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
   getLocation();
  }, []);

  async function fetchWeather() {

   try {
    setLoading(true);

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=261684320267de715701e47c677a8f05`);
    const data = await response.json();

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;

    
     const words = description.split(" ");
    const descriptionCapitalized = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    
   
    setWeather(
      {
        city: city,
        temp: temperature,
        temp_min: data.main.temp_min.toFixed(0),
        temp_max: data.main.temp_max.toFixed(0),
        description: descriptionCapitalized,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        visibility: data.visibility

   
      }
    );
   }
   catch (error) {
    console.error("Error fetching weather:", error);
   } finally {
     setLoading(false);
   }

  }


  async function fetchForecast(city: string) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=261684320267de715701e47c677a8f05`
    );
    const data = await response.json();
  
    if (!data.list) {
      console.log("Forecast API failed:", data);
      return;
    }
    // 1. Keep one entry per day (12:00)
    const daily = data.list.filter((item: any) =>
      item.dt_txt.includes("12:00:00")
    );

    const today = new Date().toISOString().split("T")[0];
  
    
    const forecastData = daily.map((item: any) => {
      const day = new Date(item.dt_txt).toLocaleDateString("en-US", {
        weekday: "short",
      });
  
      return {
        day,
        temp: Number(item.main.temp.toFixed(0)),
        temp_min: Number(item.main.temp_min.toFixed(0)),
        temp_max: Number(item.main.temp_max.toFixed(0)),
        description: item.weather[0].description,
        main: item.weather[0].main
      

      };
    });
  
    // 3. Set array (matches your state type)
    setForecast(forecastData);
  }


  function getWeatherUI(main: string): { icon: keyof typeof Icon.glyphMap; color: string } {
    switch (main) {
      case "Clear":
        return { icon: "wb-sunny", color: "#FFD93D" };
  
      case "Clouds":
        return { icon: "cloud", color: "#B0BEC5" };
  
      case "Rain":
      case "Drizzle":
        return { icon: "grain", color: "#4FC3F7" };
  
      case "Thunderstorm":
        return { icon: "flash-on", color: "#9575CD" };
  
      case "Snow":
        return { icon: "ac-unit", color: "#81D4FA" };
  
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Dust":
      case "Fog":
      case "Sand":
      case "Ash":
      case "Squall":
      case "Tornado":
        return { icon: "blur-on", color: "#CFD8DC" };
  
      default:
        return { icon: "help-outline", color: "#aaa" };
    }
  }


  async function getLocation(){
    const { status } = await Location.requestForegroundPermissionsAsync();


    if(status !== 'granted'){
      Alert.alert('Location permission denied');
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync();
   
      const { latitude, longitude } = location.coords;

      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=261684320267de715701e47c677a8f05`);
      const data = await response.json();
  
      const temperature = Math.round(data.main.temp);
      const description = data.weather[0].description;
  
      
       const words = description.split(" ");
      const descriptionCapitalized = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
      
     
      setWeather(
        {
          city: data.name,
          temp: temperature,
          temp_min: data.main.temp_min.toFixed(0),
          temp_max: data.main.temp_max.toFixed(0),
          description: descriptionCapitalized,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          visibility: data.visibility
  
     
        }
      );

      setCity(data.name);
      await fetchForecast(data.name);
    }
    catch (error) {
      Alert.alert('Error getting location');
      console.error("Error fetching location:", error);
      return;
    }

   
  }

  return (
    <LinearGradient
    colors={['#0B1D3A', '#132F5C']}
      style={{
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
      }}
    >

{/* Search Bar//////////////////////////////////////////////////////////////////////////////////////////////////////  */}
<TextInput
      style={styles.input}
      onChangeText={newText => setCity(newText)}
      value={city}
      placeholder="Enter a City"
      placeholderTextColor="black"
      backgroundColor="#ffffff"
      onSubmitEditing={() => {fetchWeather(); fetchForecast(city)}}
       />


{/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      
  



        
    {/* Temp, city and description  //////////////////////////////////////////////////////////////////////////  */}
<View style={{flexDirection: "row", justifyContent: "space-between", width: "100%", padding: 10, borderRadius: 20}}>
  <View>
    <Text style={{color: "#F4A88B"}}>{weather?.city}</Text>
  <Text style={styles.bigTemp}>{weather?.temp} {weather? "°" : null}</Text>
  </View>


<View style={{justifyContent: "center", alignItems: "center"}}>

     <Text style={styles.environment}>{weather?.description}</Text>
      <View style={{flexDirection: "row", justifyContent: "space-between", width: "50%"}}> 
        <Text>{weather? "H:" : null} {weather?.temp_max} {weather? "°" : null}</Text>
        <Text>{weather? "L:" : null} {weather?.temp_min} {weather? "°" : null}</Text>
        
           </View>
      
     </View>

</View>
{/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}



{/* Forecast //////////////////////////////////////////////////////////////////////////////////////////////////////  */}
<View>
{weather?
<View style={{ backgroundColor: "#1C2A44", borderRadius: 20, padding: 20 }}>



<View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15, width: "100%" }}>
  <Text style={{ color: "#aaa", fontWeight: "bold" }}>{weather? "24-HOUR FORECAST" : null}</Text>
  <Text style={{ color: "#F4A88B" }}>{weather? "LIVE UPDATES" : null}</Text>
</View> 


{/* Forecast Row */}
<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
{forecast?.map((item, index) => (
  <ForecastCard
    key={index}
    day={item.day}
    temp={item.temp}
    main={item.main}
  />
))}
</View>

</View>
: null}
</View>
{/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}


{/* Humidity and Wind Speed /////////////////////////////////////////////////////////////////////////////////////// */}
{weather && (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      gap: 20,
      padding: 5
    }}
  >
    <StatCard
      icon="water-drop"
      label="Humidity"
      value={weather.humidity}
    />

    <StatCard
      icon="air"
      label="Wind Speed"
      value={weather.windSpeed}
    />
  </View>
)}
{/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      



     
     
      
    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    width: "60%",
    marginBottom: 20,
    padding: 10,
  opacity: 1,

  
    

  },

  cardHumidity: {
    color: "#fff",
    backgroundColor: "#1C2A44",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },

  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20
  },

  bigTemp: {
    color: "white",
    fontSize: 100,
    fontFamily: "Lato-Black"
  },

  environment: {
    fontSize: 30,
    color: "white",
    fontFamily: "Lato-Black"
  }

});


