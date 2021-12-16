Rails.application.routes.draw do
  #resources :comments
  #resources :users
  resources :items, only: [:index]
  
end
