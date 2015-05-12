Rails.application.routes.draw do


  resources :users, except: [:index, :destroy]
  resource :session, only: [:new, :create, :destroy]

  root "sessions#new"

end
