class TrainersController < ApplicationController

    def index 
        @trainers = Trainer.all
        render json: @trainers.to_json()
    end

    def pokemon_for_trainer
       
        @trainer = Trainer.find(params[:id])
        @pokemons = @trainer.pokemons
        render json: @pokemons.to_json()
        #    http://localhost:3000/pokemonfortrainer/1

    end

end
