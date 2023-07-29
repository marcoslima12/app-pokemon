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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [update, setUpdate] = useState(0);

  const fetchPokemonData = async () => {
    try {
      if (input) {
        setIsLoading(true);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${input}`
        );

        setIsLoading(false);
        const { name, types } = response.data;
        setPokemon({ name, types });
      }
    } catch (error) {
      // Tratar erros, por exemplo, exibir uma mensagem de erro na tela
      setIsLoading(false);
      alert("Erro ao buscar o Pokémon. Tente novamente");
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, [input, update]);

  return (
    <div>
      {pokemon && (
        <>
          <p>{pokemon.name}</p>
          <p>{pokemon.types[0]?.type.name || "typo"}</p>
        </>
      )}
      {isLoading && <p>Carregando pokemon...</p>}
      <button onClick={() => setUpdate(update + 1)}>Atualizar</button>
    </div>
  );
};

export default PokemonDetails;
