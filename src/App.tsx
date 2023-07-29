import { useState } from "react";
import PokemonDetails from "./components/PokemonDetails";

function App() {
  const [inputNumber, setInputNumber] = useState(0);
  const handleInputChange = (event: { target: { value: any } }) => {
    if (event.target.value !== 0) {
      setInputNumber(event.target.value);
    }
  };

  return (
    <>
      <h1>Hello Pokemon</h1>
      <input
        type="number"
        placeholder="Enter the pokémon number"
        value={inputNumber}
        onChange={handleInputChange}
      />
      <PokemonDetails input={inputNumber} />
    </>
  );
}

export default App;
