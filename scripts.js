let startingPoint = 0
let limit = 20
let flipRotet;
let btn = document.querySelector('#btn')
let input = document.querySelector('input');
let pokemons = document.querySelector('.pokemon');
let pokemonarr = [];
let para1, para2, para3, namepara;

function pokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${startingPoint}&limit=${limit}`)
        .then((res) => (res.json()))
        .then((data) => {
            data.results.forEach(element => {
                fetch(element.url).then((res1) => (res1.json()))
                    .then((data1) => {
                        pokemonarr.push(data1);
                        renderPokemonList();
                    });
            });
        });
    startingPoint = startingPoint + limit;
}


function renderPokemonList() {
    pokemons.innerHTML = "";
    pokemonarr.forEach((pokemon) => {
        const flipcalrd = createPokemonCard(pokemon);
        pokemons.appendChild(flipcalrd);
    });
}

function createPokemonCard(pokemon) {
    let flipcalrd = document.createElement('div');
    flipcalrd.classList.add('flip-card');
    let flipCardInner = document.createElement('div');
    flipCardInner.classList.add('flip-card-inner')
    let flipCardFront = document.createElement('div');
    flipCardFront.classList.add('flip-card-front');
    let idpara = document.createElement('p');
    idpara.innerHTML = `id : ${pokemon.id}`;
    flipCardFront.append(idpara);
    namepara = document.createElement('p');
    namepara.innerHTML = `Type name : ${pokemon.types[0].type.name}`;
    flipCardFront.append(namepara);
    pokemonname = document.createElement("p");
    pokemonname.textContent = "name :" + pokemon.name;
    flipCardFront.appendChild(pokemonname);
    let img = document.createElement('img');
    img.src = `${pokemon.sprites.other.dream_world.front_default}`;
    img.classList.add('imgs');
    let btnImg = document.createElement('button');
    btnImg.classList.add('btnImg');
    btnImg.innerHTML = "Click";
    btnImg.addEventListener('click', (e) => {
        e.target.parentElement.parentElement.style.transform = "rotateY(180deg)";
    });
    flipCardFront.append(img);
    flipCardFront.append(btnImg);
    flipCardInner.append(flipCardFront);
    let flipCardBack = document.createElement('div');
    flipCardBack.classList.add('flip-card-back');
    para1 = document.createElement('p');
    para1.innerHTML = `height ${pokemon.height}`;
    para2 = document.createElement('p');
    para2.innerHTML = `weight :${pokemon.weight}`;
    para3 = document.createElement('p');
    para3.innerHTML = `species :${pokemon.species.name} `;
    pokemon.stats.forEach(el => {
        let newP = document.createElement('p');
        newP.innerHTML = ` ${el.stat.name} : ${el.base_stat}`;
        flipCardBack.append(newP);
    });
    let Back = document.createElement('button');
    Back.innerHTML = `Back`;
    Back.classList.add('btnImg');
    Back.addEventListener('click', (e) => {
        e.target.parentElement.parentElement.style.transform = "rotateY(0deg)";
    });

   

    flipCardBack.append(para1);
    flipCardBack.append(para2);
    flipCardBack.append(para3);
    flipCardBack.append(Back);
    flipCardInner.append(flipCardBack);
    flipcalrd.append(flipCardInner);

    return flipcalrd;
}



function filterPokemonList() {
    const filterBySearch = input.value;
    const filterByName = document.getElementById("pokemonSelect").value.toLowerCase();
    const filteredList = pokemonarr.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(filterBySearch) &&
        (filterByName === "" || pokemon.types[0].type.name.toLowerCase() === filterByName)

    );

    pokemons.innerHTML = "";
    filteredList.forEach((pokemon) => {
        const flipcalrd = createPokemonCard(pokemon);
        pokemons.appendChild(flipcalrd);
    });
}




pokemon();

input.addEventListener("input", filterPokemonList);
btn.addEventListener('click', () => { pokemon() });
document.getElementById("pokemonSelect").addEventListener("change", filterPokemonList);