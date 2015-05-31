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
      resources :annotation_replies, only: [:index, :create, :destroy, :show]
    end

    resources :users, only: [:show, :update]
    resource :session, only: [:show]

    get "search", to: "static_pages#search"
  end

  post "session/demo", to: "sessions#demo"
  get "auth/:provider/callback", to: "sessions#omniauth"
end
