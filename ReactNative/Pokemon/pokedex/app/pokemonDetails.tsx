import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { ScrollView, Image, Text, View, StyleSheet } from "react-native";


interface PokemonDetails{
    weight: number;
    height: number;
    image: string;
    stats: PokemonStats;
   
}

interface MegaEvolution{
    name: string;
    image: string;
    stats: PokemonStats;
}

interface PokemonStats{
        hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number; 
    
}


export default function Index() {

const params = useLocalSearchParams();
//single pokemon details page, we will fetch the pokemon by name and display the weight of the pokemon
const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
const [megaEvolution, setMegaEvolution] = useState<MegaEvolution | null>(null);

useEffect(() => {
    fetchPokemonByName(params.name as string);
    fetchMegaEvolutionByName(params.name as string);
}, []);


async function fetchPokemonByName(name: string){
    try {
        //fetching a single pokemon so no promise.all, we just fetch the pokemon by name and set the state with the weight of the pokemon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();

        const stats: PokemonStats = {
            hp: 0,
            attack: 0,
            defense: 0,
            specialAttack: 0,
            specialDefense: 0,
            speed: 0
        }

        data.stats.forEach((stat: any) => {
            switch(stat.stat.name){
                case "hp":
                    stats.hp = stat.base_stat;
                    break;
                case "attack":
                    stats.attack = stat.base_stat;
                    break;
                case "defense":
                    stats.defense = stat.base_stat;
                    break;
                case "special-attack":
                    stats.specialAttack = stat.base_stat;
                    break;
                case "special-defense":
                    stats.specialDefense = stat.base_stat;
                    break;
                case "speed":
                    stats.speed = stat.base_stat;
                    break;
            }
        });

        setPokemon({
            weight: data.weight,
            height: data.height,
            image: data.sprites.front_default,
            stats: stats
        });

    } catch (error) {
        console.error(error);
    }
}


async function fetchMegaEvolutionByName(name: string){
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();

        const species = await fetch(data.species.url);
        const speciesData = await species.json();

        const mega = speciesData.varieties.filter((v: any) => 
        
            v.pokemon.name.includes("mega")
        );

        const megaEvolution = await fetch(mega[0].pokemon.url);
        const megaEvolutionData = await megaEvolution.json();

        const stats: PokemonStats = {
            hp: 0,
            attack: 0,
            defense: 0,
            specialAttack: 0,
            specialDefense: 0,
            speed: 0
        }

        megaEvolutionData.stats.forEach((stat: any) => {
            switch(stat.stat.name){
                case "hp":
                    stats.hp = stat.base_stat;
                    break;
                case "attack":
                    stats.attack = stat.base_stat;
                    break;
                case "defense":
                    stats.defense = stat.base_stat;
                    break;
                case "special-attack":
                    stats.specialAttack = stat.base_stat;
                    break;
                case "special-defense":
                    stats.specialDefense = stat.base_stat;
                    break;
                case "speed":
                    stats.speed = stat.base_stat;
                    break;
            }
        });

        setMegaEvolution({
           name: megaEvolutionData.name,
           image: megaEvolutionData.sprites.front_default,
           stats: stats
        });

    }
    catch(error){
        console.error(error);
    }
}
  return (
    <ScrollView
    contentContainerStyle={{
      gap: 16,
      padding : 16,
      alignItems: "center"
    }}
    >

        <Text style={styles.name}>{params.name}</Text>
        <Text style={styles.type}>Weight: {pokemon?.weight ?? "loading"}</Text>
        <Text style={styles.type}>Height: {pokemon?.height ?? "loading"}</Text>

         <View
         style={{
            backgroundColor: params.colorsByType as string,
            padding: 16,
            borderRadius: 20,
            width: 200
         }}
         >
         <Image source={{uri: pokemon?.image}} style={{width: 200, height: 200, alignSelf: "center"}} />


         <Text>Stats</Text>
            <Text>HP: {pokemon?.stats.hp ?? "loading"}</Text>
            <Text>Attack: {pokemon?.stats.attack ?? "loading"}</Text>
            <Text>Defense: {pokemon?.stats.defense ?? "loading"}</Text>
            <Text>Special Attack: {pokemon?.stats.specialAttack ?? "loading"}</Text>
            <Text>Special Defense: {pokemon?.stats.specialDefense ?? "loading"}</Text>
            <Text>Speed: {pokemon?.stats.speed ?? "loading"}</Text>
          

         </View>

         <Text>Mega Evolution</Text>
         <View
         style={{
            backgroundColor: params.colorsByType as string,
            padding: 16,
            borderRadius: 20,
            width: 200
         }}
         >
         <Image source={{uri: megaEvolution?.image}} style={{width: 200, height: 200, alignSelf: "center"}} />
         <Text>Stats</Text>
            <Text>HP: {megaEvolution?.stats.hp ?? "loading"}</Text>
            <Text>Attack: {megaEvolution?.stats.attack ?? "loading"}</Text>
            <Text>Defense: {megaEvolution?.stats.defense ?? "loading"}</Text>
            <Text>Special Attack: {megaEvolution?.stats.specialAttack ?? "loading"}</Text>
            <Text>Special Defense: {megaEvolution?.stats.specialDefense ?? "loading"}</Text>
            <Text>Speed: {megaEvolution?.stats.speed ?? "loading"}</Text>
        </View>

      
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