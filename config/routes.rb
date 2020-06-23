Rails.application.routes.draw do
  devise_for :users
  root "tops#index"
  resources :users ,only: [:new, :show]
  resources :logs ,only: :index
  resources :products ,only: [:new, :show] do
    collection do
      get 'purchase'
    end
  end
end
