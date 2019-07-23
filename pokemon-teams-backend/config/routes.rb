Rails.application.routes.draw do
  resources :pokemons
  resources :trainers

  get '/pokemonfortrainer/:id', to: "trainers#pokemon_for_trainer"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

end
