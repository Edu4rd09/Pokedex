const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
const searchButton = document.querySelector("#search__button");
const searchInput = document.querySelector("#idPokemon");
const verMasButton = document.querySelector("#navegation__next");

let URL = "https://pokeapi.co/api/v2/pokemon/";

const tipoTraducciones = {
    normal: "Normal",
    fighting: "Lucha",
    flying: "Volador",
    poison: "Veneno",
    ground: "Tierra",
    rock: "Roca",
    bug: "Bicho",
    ghost: "Fantasma",
    steel: "Acero",
    fire: "Fuego",
    water: "Agua",
    grass: "Planta",
    electric: "Eléctrico",
    psychic: "Psíquico",
    ice: "Hielo",
    dragon: "Dragón",
    dark: "Siniestro",
    fairy: "Hada"
};

for (let i = 1; i <= 1026; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(poke) {
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${tipoTraducciones[type.type.name]}</p>`);
    tipos = tipos.join(``);

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
    <p class="pokemon-id-back">#${pokeId}</p>
    <div class="pokemon-imagen">
        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
    </div>
    <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon id">#${pokeId}</p>
            <h2 class="pokemon-nombre">${poke.name}</h2>
        </div>
        <div class="pokemon-tipos">
         ${tipos}
        </div>
        <div class="pokemon-stats">
            <p class="stats">${poke.height}m</p>
            <p class="stats">${poke.weight}kg</p>
        </div>
    </div>
    `;
    listaPokemon.append(div);
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 1026; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if (botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }
            })
    }
}));

// Función de búsqueda
searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (!searchTerm) return;

    fetch(URL + searchTerm)
        .then((response) => {
            if (!response.ok) throw new Error("No se encontró el Pokémon");
            return response.json();
        })
        .then(data => {
            listaPokemon.innerHTML = ""; // Limpiar la lista de Pokémon
            mostrarPokemon(data); // Mostrar el Pokémon buscado
        })
        .catch(error => alert(error.message));
});

/* // Cargar más Pokémon
verMasButton.addEventListener("click", () => {
    cargarMasPokemon();
});

function cargarMasPokemon() {
    let nextLimit = totalLoaded + 50; // Incrementar en 50 cada vez
    for (let i = totalLoaded + 1; i <= nextLimit; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => mostrarPokemon(data))
            .catch(error => console.log('Error al cargar Pokémon:', error));
    }
    totalLoaded = nextLimit;
} */
  