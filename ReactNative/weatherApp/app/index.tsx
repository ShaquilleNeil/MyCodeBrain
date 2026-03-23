import { Button, Text, TextInput, View, StyleSheet, ImageBackground, Alert } from "react-native";
import { useState } from 'react';
import { useEffect } from 'react';
import Icon from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import ForecastCard from "../components/forecast";
import StatCard from "../components/statCard";
import LottieView from 'lottie-react-native';
import Rive from 'rive-react-native';

import { Asset } from "expo-asset";


interface WeatherData {
  city: string
 temp: number;
 temp_min: number;
 temp_max: number;
 description: string;
 humidity: number;
 windSpeed: number;
 visibility: number;
 main: string;

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
  const bgColors = getBackground(weather?.main || "Clear");
  const [riveUri, setRiveUri] = useState<string | null>(null);
  
 

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
        temp_min: Number(data.main.temp_min.toFixed(0)),
temp_max: Number(data.main.temp_max.toFixed(0)),
        description: descriptionCapitalized,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        visibility: data.visibility,
        main: data.weather[0].main

   
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


  function getWeatherAnimation(main: string) {
    switch (main) {
      case "Rain":
        return require("../assets/animations/Rain.json");
      case "Mist":
         return require("../assets/animations/mist.json");
      case "Drizzle":
        return require("../assets/animations/Rain.json");
  
      case "Snow":
        return require("../assets/animations/snow.json");
  
      case "Clear":
        return require("../assets/animations/sun.json");
  
      case "Clouds":
        return require("../assets/animations/clouds.json");
  
      default:
        return null;
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
          visibility: data.visibility,
          main: data.weather[0].main
  
     
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

  function getBackground(main: string) {
    switch (main) {
      case "Clear":
        return ["#4facfe", "#00f2fe"]; // sunny blue
  
      case "Clouds":
        return ["#757F9A", "#D7DDE8"]; // cloudy grey
  
      case "Rain":
      case "Drizzle":
        return ["#314755", "#26a0da"]; // rainy dark blue
  
      case "Thunderstorm":
        return ["#141E30", "#243B55"]; // storm
  
      case "Snow":
        return ["#E6DADA", "#274046"]; // snowy
  
      default:
        return ["#0B1D3A", "#132F5C"]; // fallback
    }
  }



 

  return (
   
     
      <View style={{ flex: 1 }}>
  
  {/* 🔥 TOP HALF */}
  <View style={{ flex: 1 }}>

    <LinearGradient
      colors={bgColors}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    />

    {weather?.main && (
      <LottieView
        source={getWeatherAnimation(weather.main)}
        autoPlay
        loop
        resizeMode="cover"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.3
        }}
      />


    
    )}

{riveUri && (
  <Rive
    url={riveUri}
    style={{ width: 200, height: 200 }}
  />
)}

    {/* Search */}
    <TextInput
      style={styles.input}
      onChangeText={newText => setCity(newText)}
      value={city}
      placeholder="Enter a City"
      placeholderTextColor="black"
      backgroundColor="#ffffff"
      onSubmitEditing={() => {
        fetchWeather();
        fetchForecast(city);
      }}
    />

    {/* Temp Section */}
    <View
  style={{
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }}
>
  <View style={{ alignItems: "center", gap: 5 }}>
    
    {/* City */}
    <Text style={{ color: "#F4A88B", fontSize: 28, top: 25 }}>
      {weather?.city}
    </Text>

    {/* Big Temp */}
    <Text style={styles.bigTemp}>
      {weather?.temp}{weather ? "°" : ""}
    </Text>

    {/* Description */}
    <Text style={styles.environment}>
      {weather?.description}
    </Text>

    {/* High / Low */}
    <View
      style={{
        flexDirection: "row",
        gap: 20,
        marginTop: 5
      }}
    >
      <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 16 }}>
        H: {weather?.temp_max}°
      </Text>
      <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 16
        
       }}>
        L: {weather?.temp_min}°
      </Text>
    </View>

  </View>
</View>


    <LinearGradient
    colors={[
      "transparent",
      "rgba(11,29,58,0.4)",
      "#0B1D3A"
    ]}
    style={{
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: 150
    }}
  />

  </View>

  {/* 🔥 BOTTOM HALF */}
 
  <View style={{
    flex: 1,
    padding: 10,
    backgroundColor: "#0B1D3A"
  }}>

    {/* Forecast */}
    {weather && (
      <View style={{
        backgroundColor: "#1C2A44",
        borderRadius: 20,
        padding: 20
      }}>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 15
        }}>
          <Text style={{ color: "#aaa", fontWeight: "bold" }}>
            WEEKLY FORECAST
          </Text>
          <Text style={{ color: "#F4A88B" }}>
            LIVE UPDATES
          </Text>
        </View>

        <View style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}>
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
    )}

    {/* Stats */}
    {weather && (
      <View style={{
        flexDirection: "row",
        gap: 10,
        marginTop: 20
      }}>
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

    {/* Visibility */}
    <View style={{
      flexDirection: "row",
      marginTop: 10,
      height: 100
    }}>
      <StatCard
        icon="visibility"
        label="Visibility"
        value={weather?.visibility / 1000}
       
      />
    </View>

  </View>

</View>
     
      
  
  );
}

const styles = StyleSheet.create({

  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    width: "60%",
    marginBottom: 20,
    padding: 10,
    position: "absolute",
    top: 50,
    right: 10,
  opacity: 0.8

  
    

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
    fontFamily: "Lato-Black",
    
  },

  environment: {
    fontSize: 25,
    color: "white",
    fontFamily: "Lato-Black"
  }

});


