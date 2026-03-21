import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Image, Text, View, StyleSheet, Pressable } from "react-native";




interface Pokemon{
  name: string;
  image: string;
  imageShiny: string;
  types: PokemonType[];
}


//create an interface for the pokemon type, which has a name and a url
interface PokemonType {
  type: {
    name: string
    url: string
  }
}


//create and array to show colors by type
const colorsByType: Record<string, string> = {
  grass: "#78C850",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  bug: "#A8B820",
  normal: "#A8A878",
  poison: "#A040A0",
  ground: "#E0C068",
  fairy: "#EE99AC",
  fighting: "#C03028",
  psychic: "#F85888",
  rock: "#B8A038",
  ghost: "#705898",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  flying: "#A890F0"
};


export default function Index() {

  //useState is a hook that allows us to save data in a state variable and can be displayed on screen
  //we define a state variable called pokemons and a setter function called setPokemons, and we initialize it with an empty array
  //first one is a variable that holds the value and the second is the setter function
  const [pokemons, setPokemons] = useState<Pokemon[]>([]); 

 



  //useEffect runs after the component is mounted, and it will run only once because of the empty dependency array
  useEffect(() => {
    //fetch the list of pokemons from the pokeapi
    fetchPokemons();
  }, [])








  async function fetchPokemons() {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=10000");

      //get the json data from the response
      const data = await response.json();

      //fetch detailed info for each pokemon using a promise
      const pokemonDetails = await Promise.all(
         data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            imageShiny: details.sprites.front_shiny,
            types: details.types

          };
         })
      );

      //save the array of pokemons in the state variable
      setPokemons(pokemonDetails);

    } catch (error) {
        console.error("Error fetching pokemons:", error);
    }
  }




  return (
    <ScrollView
    contentContainerStyle={{
      gap: 16,
      padding : 16
    }}
    >

      {/* //iterate over the pokemons array and display the name of each pokemon */}
      {pokemons.map((pokemon) => (

        //navigate to the pokemon details screen when pressed, and pass the pokemon as a parameter
        <Link key={pokemon.name}
        href={{pathname: '/pokemonDetails', params: {name: pokemon.name, colorsByType: colorsByType[pokemon.types[0].type.name]}}}
        //create a view with a background color based on the type of the pokemon
        style={{ 
          backgroundColor: colorsByType[pokemon.types[0].type.name],
          padding: 16,
          borderRadius: 20,
          }} >
        <View 
       
        >
          <Text style={styles.name}>{pokemon.name}</Text>
          <Text style={styles.type}>{pokemon.types[0].type.name}</Text>


          <View 
          style={{
            flexDirection: "row"
          }}
          >
      {/* image Property */}
          <Image
          source={{ uri: pokemon.image }}
          style={{ width: 150, height: 150 }}
          />

          <Image
          source={{ uri: pokemon.imageShiny }}
          style={{ width: 150, height: 150 }}
          />

          </View>
          
        </View>
        </Link>
      ))}
      
    </ScrollView>
  );
}



// stylesheet
const styles = StyleSheet.create({
  name : {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  type: {
    fontSize: 18,
    fontWeight: "normal",
    textAlign: "center",
  }
});