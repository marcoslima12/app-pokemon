import { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "./styles";

type Pokemon = {
  name: string;
};

export const PokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false); // Novo estado para controle de dados carregados

  const getPokemons = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
      );
      setIsLoading(false);
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
    <Container>
      <h2>Pokemon List</h2>
      {pokemons.map((pokemon) => (
        <p key={pokemon.name}>{pokemon.name}</p>
      ))}
      {isLoading && ( <h1>Loading more pokemon...</h1> )}
    </Container>
  );
};
