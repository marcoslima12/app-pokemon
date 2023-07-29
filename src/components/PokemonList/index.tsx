/* import { useState, useEffect } from "react";
import axios from "axios";

type Pokemon = {
  name: string;
};

export const PokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(2);

  const getPokmeons = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
      );
      console.log(response.data.results);
      const newPokemons: Pokemon[] = response.data.results;
      setPokemons((lastPokemons) => [...lastPokemons, ...newPokemons]);
      const { results } = response.data;
      console.log(results); 
      //setPokemons(results);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPokmeons();
  }, []);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const visibleHeight = window.innerHeight;
    const totalHeight = document.documentElement.scrollHeight;

    if (scrollY + visibleHeight >= totalHeight) {
      setOffset((prevOffset) => prevOffset + limit);
      getPokmeons();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pokemons]);

  return (
    <>
      <h2>Pokemon List</h2>
      {pokemons.map((pokemon) => (
        <p>{pokemon.name}</p>
      ))}
    </>
  );
};
 */

import { useState, useEffect } from "react";
import axios from "axios";

type Pokemon = {
  name: string;
};

export const PokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false); // Novo estado para controle de dados carregados

  const getPokemons = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
      );
      const newPokemons: Pokemon[] = response.data.results;
      setPokemons((lastPokemons) => [...lastPokemons, ...newPokemons]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (dataLoaded) {
      // Chama getPokemons() somente se os dados já tiverem sido carregados
      getPokemons();
    } else {
      setDataLoaded(true);
    }
  }, [offset, dataLoaded]);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const visibleHeight = window.innerHeight;
    const totalHeight = document.documentElement.scrollHeight;

    if (scrollY + visibleHeight >= totalHeight) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <h2>Pokemon List</h2>
      {pokemons.map((pokemon) => (
        <p key={pokemon.name}>{pokemon.name}</p>
      ))}
    </>
  );
};
