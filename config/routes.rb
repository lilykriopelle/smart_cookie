Rails.application.routes.draw do

  root "sessions#new"

  resources :users, except: [:index, :destroy]
  resources :recipes
  resource :session, only: [:new, :create, :destroy]

  namespace :api , defaults: { format: :json } do
    resources :users, only: [:show]
  end

end
