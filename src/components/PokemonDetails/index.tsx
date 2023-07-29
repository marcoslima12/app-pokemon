import React, { useState, useEffect } from "react";
import axios from "axios";

interface PokemonProps {
  input: number;
}

type PokemonTypes = {
  type: { name: string };
};
type Pokemon = {
  name: string;
  types: PokemonTypes[];
};

const PokemonDetails = ({ input }: PokemonProps) => {
  const [pokemon, setPokemon] = useState<Pokemon>({ name: "", types: [] });

  const fetchPokemonData = async () => {
    try {
      if (input) {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${input}`
        );
        const { name, types } = response.data;
        setPokemon({ name, types });
      }
    } catch (error) {
      // Tratar erros, por exemplo, exibir uma mensagem de erro na tela
      console.error("Erro ao buscar o Pokémon:", error);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, [input]);

  return (
    <div>
      {pokemon && (
        <>
          <p>{pokemon.name}</p>
          <p>{pokemon.types[0]?.type.name || "typo"}</p>
        </>
      )}
    </div>
  );
};

export default PokemonDetails;
