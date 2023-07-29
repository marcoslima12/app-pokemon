import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "./styles";

type PokemonTypes = {
  type: { name: string };
};
type Pokemon = {
  name: string;
  types: PokemonTypes[];
};

const PokemonDetails = () => {
  const [pokemon, setPokemon] = useState<Pokemon>({ name: "", types: [] });
  const [img, setImg] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [update, setUpdate] = useState(0);
  const [input, setInput] = useState<number>();
  const [bool, setBool] = useState(true);

  const handleInputChange = (event: { target: { value: any } }) => {
    if (event.target.value !== 0) {
      setInput(event.target.value);
    }
  };

  const fetchPokemonData = async () => {
    try {
      if (input) {
        setIsLoading(true);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${input}`
        );
        console.log(response.data.sprites);
        //const responeImage = await axios.get(`https://assets.pokemon.com/assets/cms2/img/pokedex/full/249.png`)
        //console.log(typeof responseImg);
        setIsLoading(false);
        setBool(false);

        const { name, types, sprites } = response.data;
        setImg(sprites.front_default);
        setPokemon({ name, types });
      } else {
        setBool(true);
      }
    } catch (error) {
      // Tratar erros, por exemplo, exibir uma mensagem de erro na tela
      setIsLoading(false);
      alert("Erro ao buscar o Pokémon. Tente novamente");
      setBool(true);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, [input, update]);

  return (
    <Container>
      <input
        type="number"
        placeholder="Enter the pokémon number"
        value={input}
        onChange={handleInputChange}
      />
      {pokemon && bool === false && isLoading !== true && (
        <>
          <img src={img} alt="" />
          <h2>Name: {pokemon.name}</h2>
          <h3>Type: {pokemon.types[0]?.type.name}</h3>
          <button onClick={() => setUpdate((update) => update + 1)}>
            Atualizar
          </button>
        </>
      )}
      {bool && <h1>Don't you wanna see any pokemon? So, enter a number!</h1>}
      {isLoading && <h1>Loading pokemon...</h1>}
    </Container>
  );
};

export default PokemonDetails;
