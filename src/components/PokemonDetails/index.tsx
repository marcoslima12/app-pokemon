import React, { useEffect, useState } from "react";

export const PokemonDetails: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Lógica para lidar com a submissão do formulário
    console.log("Valor do input:", inputValue);
  };

  useEffect(() => {}, [inputValue]);

  return (
    <div>
      <h1>Formulário Simples</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Digite algo:
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.target.value))}
          />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default PokemonDetails;
