class PokemonsController < ApplicationController

    def index
        @pokemons = Pokemon.all
        render json: @pokemons.to_json();
    end

    def destroy
        @pokemon = Pokemon.find(params[:id])
        @pokemon.destroy

    end

    def new
    
    end

    def create
        @trainer = Trainer.find(params[:trainer_id])
        if @trainer.pokemons.length < 6
            id = params[:trainer_id]
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            @pokemon = Pokemon.create(nickname: name, species: species, trainer_id: id)
            render json: @pokemon
        else
            render json: {status: "error", code: 47234875263745634278, message: "You have 6 pokemon"}
        end
    end

end
