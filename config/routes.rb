Rails.application.routes.draw do

  root "static_pages#root"

  resources :users, except: [:index, :destroy]
  resource :session, only: [:new, :create, :destroy]

  namespace :api , defaults: { format: :json } do
    resources :recipes
    resources :menus
    resources :users, only: [:show]
  end

end
