//WINDOW ONLOAD EJECUTA TODAS LAS FUNCIONES QUE TIENE DENTRO, AL INICIAR LA APLICACION. EN ESTE CASO TENGO UNA FUNCION INIT.
window.onload = () => {
    init();
}
//SI METO ESTO EN EL ONLOAD, CUANDO CARGUE LA PANTALLA, LO EJECUTA. ASYNC-AWAIT. LLAMA A LA FUNCIÓN QUE HACE LA PETICIÓN A LA POKE API.
async function init() {
    const pokeList = await getPokemonsList();
    const pokemonsMapped = await mappedPoke(pokeList);
printPoke(pokemonsMapped);
}

//HAGO FETCH A UNA FUNCIÓN ASÍNCRONA Y CUANDO TENGO LA RESPUESTA DE LA API, CONVIERTO LOS DATOS EN JSON. ESTO ESTÁ MAL--> ME VA A HACER 150 PETICIONES A LA POKE API, LO IDEAL ES HACER SOLO UNA..
const getPokemonsList = async () => {
    let arrayPokemons = [];
    for (let i = 1; i <= 151 ; i++) {
    const pokemonsData = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const pokeJson = await pokemonsData.json();
    arrayPokemons.push(pokeJson);   
}
console.log("esto es el array pokemons dentro del getPokeList:",arrayPokemons)
return arrayPokemons
}

//AQUI MAPEO LA INFORMACIÓN QUE QUIERO DE LOS POKEMONS
const mappedPoke = (pokemons) => {
    const pokemapped = pokemons.map(poke => {
        return {
            name: poke.name,
            img: poke.sprites.front_default,
            height: poke.height,
            weight: poke.weight,
        }
    })
    console.log("esto es el array mapeado:",pokemapped);
    return pokemapped;
}


//DOM: HAGO UNA FUNCION QUE LLEVA: CREATE ELEMENTE CON EL DIV QUE VA A CONTENER LOS POKE, Y EN UN FOREACH METO EL INNERHTML CON LAS TARJETAS, LO INYECTO CON EL APPENDCHILDD
function printPoke(pokemons) {
    const list = document.createElement("div");
    list.className = 'containerPoke';
    console.log(pokemons)
    pokemons.forEach(poke => {
        list.innerHTML += `
        <div class="card">
        <h2>${poke.name}</h2>
        <img src=${poke.img} />
        <p>Height: ${poke.height*10}cm</p>
        <p>Weight: ${poke.weight/10}kg</p>
         </div>`
    });
    
    document.body.appendChild(list);
}

//intentando hacer el buscador
const pokemonsFiltro = mappedpoke.filter(pokemon => {
        return  pokemon.name.includes(inputValue)
      })
   
      pokemonsFiltro.forEach(pokemon => {
       printPokemon(pokemon) 
      })