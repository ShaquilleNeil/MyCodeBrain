import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import { useState } from 'react';
import { useEffect } from 'react';
import Icon from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';


interface WeatherData {
  city: string
 temp: number;
 temp_min: number;
 temp_max: number;
 description: string
}

export default function Index() {

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>( null);

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
        description: descriptionCapitalized
      }
    );

  }

  return (
    <LinearGradient
    colors={['#0B1D3A', '#132F5C']}
      style={{
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <TextInput
      style={styles.input}
      onChangeText={newText => setCity(newText)}
      value={city}
      placeholder="Enter a City"
       />

  
        
       <Button
       onPress={fetchWeather}
       title="Submit" />
<View style={{flexDirection: "row", justifyContent: "space-between", width: "100%", padding: 10, borderRadius: 20}}>
  <View>
    <Text style={{color: "#F4A88B"}}>{weather?.city}</Text>
  <Text style={styles.bigTemp}>{weather?.temp}°</Text>
  </View>


<View style={{justifyContent: "center", alignItems: "center"}}>

     <Text style={styles.environment}>{weather?.description}</Text>
      <View style={{flexDirection: "row", justifyContent: "space-between", width: "50%"}}> 
        <Text>{weather? "H:" : ""} {weather?.temp_max} {weather? "°" : ""}</Text>
        <Text>{weather? "L:" : ""} {weather?.temp_min} {weather? "°" : ""}</Text>
        
           </View>
      
     </View>

</View>
      
     

     
     
      
    </LinearGradient>
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


