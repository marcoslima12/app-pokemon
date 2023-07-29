import PokemonDetails from "./components/PokemonDetails";
import { PokemonList } from "./components/PokemonList";
import { Container } from "./styles";

function App() {
  return (
    <Container>
      <h1>Hello Pokemon</h1>
      <PokemonDetails />
      <PokemonList />
    </Container>
  );
}

export default App;
