Rails.application.routes.draw do
  #resources :comments
  resources :items, only: [:index, :create]#, :show]
  
end
