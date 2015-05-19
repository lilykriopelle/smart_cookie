Rails.application.routes.draw do

  root "static_pages#root"

  resources :users, except: [:index, :destroy, :edit]
  resource :session, only: [:new, :create, :destroy]

  namespace :api , defaults: { format: :json } do
    resources :votes, only: [:create, :destroy]

    resources :recipes, except: [:edit] do
      resources :ingredients, except: [:edit]
    end

    resources :annotations, except: [:edit] do
      resources :annotation_replies, only: [:index, :create, :destroy]
    end

    resources :users, only: [:show]
  end

end
