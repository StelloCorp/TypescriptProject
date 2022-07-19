const container: HTMLElement | any = document.getElementById('app');
const pokemons = 50;

//Declaration of object types
interface DataPokemon {
  id: number;
  name: string;
  image: string;
  type: string;
}

//Loop declaration
const fetchData = (): void => {
  for (let i = 1; i <= pokemons; i++) {
    getPokemon({id: i});
  }
};

//Fetching data of the API
const getPokemon = async ({id}: {id: number}): Promise<void> => {
  const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon: any = await data.json();
  const pokemonType: string = pokemon.types
    .map((poke: any) => poke.type.name)
    .join(', ');

  const transformedPokemon = {
    id: pokemon.id,
    name: pokemon.name,
    image: `${pokemon.sprites.front_default}`,
    type: pokemonType,
  };

  showPokemon(transformedPokemon);
};

//Implementation of data received on HTML
const showPokemon = (pokemon: DataPokemon): void => {
  const output = `
        <div class="card">
            <span class="card--id">#${pokemon.id}</span>
            <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
            <h1 class="card--name">${pokemon.name}</h1>
            <span class="card--details">${pokemon.type}</span>
        </div>
    `;
  container.innerHTML += output;
};

fetchData();
