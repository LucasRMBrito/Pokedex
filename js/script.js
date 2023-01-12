const pokemonNome = document.querySelector(".pokemon-nome");
const pokemonNumero = document.querySelector(".pokemon-numero");
const pokemonImg = document.querySelector(".pokemon-img")
const form = document.querySelector(".form");
const input = document.querySelector(".input-search");
const btnAnterior = document.querySelector(".btn-anterior");
const btnProximo = document.querySelector(".btn-proximo");

let procurarPokemon = 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        
        const dado = await APIResponse.json();
        return dado;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonNome.innerHTML = 'Carregando...';
    pokemonNumero.innerHTML = '';

    const dado =  await fetchPokemon(pokemon);

    if (dado) {
        pokemonImg.style.display = 'block';
        pokemonNome.innerHTML = dado.name;

        pokemonNumero.innerHTML = dado.id;

        pokemonImg.src = dado['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        procurarPokemon = dado.id;
    } else {
        pokemonImg.style.display = 'none';
        pokemonNome.innerHTML = 'Não encontrado';
        pokemonNumero.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {

    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

btnAnterior.addEventListener('click', () => {
    if (procurarPokemon > 1) {
        procurarPokemon -= 1;
        renderPokemon(procurarPokemon)
        console.log(procurarPokemon)
    };
});

btnProximo.addEventListener('click', () => {
    procurarPokemon += 1;
    renderPokemon(procurarPokemon)
    console.log(procurarPokemon)
});

renderPokemon(procurarPokemon);