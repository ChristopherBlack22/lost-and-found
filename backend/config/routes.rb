Rails.application.routes.draw do

  resources :items, only: [:index, :create]
  resources :comments, only: [:create]
  
end
