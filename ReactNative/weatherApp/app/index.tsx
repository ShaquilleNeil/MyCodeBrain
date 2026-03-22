import { Button, Text, TextInput, View, StyleSheet, ImageBackground } from "react-native";
import { useState } from 'react';
import { useEffect } from 'react';
import Icon from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';

import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";


interface WeatherData {
  city: string
 temp: number;
 temp_min: number;
 temp_max: number;
 description: string;
 humidity: number;
 windSpeed: number

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

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>( null);
  const [forecast, setForecast] = useState<ForecastData[] | null>(null);
 

  useEffect(() => {
   
  })

  async function fetchWeather() {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=261684320267de715701e47c677a8f05`);
    const data = await response.json();

    const temperature = data.main.temp.toFixed(0);
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
        windSpeed: data.wind.speed

   
      }
    );

  }


  async function fetchForecast() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=261684320267de715701e47c677a8f05`
    );
    const data = await response.json();
  
    // 1. Keep one entry per day (12:00)
    const daily = data.list.filter((item: any) =>
      item.dt_txt.includes("12:00:00")
    );

    const today = new Date().toISOString().split("T")[0];
  
    // 2. Map to your ForecastData structure
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


  function moveSearchBar(){

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


<TextInput
      style={styles.input}
      onChangeText={newText => setCity(newText)}
      value={city}
      placeholder="Enter a City"
      placeholderTextColor="black"
      backgroundColor="#ffffff"
      onSubmitEditing={() => {fetchWeather(); fetchForecast()}}
       />



      
  
        
       
<View style={{flexDirection: "row", justifyContent: "space-between", width: "100%", padding: 10, borderRadius: 20}}>
  <View>
    <Text style={{color: "#F4A88B"}}>{weather?.city}</Text>
  <Text style={styles.bigTemp}>{weather?.temp} {weather? "°" : ""}</Text>
  </View>


<View style={{justifyContent: "center", alignItems: "center"}}>

     <Text style={styles.environment}>{weather?.description}</Text>
      <View style={{flexDirection: "row", justifyContent: "space-between", width: "50%"}}> 
        <Text>{weather? "H:" : ""} {weather?.temp_max} {weather? "°" : ""}</Text>
        <Text>{weather? "L:" : ""} {weather?.temp_min} {weather? "°" : ""}</Text>
        
           </View>
      
     </View>

</View>


<View>



{weather?
<View style={{ backgroundColor: "#1C2A44", borderRadius: 20, padding: 20 }}>



<View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15, width: "100%" }}>
  <Text style={{ color: "#aaa", fontWeight: "bold" }}>{weather? "24-HOUR FORECAST" : ""}</Text>
  <Text style={{ color: "#F4A88B" }}>{weather? "LIVE UPDATES" : ""}</Text>
</View> 


{/* Forecast Row */}
<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
{forecast?.map((item, index) => {
  const ui = getWeatherUI(item.main);

  return (
    <View key={index} style={{ alignItems: "center", flex: 1, gap: 10 }}>
      <Text style={{ color: "#aaa" }}>{item.day}</Text>
      <Icon name={ui.icon} size={24} color={ui.color} />
      <Text style={{ color: "white", fontSize: 18 }}>{item.temp}°</Text>
    </View>
  );
})}
</View>





</View>
: " "}


{weather? 
<View style={{ flexDirection: "row", justifyContent: "space-between", width: "50%", gap: 20, padding: 5}}>
<View
style={styles.cardHumidity}>

<Text style={{
  fontSize: 20,
  color: "#ffffff",
  marginBottom: 10
}}>Humidity</Text>
<Text style={{ color: "#ffffff", fontSize: 50}}>{weather?.humidity}</Text>
</View>

<View
style={styles.cardHumidity}>

<Text style={{
  fontSize: 20,
  color: "#ffffff",
  marginBottom: 10
}}>Wind Speed</Text>
<Text style={{ color: "#ffffff", fontSize: 50}}>{weather?.windSpeed}</Text>
</View>


</View>

: " "}


</View>
      
     

     
     
      
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


