const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const cardHolder = Array.from(document.getElementsByTagName("main"));
console.log("cardhdler  ", cardHolder[0]);


function initial(){
    let trainers = fetch(TRAINERS_URL)
    .then(function(res){
        return res.json();
    }).then(function(body){
        // console.log(body)
        for (const trainer of body){
            //console.log("Trainer is: ", trainer);
            createTrainerCard(trainer);
        }
    })
}


function createTrainerCard(trainer){
    let cardDiv =  document.createElement("DIV");
    cardDiv.classList.add("card");
    cardDiv.setAttribute("data-id", trainer.id);

    let nameP = document.createElement("P");
    nameP.innerText = trainer.name;

    let addPokemonBtn = document.createElement("BUTTON");
    addPokemonBtn.innerText = "Add Pokemon"
    addPokemonBtn.setAttribute("data-trainer-id", trainer.id);
    createNewPokemon(addPokemonBtn);

    let uList = document.createElement("UL");
    uList.id = "trainer" + trainer.id
    
    cardDiv.appendChild(nameP);
    cardDiv.appendChild(addPokemonBtn);
    cardDiv.appendChild(uList);
    cardHolder[0].appendChild(cardDiv);
    
    createMyPokemons(trainer.id, uList);
}


function createMyPokemons(trainerId, uList){
    let myUrl = `http://localhost:3000/pokemonfortrainer/${trainerId}`;

    let pokemons = fetch(myUrl)
    .then(function(res){
        return res.json();
    }).then(function(body){
        for (const pokemon of body){
            uList.appendChild(createOnePokemon(pokemon, trainerId));   
        }
    })
}


function createOnePokemon(pokemon, trainerId){
    let listItem = document.createElement("LI");
    listItem.innerText = pokemon.nickname + ` (${pokemon.species})`

    let deletePokemonBtn = document.createElement("BUTTON");
    deletePokemonBtn.setAttribute("data-pokemon-id", pokemon.id);
    deletePokemonBtn.innerText = "Release"

    deletePokemonBtn.addEventListener("click", function (e){
        //console.log (e.target)
        let pokemonIdToDelete = deletePokemonBtn.attributes["data-pokemon-id"].value;
        console.log("Delete Button",  pokemonIdToDelete);

        console.log(pokemonIdToDelete)
        let deleteUrl =  `http://localhost:3000/pokemons/${pokemonIdToDelete}`;

        fetch(deleteUrl, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json', 
                    Accept: 'application/json'
                }, 
                body: JSON.stringify({
                    id: pokemonIdToDelete
                })
            })

           listItem.remove() 
    })
    listItem.appendChild(deletePokemonBtn);
    return listItem;
}


function createNewPokemon(addPokemonBtn){
    addPokemonBtn.addEventListener("click", function (e){
        // make post to API.   Also detach child?? 
        let createURL =  `http://localhost:3000/pokemons`;
        let id = addPokemonBtn.attributes["data-trainer-id"].value;

        fetch(createURL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json', 
                    Accept: 'application/json'
                }, 
                body: JSON.stringify({
                    trainer_id: id
                })
        })
        .then(res => res.json())
        .then(body => {
            if( (body["status"]) != "error") {
                let uList = document.querySelector(`#trainer${id}`)
                uList.appendChild(createOnePokemon(body, body["trainer_id"]))
            } else {
                alert("You have too many pokemon!");
            }
        })
        .catch(error => console.error("Error is: ", error))  //doesnt seem to work
        ;     
    })
}




initial();