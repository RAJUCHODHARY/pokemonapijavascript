let startingPoint = 0
let limit = 20
let flipRotet;
let pokemons = document.querySelector('.pokemon');
let btn = document.querySelector('#btn')
let submit=document.querySelector('.submit');
let input=document.querySelector('input');
let  para1, para2, para3, namepara;

function pokemon(filter) {
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${startingPoint}&limit=${limit}`)
        .then((res) => (res.json()))
        .then((data) => {
            data.results.forEach(element => {
                fetch(element.url).then((res1) => (res1.json()))
                    .then((data1) => {
                        if (!filter || data1.types[0].type.name.toLowerCase() === filter.toLowerCase()) {
                            let flipcalrd = document.createElement('div');
                            flipcalrd.classList.add('flip-card');
                            let flipCardInner = document.createElement('div');
                            flipCardInner.classList.add('flip-card-inner')

                            let flipCardFront = document.createElement('div');
                            flipCardFront.classList.add('flip-card-front');
                            let idpara = document.createElement('p');
                            idpara.innerHTML = `id : ${data1.id}`;
                            flipCardFront.append(idpara);

                            namepara = document.createElement('p');
                            namepara.innerHTML = `name : ${data1.types[0].type.name}`;
                            flipCardFront.append(namepara);

                            let img = document.createElement('img');
                            img.src = `${data1.sprites.other.dream_world.front_default}`;
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
                            para1.innerHTML = `height ${data1.height}`;
                            para2 = document.createElement('p');
                            para2.innerHTML = `weight :${data1.weight}`;
                            para3 = document.createElement('p');
                            para3.innerHTML = `species :${data1.species.name} `;
                            data1.stats.forEach(el => {
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
                            pokemons.append(flipcalrd);
                        }
                    });
            });
        });
    startingPoint = startingPoint + limit;
}

btn.addEventListener('click', () => {
    pokemon();
});

submit.addEventListener('click', (e) => {
    e.preventDefault();
    const inputName = input.value.trim();
    if(inputName==="")return;
        pokemon(inputName); 
});
